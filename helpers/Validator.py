from pydantic import validate_arguments

class Validator:
    @staticmethod
    @validate_arguments
    def valid_inputs(email: str, *inputs: list[str]) -> bool:
        if "@" in email and len(email) >= 3:
            if any(input == "" or input == " " for input in inputs):
                return False
            return True
        return False