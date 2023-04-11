import os
from typing import Any, Dict, Union

from bson.objectid import ObjectId
from dotenv import load_dotenv
from pydantic import validate_arguments
from pymongo import MongoClient
from pymongo.errors import OperationFailure


load_dotenv()

class Connection:
    
    mongo_user = os.getenv("MONGO_USER")
    mongo_password = os.getenv("MONGO_PASSWORD")
    mongo_db = os.getenv("MONGO_DB")

    client = MongoClient(f"mongodb://{mongo_user}:{mongo_password}@localhost:27017/{mongo_db}")

    db = client.get_database("goalcket")
    collection = db.get_collection("users")

    @staticmethod
    def find(query: Dict[str, Union[str, ObjectId]]) -> Union[Dict[str, Any], None] | False:
        try:
            value_returned = Connection.collection.find_one(query)
            return value_returned
        except OperationFailure:
            return False

    @validate_arguments
    @staticmethod
    def insert(query: Dict[str, Union[str, Dict]]) -> Union[str, False]:
        try:
            result = Connection.collection.insert_one(query)
            return str(result.inserted_id)
        except OperationFailure:
            return False
    