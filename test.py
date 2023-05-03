from database.Connection import Connection
from bson.objectid import ObjectId
from model.Http import Http

card_id = "6446e773373bdcee1d0ce2e2c7f57f541cb0ade348f88cf1f85604ae25376ca19ba9895780ba1dc48e9762741683068553339"
client_id = "6446e773373bdcee1d0ce2e2"
card_column = "doing"
content = "ASHLEY GOSTOSA AMORZINHO DA MINHA VIDA CASA COMIGO AMOR <3"

def change_personal_card_content(user_id: str, card_column: str, card_id: str, new_card_content: str):

    change_personal_card_content_filter_query =  { 
        "_id": ObjectId(user_id), 
        f"rooms.personal.{card_column}.cards.id": card_id 
    }     

    change_personal_card_content_query = {
        "$set": {
            f"rooms.personal.{card_column}.cards.$.content": new_card_content
        } 
    }

    result = Connection.update_user_collection(
        change_personal_card_content_filter_query, 
        change_personal_card_content_query
    )
                
    if result:
        if result.matched_count > 0:
            return Http.ok
        return Http.not_found
    return Http.internal_server_error

print(change_personal_card_content(client_id, card_column, card_id, content))