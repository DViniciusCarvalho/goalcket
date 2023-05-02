from pydantic import validate_arguments

@validate_arguments
def valid_inputs(email: str, name: str, password: str) -> bool:
    if "@" in email and len(email) >= 3:
        if len(name) <= 1 and len(password) < 8:
            return False
        return True
    return False
    
@validate_arguments
def valid_group_data(group_name: str, group_password: str) -> bool:
    if len(group_name) < 8 or len(group_password) < 8:
        return False
    return True