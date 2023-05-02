from dataclasses import dataclass, field
from typing import Dict, List, Union

@dataclass(init=False)
class Group:
    hash: str
    name: str
    password: str
    members: List[Dict[str, Union[str, list]]] = field(default_factory=list)
    columns: Dict[str, Dict[str, Union[str, List[str]]]] = field(default_factory=Dict)

    def __init__(self, hash: str = "", name: str = "", password: str = "", admin_name: str = "", admin_id: str = ""):
        object.__setattr__(self, "hash", hash)
        object.__setattr__(self, "name", name)
        object.__setattr__(self, "password", password)
        object.__setattr__(
            self, 
            "members", 
            [
                {
                    "name": admin_name,
                    "id": admin_id,
                    "roles": [ "admin" ]
                }
            ]
        )
        object.__setattr__(
            self, 
            "columns", 
            {
                "todo": { 
                    "color": "#97D91C", 
                    "cards": []
                },
                "doing": { 
                    "color": "#3A691B", 
                    "cards": []
                },
                "done":{ 
                    "color": "#213A18", 
                    "cards": []
                }
            }
        )