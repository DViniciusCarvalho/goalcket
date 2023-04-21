from pathlib import Path
import sys
from typing import Tuple, Union

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from bson.objectid import ObjectId
from pydantic import validate_arguments

from database.Connection import Connection
from helpers.GroupHelper import GroupHelper
from model.Client import Client
from model.Group import Group
from model.Http import Http


class DataOperations:

    @staticmethod
    def create_group(group: Group):
        result = Connection.insert_group_collection(group)
        if result:
            return Http.ok
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def get_group_info(group_hash: str):
        query = { "hash": group_hash }
        result = Connection.find_group_collection(query)
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
    def has_group_permission(user_id: str, group_hash: str):
        object_id = ObjectId(user_id)
        query = { "_id": object_id }
        result = Connection.find_user_collection(query)
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
    def update_personal_column_color(user_id: str, column_to_update: str, color: str):
        object_id = ObjectId(user_id)
        filter_query = { "_id": object_id }
        query = { "$set": { f"rooms.personal.{column_to_update}.color": color } }
        result = Connection.update_user_collection(filter_query, query)
        if result:
            return Http.ok
        return Http.internal_server_error

    @validate_arguments
    @staticmethod
    def update_group_column_color(user_id: str, column_to_update: str, color: str, hash: str):
        filter_query = { "hash": hash }
        query = { "$set": { f"columns.{column_to_update}.color": color } }
        group_info = Connection.find_group_collection(filter_query)
        if group_info:
            user_is_admin = GroupHelper.user_is_admin(group_info, user_id)
            if user_is_admin:
                result = Connection.update_group_collection(filter_query, query)
                if result:
                    return Http.ok
                return Http.internal_server_error
            return Http.forbidden
        return Http.internal_server_error