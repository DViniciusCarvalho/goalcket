from pathlib import Path
import sys
from typing import Tuple, Union

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from bson.objectid import ObjectId
from pydantic import validate_arguments

from database.Connection import Connection
from model.Client import Client
from model.Http import Http


class ClientOperations:

    @staticmethod
    def sign_up(client: Client) -> int:
        query = { "email": client.email }  
        result = Connection.find_user_collection(query)
        if result:
            return Http.conflict
        elif result == None:
            client_data = Client(client.email, client.password, client.name)
            result = Connection.insert_user_collection(client_data)
            if result:
                return Http.created
            return Http.internal_server_error
        return Http.internal_server_error

    @staticmethod
    def sign_in(client: Client) -> Tuple[int, Union[int, None]]:
        get_id_query = { "email": client.email, "password": client.password }
        result = Connection.find_user_collection(get_id_query)
        if result:
            id_bson = result["_id"]
            user_id = str(id_bson)
            return Http.ok, user_id
        elif result == None:
            return Http.not_found, None
        return Http.internal_server_error, None
        
    @validate_arguments
    @staticmethod
    def fetch_data(id: str):
        client_id = ObjectId(id)
        fetch_data_query = { "_id": client_id }
        result = Connection.find_user_collection(fetch_data_query)
        if result:
            user_name = result["name"]
            rooms = result["rooms"]
            return Http.ok, user_name, rooms
        return Http.internal_server_error, None, None
        
    @validate_arguments
    @staticmethod
    def add_group(id: str, group_name: str, group_hash: str):
        client_id = ObjectId(id)
        add_group_filter_query = { "_id": client_id }
        add_group_query = {"$push": { "rooms.groups": { "name": group_name, "hash": group_hash } } }
        result = Connection.update_user_collection(add_group_filter_query, add_group_query)
        if result:
            return Http.ok
        return Http.internal_server_error
        
