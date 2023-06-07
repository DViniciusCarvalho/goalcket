from datetime import datetime
from os import getenv
from time import sleep
from typing	import Union

from dotenv import load_dotenv
from jwt import encode, decode, InvalidTokenError
from pydantic import validate_arguments


load_dotenv()

ALGORITHM = getenv("JWT_ALGORITHM")
SECRET = getenv("JWT_SECRET")

@validate_arguments
def create_token(id: Union[str, None]) -> str:
    iat = datetime.now().timestamp()
    exp = iat + 2 * 60 * 60
    sleep(0.8)
    payload = { "sub": id, "iat": iat, "exp": exp }
    token = encode(payload, SECRET, ALGORITHM)
    return token

@validate_arguments
def decode_token(token: str) -> Union[str, bool]:
    try:
        payload = decode(token, SECRET, ALGORITHM)
        user_id = payload["sub"]
        return user_id
    except InvalidTokenError:
        return False