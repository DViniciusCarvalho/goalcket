from hashlib import sha256
from pathlib import Path
from sys import path
from datetime import datetime

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from model.Group import Group


def get_member_info(group_data: Group, user_id: str):
    members = group_data["members"]
    user_index = None
    for index, member in enumerate(members):
        if member["id"] == user_id:
                user_index = index
    if user_index != None:
        return members[user_index]
    return None

def user_is_admin(group_data: Group, user_id: str) -> bool:
    member = get_member_info(group_data, user_id)
    if "admin" in member["roles"] and member != None:
        return True
    return False
    
def get_admins_number(group_data: Group):
    members = group_data["members"]
    count = 0
    for member in members:
        if "admin" in member["roles"]:
            count = count + 1
    return count
    

def create_group_hash(name: str) -> str:
    name_hash_object = sha256(name.encode())
    name_hash_bytes = name_hash_object.digest()
    name_hash_string = name_hash_bytes.hex()
    concat_name_hash_timestamp = name_hash_string + str(int(datetime.now().timestamp() * 1000))
    return concat_name_hash_timestamp
    
def create_group_card_hash(group_hash: str, column_destination: str, timestamp: int) -> str:
    column_name_hash_object = sha256(column_destination.encode())
    column_name_hash_bytes = column_name_hash_object.digest()
    column_name_hash_string = column_name_hash_bytes.hex()
    card_hash = group_hash + column_name_hash_string + str(timestamp)
    return card_hash