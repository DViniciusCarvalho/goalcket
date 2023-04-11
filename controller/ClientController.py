from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from fastapi import APIRouter, Request

from database.ClientOperations import ClientOperations
from helpers.Responser import Responser
from helpers.Sanitizer import Sanitizer
from helpers.Tokenizer import Tokenizer
from helpers.Validator import Validator
from model.Client import Client


router = APIRouter()

class ClientController:

    @staticmethod
    @router.post("/logon-user")
    async def logon(request: Request):
        data = await request.json()
        client = Client()
        client.name = data["name"]
        client.email = data["email"]
        client.password = data["password"]
        if Sanitizer.input_valid(client.name, client.email, client.password) and Validator.valid_email(client.email):
            status = ClientOperations.sign_up(client)
            return Responser.logon_json(status)
        return Responser.logon_json(400)

    @staticmethod
    @router.post("/login-user")
    async def login(request: Request):
        data = await request.json()
        client = Client()
        client.email = data["email"]
        client.password = data["password"]
        if Sanitizer.input_valid(client.email, client.password):
            status, user_id = ClientOperations.sign_in(client)
            if status == 200:
                token = Tokenizer.create(user_id)
                return Responser.login_json(200, token)
            return Responser.login_json(status, None)
        return Responser.login_json(400, None)
    
    @staticmethod
    @router.post("/internal-page")
    async def internal(request: Request):
        data = await request.json()
        client = Client()
        client.token = data["token"]
        user_id = Tokenizer.decode(client.token)
        if user_id:
            status, name, rooms = ClientOperations.fetch_data(user_id)
            return Responser.fetch_data_json(status, name, rooms)
        return Responser.fetch_data_json(403, None, None)
