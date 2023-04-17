from pathlib import Path
import sys
from typing import Tuple, Union

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from bson.objectid import ObjectId
from pydantic import validate_arguments

from .Connection import Connection
from model.Client import Client


class ClientOperations:

    @validate_arguments
    @staticmethod
    def sign_up(client: Client) -> int:
        query = { "email": client.email }  
        result = Connection.find(query)
        if result:
            return 409
        elif result == None:
            insert_query = { 
                "name": client.name, 
                "email": client.email, 
                "password": client.password, 
                "rooms": { 
                    "personal": { 
                        "todo": { 
                            "color": "#4CB120", 
                            "cards": []
                        },
                        "doing": { 
                            "color": "#1F6B69", 
                            "cards": []
                        },
                        "done":{ 
                            "color": "#ffffff", 
                            "cards": []
                        }
                    },
                    "groups": []
                } 
            }
            result = Connection.insert(insert_query)
            if result:
                return 201
            return 500
        else:
            return 500

    @validate_arguments
    @staticmethod
    def sign_in(client: Client) -> Tuple[int, Union[int, None]]:
        get_id_query = { "email": client.email, "password": client.password }
        result = Connection.find(get_id_query)
        if result:
            id_bson = result["_id"]
            user_id = str(id_bson)
            return 200, user_id
        elif result == None:
            return 404, None
        else:
            return 500, None
        
    @validate_arguments
    @staticmethod
    def fetch_data(id: str):
        client_id = ObjectId(id)
        fetch_data_query = { "_id": client_id }
        result = Connection.find(fetch_data_query)
        if result:
            user_name = result["name"]
            rooms = result["rooms"]
            return 200, user_name, rooms
        else:
            return 500, None, None
