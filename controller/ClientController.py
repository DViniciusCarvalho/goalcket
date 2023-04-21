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
from model.Http import Http


router = APIRouter()

class ClientController:

    @staticmethod
    @router.post("/logon-user")
    async def logon(request: Request):
        data = await request.json()  
        name = data["name"]
        email = data["email"]
        password = data["password"]
        client = Client(email, password, name)
        valid_inoffensive_inputs = Validator.valid_inputs(client.email, client.password, client.name)
        has_not_offensive_inputs = Sanitizer.input_valid(client.email, client.password, client.name)
        if has_not_offensive_inputs and valid_inoffensive_inputs:
            status = ClientOperations.sign_up(client)
            return Responser.logon_json(status)
        return Responser.logon_json(Http.bad_request)

    @staticmethod
    @router.post("/login-user")
    async def login(request: Request):
        data = await request.json()
        email = data["email"]
        password = data["password"]
        client = Client(email, password)
        if Sanitizer.input_valid(client.email, client.password):
            status, user_id = ClientOperations.sign_in(client)
            if status == Http.ok:
                token = Tokenizer.create(user_id)
                return Responser.login_json(status, token)
            return Responser.login_json(status, None)
        return Responser.login_json(Http.bad_request, None)
    
    @staticmethod
    @router.post("/internal-page")
    async def internal(request: Request):
        data = await request.json()
        token = data["token"]
        user_id = Tokenizer.decode(token)
        if user_id:
            status, name, rooms = ClientOperations.fetch_data(user_id)
            return Responser.fetch_data_json(status, name, rooms)
        return Responser.fetch_data_json(Http.forbidden, None, None)


    @staticmethod
    @router.post("/join-group")
    async def join_group(request: Request):
        pass