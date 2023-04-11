import time
from typing	import Union

import jwt
from pydantic import validate_arguments


class Tokenizer:

    ALGORITHM = "HS256"
    SECRET = "EW@!#$#FRFG34)(912RG34!@er$#!#!$I23UE7832DUI3DJU8WD273"

    @validate_arguments
    @staticmethod
    def create(id: Union[str, None]) -> str:
        iat = time.time()
        exp = iat + 2 * 60 * 60
        time.sleep(0.8)
        payload = { "sub": id, "iat": iat, "exp": exp }
        token = jwt.encode(payload, Tokenizer.SECRET, Tokenizer.ALGORITHM)
        return token

    @validate_arguments
    @staticmethod
    def decode(token: str) -> Union[str, False]:
        try:
            payload = jwt.decode(token, Tokenizer.SECRET, Tokenizer.ALGORITHM)
            id = payload["sub"]
            return id
        except jwt.InvalidTokenError:
            return False