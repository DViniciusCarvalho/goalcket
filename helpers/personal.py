from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from hashlib import sha256
from pydantic import validate_arguments

@validate_arguments
def create_personal_card_hash(user_id: str, column_destination: str, timestamp: int) -> str:
    column_name_hash_object = sha256(column_destination.encode())
    column_name_hash_bytes = column_name_hash_object.digest()
    column_name_hash_string = column_name_hash_bytes.hex()
    card_hash = user_id + column_name_hash_string + str(timestamp)
    return card_hash
