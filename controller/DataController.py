from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse

from database.ClientOperations import ClientOperations
from database.DataOperations import DataOperations
from helpers.group import create_group_hash, get_member_info
from helpers.sanitization import input_valid
from helpers.tokenjwt import decode_token
from helpers.validation import valid_group_data
from model.Group import Group
from model.Http import Http


router = APIRouter()

class DataController:

    @staticmethod
    @router.post("/create-group")
    async def create_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        group_admin_id = decode_token(token)
        if group_admin_id:
            group_name = data["groupName"]
            group_password = data["groupPassword"]
            group_admin_name = data["username"]
            group_data_is_valid = valid_group_data(group_name, group_password)
            has_not_offensive_inputs = input_valid(group_name, group_password)
            if group_data_is_valid and has_not_offensive_inputs:
                hash = create_group_hash(group_name)
                group = Group(hash, group_name, group_password, group_admin_name, group_admin_id)
                group_dict_format = group.__dict__
                create_group_status_code = DataOperations.create_group(group_dict_format)
                if create_group_status_code == Http.created:
                    add_group_to_user_data_result = ClientOperations.add_group(group_admin_id, group_name, hash)
                    if add_group_to_user_data_result == Http.ok:
                        content = { "name": group_name, "hash": hash }
                        return JSONResponse(status_code=Http.created, content=content)
                    raise HTTPException(status_code=Http.internal_server_error)
                raise HTTPException(status_code=Http.internal_server_error)
            raise HTTPException(status_code=Http.bad_request)
        raise HTTPException(status_code=Http.forbidden)

    @staticmethod
    @router.post("/join-group")
    async def join_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        username = data["username"]
        group_hash = data["groupHash"]
        group_password = data["groupPassword"]
        user_id = decode_token(token)
        if user_id:
            has_not_offensive_inputs = input_valid(group_hash, group_password)
            if has_not_offensive_inputs:
                group_exists_status_code, group_name = DataOperations.group_exists(group_hash, group_password)
                if group_exists_status_code == Http.ok:
                    member_exists_in_group = DataOperations.verify_if_member_exists(user_id, group_hash)
                    if not member_exists_in_group:
                        add_member_to_group_status_code = DataOperations.add_member_to_group(group_hash, user_id, username)
                        if add_member_to_group_status_code  == Http.ok:
                            user_update_status_code = ClientOperations.add_group(user_id, group_name, group_hash)
                            if user_update_status_code == Http.ok:
                                content = { "name": group_name, "hash": group_hash }
                                return JSONResponse(status_code=Http.ok, content=content)
                            raise HTTPException(status_code=Http.internal_server_error)
                        elif add_member_to_group_status_code  == Http.not_found:
                            raise HTTPException(status_code=Http.not_found)
                        raise HTTPException(status_code=Http.internal_server_error)
                    raise HTTPException(status_code=Http.conflict)
                elif group_exists_status_code == Http.not_found:
                    raise HTTPException(status_code=Http.not_found)
                raise HTTPException(status_code=Http.internal_server_error)
            raise HTTPException(status_code=Http.bad_request)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.post("/get-group-content")
    async def get_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        group_hash = data["roomId"]
        user_id = decode_token(token)
        if user_id:
            has_group_permission_status_code = DataOperations.has_group_permission(user_id, group_hash)
            if has_group_permission_status_code == Http.ok:
                get_group_info_status_code, group_info = DataOperations.get_group_info(group_hash)
                if get_group_info_status_code == Http.ok:
                    content = { "group": group_info }
                    return JSONResponse(status_code=Http.ok, content=content)
                elif get_group_info_status_code == Http.not_found:
                    raise HTTPException(status_code=Http.not_found)
                raise HTTPException(status_code=Http.internal_server_error)
            elif has_group_permission_status_code == Http.forbidden:
                raise HTTPException(status_code=Http.forbidden)
            elif has_group_permission_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.bad_request)

    @staticmethod
    @router.put("/change-group-color")
    async def change_group_color(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        new_column_color = data["color"]
        group_hash = data["hash"]
        column_to_update_color = data["area"]
        user_id = decode_token(token)
        if user_id:
            update_group_column_status_code = DataOperations.update_group_column_color(
                user_id, 
                column_to_update_color, 
                new_column_color, 
                group_hash
            )
            if update_group_column_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            elif update_group_column_status_code == Http.bad_request:
                raise HTTPException(status_code=Http.bad_request)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)

    @staticmethod
    @router.put("/change-personal-color")
    async def change_personal_color(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        column_to_update_color = data["area"]
        new_column_color = data["color"]
        user_id = decode_token(token)
        if user_id:
            update_personal_column_status_code = DataOperations.update_personal_column_color(
                user_id, 
                column_to_update_color, 
                new_column_color
            )
            if update_personal_column_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.put("/add-card-group")
    async def add_card_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            group_hash = data["hash"]
            group_column_destination = data["destination"]
            group_card_priority = data["priority"]
            group_card_content = data["content"]
            group_exists_status_code, group_data = DataOperations.get_group_info(group_hash)
            if group_exists_status_code == Http.ok:
                member_info = get_member_info(group_data, user_id)
                if member_info:
                    add_card_to_group_status_code, timestamp, card_hash = DataOperations.add_card_to_group(
                        group_hash, 
                        group_column_destination, 
                        group_card_priority, 
                        group_card_content,
                        member_info
                    )
                    if add_card_to_group_status_code == Http.ok:
                        content = { "timestamp": timestamp, "id": card_hash }
                        return JSONResponse(status_code=Http.ok, content=content)
                    elif add_card_to_group_status_code == Http.not_found:
                        raise HTTPException(status_code=Http.not_found)
                    raise HTTPException(status_code=Http.internal_server_error)
                raise HTTPException(status_code=Http.forbidden)
            elif group_exists_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)

    @staticmethod
    @router.put("/add-card-personal")
    async def add_card_personal(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            username = data["username"]
            personal_column_destination = data["destination"]
            personal_card_priority = data["priority"]
            personal_card_content = data["content"]
            add_card_to_personal_status_code, timestamp, card_hash = ClientOperations.add_card_to_personal(
                user_id,
                username,
                personal_column_destination,
                personal_card_priority,
                personal_card_content
            )
            if add_card_to_personal_status_code == Http.ok:
                content = { "timestamp": timestamp, "id": card_hash }
                return JSONResponse(status_code=Http.ok, content=content)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.put("/move-personal-card")
    async def move_card_personal(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            card_current_column = data["currentColumn"]
            card_destiny_column = data["destinyColumn"]
            card_data = data["cardData"]
            if card_destiny_column != "":
                move_card_personal_status_code, new_card_hash = ClientOperations.move_card_personal(
                    user_id,
                    card_data, 
                    card_current_column, 
                    card_destiny_column
                )
                if move_card_personal_status_code == Http.ok:
                    content = { "hash": new_card_hash }
                    return JSONResponse(status_code=Http.ok, content=content)
                raise HTTPException(status_code=Http.internal_server_error)
            raise HTTPException(status_code=Http.bad_request)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.put("/move-group-card")
    async def move_card_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            group_hash = data["groupId"]
            card_current_column = data["currentColumn"]
            card_destiny_column = data["destinyColumn"]
            card_data = data["cardData"]
            if card_destiny_column != "":
                move_card_personal_status_code, new_card_hash = DataOperations.move_card_group(
                    group_hash,
                    card_data, 
                    card_current_column, 
                    card_destiny_column
                )
                if move_card_personal_status_code == Http.ok:
                    content = { "hash": new_card_hash }
                    return JSONResponse(status_code=Http.ok, content=content)
                raise HTTPException(status_code=Http.internal_server_error)
            raise HTTPException(status_code=Http.bad_request)
        raise HTTPException(status_code=Http.forbidden)

    @staticmethod
    @router.delete("/delete-personal-card")
    async def delete_card_personal(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            card_id = data["cardId"]
            card_column = data["column"]
            delete_personal_card_status_code = ClientOperations.delete_card_personal(user_id, card_id, card_column)
            if delete_personal_card_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            elif delete_personal_card_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.delete("/delete-group-card")
    async def delete_card_group(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            card_id = data["cardId"]
            card_column = data["column"]
            group_hash = data["groupId"]
            delete_group_card_status_code = DataOperations.delete_card_group(group_hash, card_id, card_column)
            if delete_group_card_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            elif delete_group_card_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.put("/change-personal-card-content")
    async def change_personal_card_content(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            current_card_column = data["currentColumn"]
            card_id = data["cardId"]
            new_card_content = data["newContent"]
            change_personal_card_content_status_code = ClientOperations.change_personal_card_content(
                user_id,
                current_card_column,
                card_id,
                new_card_content
            )
            if change_personal_card_content_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            elif change_personal_card_content_status_code == Http.not_found:
                raise HTTPException(status_code=Http.not_found)
            raise HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)
    
    @staticmethod
    @router.put("/change-group-card-content")
    async def change_group_card_content(request: Request) -> JSONResponse:
        data = await request.json()
        token = data["token"]
        user_id = decode_token(token)
        if user_id:
            group_hash = data["groupId"]
            current_card_column = data["currentColumn"]
            card_id = data["cardId"]
            new_card_content = data["newContent"]
            change_group_card_content_status_code = DataOperations.change_group_card_content(
                group_hash,
                current_card_column,
                card_id,
                new_card_content
            )
            if change_group_card_content_status_code == Http.ok:
                return JSONResponse(status_code=Http.ok, content={})
            elif change_group_card_content_status_code == Http.not_found:
                return HTTPException(status_code=Http.not_found)
            return HTTPException(status_code=Http.internal_server_error)
        raise HTTPException(status_code=Http.forbidden)