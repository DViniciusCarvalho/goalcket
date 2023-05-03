from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse

from database.ClientOperations import ClientOperations
from helpers.sanitization import input_valid
from helpers.tokenjwt import create_token, decode_token
from helpers.validation import valid_inputs
from model.Client import Client
from model.Http import Http


router = APIRouter()

class ClientController:

    @staticmethod
    @router.post("/logon-user")
    async def logon(request: Request) -> JSONResponse:
        data = await request.json()  
        name = data["name"]
        email = data["email"]
        password = data["password"]
        client = Client(email, password, name)
        valid_inoffensive_inputs = valid_inputs(client.email, client.password, client.name)
        has_not_offensive_inputs = input_valid(client.email, client.password, client.name)
        if has_not_offensive_inputs and valid_inoffensive_inputs:
            sign_up_status_code = ClientOperations.sign_up(client)
            if sign_up_status_code == Http.created:
                return JSONResponse(status_code=Http.created, content={})
            elif sign_up_status_code == Http.conflict:
                raise HTTPException(status_code=Http.conflict)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.bad_request)

    @staticmethod
    @router.post("/login-user")
    async def login(request: Request) -> JSONResponse:
        data = await request.json()
        email = data["email"]
        password = data["password"]
        client = Client(email, password)
        has_not_offensive_inputs = input_valid(client.email, client.password)
        if has_not_offensive_inputs:
            sign_in_status_code, user_id = ClientOperations.sign_in(client)
            if sign_in_status_code == Http.ok:
                token = create_token(user_id)
                content = { "token": token }
                return JSONResponse(status_code=Http.ok, content=content)
            elif sign_in_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.bad_request)
    
    @staticmethod
    @router.post("/internal-page")
    async def internal(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            fetch_data_status_code, name, rooms = ClientOperations.fetch_data(user_id)
            if fetch_data_status_code == Http.ok:
                content = { "name": name, "rooms": rooms }
                return JSONResponse(status_code=Http.ok, content=content)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
