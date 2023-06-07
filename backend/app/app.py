from pathlib import Path
from sys import path

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
path.append(str(root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

from controller import ClientController, DataController


app = FastAPI()

# SERVER_HOST = "localhost"
# SERVER_PORT = 3001

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(ClientController.router)
app.include_router(DataController.router)

# if __name__ == "__main__":
#     run(
#         "app:app", 
#         reload=True, 
#         host=SERVER_HOST, 
#         port=SERVER_PORT,
#         log_level="debug"
#     )