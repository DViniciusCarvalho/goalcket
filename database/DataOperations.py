from datetime import datetime
from pathlib import Path
from sys import path
from typing import Any, Union, Tuple

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from bson.objectid import ObjectId
from pydantic import validate_arguments

from database.Connection import Connection
from helpers.group import create_group_card_hash, user_is_admin
from model.Http import Http


class DataOperations:

    @validate_arguments
    @staticmethod
    def create_group(group: dict[str, Union[str, list, dict]]) -> int:
        result = Connection.insert_group_collection(group)
        if result:
            return Http.created
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def get_group_info(group_hash: str):

        filter_query = { 
            "hash": group_hash 
        }

        result = Connection.find_group_collection(filter_query)
        if result:
            del result["_id"]
            del result["hash"]
            del result["password"]
            return Http.ok, result
        elif result == None:
            return Http.not_found, None
        return Http.internal_server_error, None

    @validate_arguments
    @staticmethod
    def has_group_permission(user_id: str, group_hash: str) -> int:

        filter_query = { 
            "_id": ObjectId(user_id) 
        }

        result = Connection.find_user_collection(filter_query)
        if result:
            groups = result["rooms"]["groups"]
            has_permission = any(group["hash"] == group_hash for group in groups)
            if has_permission:
                return Http.ok
            return Http.forbidden
        elif result == None:
            return Http.not_found
        return Http.internal_server_error
    
    @validate_arguments
    @staticmethod
    def update_personal_column_color(user_id: str, column_to_update: str, color: str) -> int:

        filter_query = { 
            "_id": ObjectId(user_id) 
        }

        change_personal_column_color_query = { 
            "$set": { 
                f"rooms.personal.{column_to_update}.color": color 
            } 
        }

        result = Connection.update_user_collection(filter_query, change_personal_column_color_query)
        if result:
            return Http.ok
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def update_group_column_color(user_id: str, column_to_update: str, color: str, hash: str) -> int:

        filter_query = { 
            "hash": hash 
        }

        change_group_column_color_query = { 
            "$set": { 
                f"columns.{column_to_update}.color": color 
            } 
        }

        group_info = Connection.find_group_collection(filter_query)
        if group_info:
            admin = user_is_admin(group_info, user_id)
            if admin:
                result = Connection.update_group_collection(filter_query, change_group_column_color_query)
                if result:
                    return Http.ok
                return Http.internal_server_error
            return Http.bad_request
        return Http.internal_server_error
    
    @validate_arguments
    @staticmethod
    def group_exists(group_hash: str, group_password: str) -> Tuple[int, Union[str, None]]:

        filter_query = { 
            "hash": group_hash, 
            "password": group_password 
        }

        group_info = Connection.find_group_collection(filter_query)
        if group_info:
            group_name = group_info["name"]
            return Http.ok, group_name
        elif group_info == None:
            return Http.not_found, None
        return Http.internal_server_error, None
    
    @validate_arguments
    @staticmethod
    def verify_if_member_exists(user_id: str, group_hash: str) -> bool:

        filter_query = { 
            "hash": group_hash 
        }

        group_info = Connection.find_group_collection(filter_query)
        group_members = group_info["members"]
        for member in group_members:
            if member["id"] == user_id:
                return True
        return False

    @validate_arguments
    @staticmethod
    def add_member_to_group(group_hash: str, user_id: str, username: str) -> int:

        filter_query = { 
            "hash": group_hash 
        }

        add_member_to_group_query = { 
            "$push": { 
                "members": { 
                    "name": username, 
                    "id": user_id, 
                    "roles": [ "member" ] 
                } 
            } 
        }
        result = Connection.update_group_collection(filter_query, add_member_to_group_query)
        if result:
            if result.matched_count > 0:
                return Http.ok
            return Http.not_found
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def add_card_to_group(group_hash: str, column_destination: str, card_priority: str, card_content: str, 
                          member_info: Any) -> Tuple[int, Union[int, None], Union[str, None]]:
        
        timestamp = int(datetime.now().timestamp() * 1000)
        card_hash = create_group_card_hash(group_hash, column_destination, timestamp)

        filter_query = { 
            "hash": group_hash 
        }

        add_card_to_group_query = { 
            "$push": { 
                f"columns.{column_destination}.cards": { 
                    "timestamp": timestamp,
                    "id": card_hash,
                    "priority": card_priority,
                    "content": card_content,
                    "creator": member_info
                }
            }
        }

        result = Connection.update_group_collection(filter_query, add_card_to_group_query)
        if result:
            if result.matched_count > 0:
                return Http.ok, timestamp, card_hash
            return Http.not_found, None, None
        return Http.internal_server_error, None, None
    
    @validate_arguments
    @staticmethod
    def move_card_group(group_hash: str, card_data: Any, card_current_column: str, 
                        card_destiny_column: str) -> Tuple[int, Union[str, None]]:

        move_card_group_filter_query = { 
            "hash": group_hash 
        }

        card_id = card_data["id"]
        delete_card_from_current_column_query = {
            "$pull": { 
                f"columns.{card_current_column}.cards": {
                    "id": card_id
                }
            }
        }

        timestamp = card_data["timestamp"]
        new_card_hash = create_group_card_hash(group_hash, card_destiny_column, timestamp)
        card_data["id"] = new_card_hash

        add_card_to_destiny_column_query =         { 
            "$push": { 
                f"columns.{card_destiny_column}.cards": card_data
            }
        }

        add_card_to_destiny_column_result = Connection.update_group_collection(
            move_card_group_filter_query, 
            add_card_to_destiny_column_query
        )

        if add_card_to_destiny_column_result:
            delete_card_from_current_column_result = Connection.update_group_collection(
                move_card_group_filter_query, 
                delete_card_from_current_column_query
            )
            if delete_card_from_current_column_result:
                return Http.ok, new_card_hash
            return Http.internal_server_error, None
        return Http.internal_server_error, None

    @validate_arguments
    @staticmethod
    def delete_card_group(group_hash: str, card_id: str, card_column: str) -> int:

        filter_query = { 
            "hash": group_hash 
        }

        delete_group_card_query = {
            "$pull": {
                f"columns.{card_column}.cards": {
                    "id": card_id
                }
            }
        }

        result = Connection.update_group_collection(filter_query, delete_group_card_query)
        if result:
            if result.matched_count > 0:
                return Http.ok
            return Http.not_found
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def change_group_card_content(group_hash: str, card_column: str, card_id: str, new_card_content: str) -> int:

        change_group_card_content_filter_query =  { 
            "hash": group_hash, 
            f"columns.{card_column}.cards.id": card_id 
        }     

        change_group_card_content_query = {
            "$set": {
                f"columns.{card_column}.cards.$.content": new_card_content
            } 
        }

        result = Connection.update_group_collection(
            change_group_card_content_filter_query, 
            change_group_card_content_query
        )
                
        if result:
            if result.matched_count > 0:
                return Http.ok
            return Http.not_found
        return Http.internal_server_error
    
    @validate_arguments
    @staticmethod
    def kick_user(user_id: str, group_hash: str, user_id_to_kick: str) -> int:
        user_filter_query = {
            "_id": ObjectId(user_id_to_kick)
        }

        group_filter_query = { 
            "hash": group_hash 
        }

        kick_user_query = {
            "$pull": {
                "members": {
                    "id": user_id_to_kick
                }
            }
        }

        remove_hash_from_user_data_query = {
            "$pull": {
                "rooms.groups": {
                    "hash": group_hash
                }
            }
        }

        group_info = Connection.find_group_collection(group_filter_query)
        if group_info:
            admin = user_is_admin(group_info, user_id)
            if admin:
                kick_result = Connection.update_group_collection(group_filter_query, kick_user_query)
                if kick_result:
                    if kick_result.matched_count > 0:
                        remove_hash_from_user_data = Connection.update_user_collection(
                            user_filter_query, 
                            remove_hash_from_user_data_query
                        )
                        if remove_hash_from_user_data:
                            return Http.ok
                        return Http.internal_server_error
                return Http.internal_server_error
            return Http.bad_request
        return Http.internal_server_error