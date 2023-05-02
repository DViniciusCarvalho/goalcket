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
                    "color": "#4CB120", 
                    "cards": []
                },
                "doing": { 
                    "color": "#1F6B69", 
                    "cards": []
                },
                "done":{ 
                    "color": "#000000", 
                    "cards": []
                }
            }
        )

