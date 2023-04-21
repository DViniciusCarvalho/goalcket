class Group:
    hash: str

    def __init__(self, name: str, password: str, admin_name: str, admin_id: str):
        self.name = name
        self.password = password
        self.members = [
            {
                "name": admin_name,
                "id": admin_id,
                "roles": [ "admin" ]
            }
        ]
        self.columns = {
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