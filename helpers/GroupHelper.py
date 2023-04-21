import hashlib
from pathlib import Path
import sys
import time

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))


from model.Group import Group


class GroupHelper:

    @staticmethod
    def user_is_admin(group_info: Group, user_id: str) -> bool:
        members = group_info["members"]
        user_index = None
        for index, member in enumerate(members):
            if member["id"] == user_id:
                user_index = index
        if "admin" in members[user_index]["roles"] and user_index != None:
            return True
        return False
    
    @staticmethod
    def create_group_hash(name: str):
        name_hash_object = hashlib.sha256(name.encode())
        name_hash_bytes = name_hash_object.digest()
        name_hash_string = name_hash_bytes.hex()
        concat_name_hash_timestamp = name_hash_string + str(time.time())
        return concat_name_hash_timestamp