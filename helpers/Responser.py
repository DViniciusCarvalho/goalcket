import json
from pathlib import Path
import sys
from typing import Union, Dict

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from pydantic import validate_arguments

class Responser:
    
    @validate_arguments
    @staticmethod
    def logon_json(http_status: int) -> json:
        dict_format = { "status": http_status }
        jsonified = json.dumps(dict_format)
        return jsonified

    @validate_arguments
    @staticmethod
    def login_json(http_status: int, token: Union[str, None]) -> json:
        dict_format = { "status": http_status, "token": token }
        jsonified = json.dumps(dict_format)
        return jsonified
    
    @validate_arguments
    @staticmethod
    def fetch_data_json(http_status: int, name: Union[str, None], rooms: Union[Dict[str, Union[Dict[str, list], list]], None]):
        dict_format = { "status": http_status, "name": name, "rooms": rooms }
        jsonified = json.dumps(dict_format)
        return jsonified