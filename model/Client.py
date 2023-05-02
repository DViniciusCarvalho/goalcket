from dataclasses import dataclass, field
from typing import Dict

@dataclass
class Client:
    email: str = ""
    password: str = ""
    name: str = ""
    rooms: Dict = field(default=Dict, init=False)

    def __post_init__(self):
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