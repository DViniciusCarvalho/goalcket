from pydantic import BaseModel, StrictInt, StrictStr
from typing import Optional, Dict

class Client(BaseModel):
    name: Optional[StrictStr]
    email: Optional[StrictStr]
    password: Optional[StrictStr]
    id: Optional[StrictInt]
    token: Optional[StrictStr]
