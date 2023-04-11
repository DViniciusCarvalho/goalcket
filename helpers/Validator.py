from pydantic import validate_arguments

class Validator:
    @staticmethod
    @validate_arguments
    def valid_email(email: str) -> bool:
        if "@" in email:
            return True
        return False