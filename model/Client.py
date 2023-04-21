from pydantic import StrictStr
from typing import Optional

class Client:
    email: Optional[StrictStr]
    password: Optional[StrictStr]
    name: Optional[StrictStr]

    def __init__(self, email, password, name=""):
        self.email = email
        self.password = password
        self.name = name
        self.rooms = { 
            "personal": { 
                "todo": { 
                    "color": "rgb(59, 58, 95)", 
                    "cards": []
                },
                "doing": { 
                    "color": "rgb(106, 99, 131)", 
                    "cards": []
                },
                "done": { 
                    "color": "rgb(25, 27, 57)", 
                    "cards": []
                }
            },
            "groups": []
        } 