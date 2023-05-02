from datetime import datetime
from pathlib import Path
from sys import path
from typing import Tuple, Union, Any

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from bson.objectid import ObjectId
from pydantic import validate_arguments

from database.Connection import Connection
from helpers.personal import create_personal_card_hash
from model.Client import Client
from model.Http import Http


class ClientOperations:

    @staticmethod
    def sign_up(client: Client) -> int:
        verify_if_email_is_in_use_filter_query = { "email": client.email }  
        result = Connection.find_user_collection(verify_if_email_is_in_use_filter_query)
        if result:
            return Http.conflict
        elif result == None:
            client_data = Client(client.email, client.password, client.name).__dict__
            result = Connection.insert_user_collection(client_data)
            if result:
                return Http.created
            return Http.internal_server_error
        return Http.internal_server_error 

    @staticmethod
    def sign_in(client: Client) -> Tuple[int, Union[int, None]]:
        validate_data_and_get_id_filter_query = { "email": client.email, "password": client.password }
        result = Connection.find_user_collection(validate_data_and_get_id_filter_query)
        if result:
            id_bson = result["_id"]
            user_id = str(id_bson)
            return Http.ok, user_id
        elif result == None:
            return Http.not_found, None
        return Http.internal_server_error, None
        
    @validate_arguments
    @staticmethod
    def fetch_data(user_id: str):
        client_id = ObjectId(user_id)
        fetch_data_filter_query = { "_id": client_id }
        result = Connection.find_user_collection(fetch_data_filter_query)
        if result:
            user_name = result["name"]
            rooms = result["rooms"]
            return Http.ok, user_name, rooms
        return Http.internal_server_error, None, None
        
    @validate_arguments
    @staticmethod
    def add_group(user_id: str, group_name: str, group_hash: str):
        client_id = ObjectId(user_id)
        add_group_filter_query = { "_id": client_id }
        add_group_query = {"$push": { "rooms.groups": { "name": group_name, "hash": group_hash } } }
        result = Connection.update_user_collection(add_group_filter_query, add_group_query)
        if result:
            return Http.ok
        return Http.internal_server_error
    
    @validate_arguments
    @staticmethod
    def add_card_to_personal(user_id: str, username: str, column_destination: str, card_priority: str, card_content: str):
        client_id = ObjectId(user_id)
        timestamp = int(datetime.now().timestamp() * 1000)
        card_hash = create_personal_card_hash(user_id, column_destination, timestamp)
        add_card_filter_query = { "_id": client_id }
        add_card_query = {
            "$push": {
                f"rooms.personal.{column_destination}.cards": {
                    "timestamp": timestamp,
                    "id": card_hash,
                    "priority": card_priority,
                    "content": card_content,
                    "creator": {
                        "name": username,
                        "id": user_id
                    }
                }
            }
        }
        result = Connection.update_user_collection(add_card_filter_query, add_card_query)
        if result:
            return Http.ok, timestamp, card_hash
        return Http.internal_server_error, None, None
    
    @validate_arguments
    @staticmethod
    def move_card_personal(user_id: str, card_data: Any, card_current_column: str, card_destiny_column:str):
        client_id = ObjectId(user_id)
        move_card_personal_filter_query = { "_id": client_id }

        card_id = card_data["id"]
        delete_card_from_current_column_query = {
            "$pull": {
                f"rooms.personal.{card_current_column}.cards": { 
                    "id": card_id
                }
            }
        }

        timestamp = card_data["timestamp"]
        new_card_hash = create_personal_card_hash(user_id, card_destiny_column, timestamp)
        card_data["id"] = new_card_hash

        add_card_to_destiny_column_query = {
            "$push": {
                f"rooms.personal.{card_destiny_column}.cards": card_data
            }
        }

        add_card_to_destiny_column_result = Connection.update_user_collection(
            move_card_personal_filter_query, 
            add_card_to_destiny_column_query
        )

        if add_card_to_destiny_column_result:
            delete_card_from_current_column_result = Connection.update_user_collection(
                move_card_personal_filter_query, 
                delete_card_from_current_column_query
            )
            if delete_card_from_current_column_result:
                return Http.ok, new_card_hash
            return Http.internal_server_error, None
        return Http.internal_server_error, None

    @validate_arguments
    @staticmethod
    def delete_card_personal(user_id: str, card_id: str, card_column: str) -> int:
        client_id = ObjectId(user_id)
        delete_card_personal_filter_query = { "_id": client_id }
        delete_card_personal_query = { 
            "$pull": { 
                f"rooms.personal.{card_column}.cards": { 
                    "id": card_id 
                } 
            } 
        }
        result = Connection.update_user_collection(delete_card_personal_filter_query, delete_card_personal_query)
        if result:
            if result.matched_count > 0:
                return Http.ok
            return Http.not_found
        return Http.internal_server_error

