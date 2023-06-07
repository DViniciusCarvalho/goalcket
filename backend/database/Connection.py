from os import getenv
from pathlib import Path
from sys import path
from typing import Any, Dict, Union

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from bson.objectid import ObjectId
from dotenv import load_dotenv
from pydantic import validate_arguments
from pymongo import MongoClient
from pymongo.errors import OperationFailure


load_dotenv()


class Connection:
    
    mongo_user = getenv("MONGO_USER")
    mongo_password = getenv("MONGO_PASSWORD")
    mongo_db = getenv("MONGO_DB")

    client = MongoClient(f"mongodb://{mongo_user}:{mongo_password}@mongodb:27017/{mongo_db}")

    db = client.get_database(mongo_db)

    user_collection = db.get_collection("users")
    group_collection = db.get_collection("groups")

    @staticmethod
    def find_user_collection(filter_query: Dict[str, Union[str, ObjectId]]) -> Union[Dict[str, Any], None] | bool:
        try:
            value_returned = Connection.user_collection.find_one(filter_query)
            return value_returned
        except OperationFailure:
            return False

    @validate_arguments
    @staticmethod
    def insert_user_collection(query: Dict[str, Union[str, Dict]]) -> Union[str, bool]:
        try:
            result = Connection.user_collection.insert_one(query)
            return str(result.inserted_id)
        except OperationFailure:
            return False
        
    @staticmethod
    def update_user_collection(filter_query: Dict[str, ObjectId], query: Any):
        try:
            result = Connection.user_collection.update_one(filter_query, query)
            return result
        except OperationFailure:
            return False
        
    @staticmethod
    def delete_group_collection(filter_query: Dict[str, str]):
        try:
            result = Connection.group_collection.delete_one(filter_query)
            return result
        except OperationFailure:
            return False
        
    @staticmethod
    def find_group_collection(filter_query: Dict[str, str]):
        try:
            result = Connection.group_collection.find_one(filter_query)
            return result
        except OperationFailure:
            return False

    @staticmethod
    def insert_group_collection(query: Dict[str, Union[str, Dict]]):
        try:
            result = Connection.group_collection.insert_one(query)
            return result
        except OperationFailure:
            return False

    @staticmethod
    def update_group_collection(filter_query: Dict[str, str], query: Any):
        try:
            result = Connection.group_collection.update_one(filter_query, query)
            return result
        except OperationFailure:
            return False