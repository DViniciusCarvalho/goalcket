from fastapi import APIRouter, Request

from database.ClientOperations import ClientOperations
from database.DataOperations import DataOperations
from helpers.GroupHelper import GroupHelper
from helpers.Responser import Responser
from helpers.Tokenizer import Tokenizer
from model.Group import Group
from model.Http import Http


router = APIRouter()

class DataController:

    @staticmethod
    @router.post("/create-group")
    async def create_group(request: Request):
        data = await request.json()
        token = data["token"]
        group_admin_id = Tokenizer.decode(token)
        if group_admin_id:
            group_name = data["groupName"]
            group_password = data["groupPassword"]
            group_admin_name = data["username"]
            group = Group(group_name, group_password, group_admin_name, group_admin_id)
            hash = GroupHelper.create_group_hash(group_name)
            group.hash = hash
            status_code = DataOperations.create_group(group.__dict__)
            if status_code == Http.ok:
                add_group_to_user_data_result = ClientOperations.add_group(group_admin_id, group_name, hash)
                if add_group_to_user_data_result == Http.ok:
                    return Responser.create_group_json(Http.ok, hash)
                return Responser.create_group_json(Http.internal_server_error, None)
            return Responser.create_group_json(Http.internal_server_error, None)
        return Responser.create_group_json(Http.forbidden, None)


    @staticmethod
    @router.post("/get-group-content")
    async def get_group(request: Request):
        data = await request.json()
        token = data["token"]
        group_hash = data["roomId"]
        user_id = Tokenizer.decode(token)
        if user_id:
            status_code = DataOperations.has_group_permission(user_id, group_hash)
            if status_code == Http.ok:
                status_code, group_info = DataOperations.get_group_info(group_hash)
                return Responser.get_group_json(status_code, group_info)
            elif status_code == Http.forbidden:
                return Responser.get_group_json(Http.forbidden, None)
            elif status_code == Http.not_found:
                return Responser.get_group_json(Http.not_found, None)
            return Responser.get_group_json(Http.internal_server_error, None)
        return Responser.get_group_json(Http.bad_request, None)
    

    @staticmethod
    @router.put("/change-group-color")
    async def change_group_color(request: Request):
        data = await request.json()
        token = data["token"]
        color = data["color"]
        group_hash = data["hash"]
        column_to_update = data["area"]
        user_id = Tokenizer.decode(token)
        if user_id:
            status_code = DataOperations.update_group_column_color(user_id, column_to_update, color, group_hash)
            if status_code == Http.ok:
                return Responser.update_color_json(Http.ok)
            elif status_code == Http.forbidden:
                return Responser.update_color_json(Http.ok)
            return Responser.update_color_json(Http.internal_server_error)
        return Responser.update_color_json(Http.forbidden)


    @staticmethod
    @router.put("/change-personal-color")
    async def change_personal_color(request: Request):
        data = await request.json()
        token = data["token"]
        column_to_update = data["area"]
        color = data["color"]
        user_id = Tokenizer.decode(token)
        if user_id:
            status_code = DataOperations.update_personal_column_color(user_id, column_to_update, color)
            if status_code == Http.ok:
                return Responser.update_color_json(Http.ok)
            return Responser.update_color_json(Http.internal_server_error)
        return Responser.update_color_json(Http.forbidden)