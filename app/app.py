from pathlib import Path
import sys

file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from controller import ClientController


app = FastAPI()

SERVER_HOST = "localhost"
SERVER_PORT = 3001

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(ClientController.router)

if __name__ == "__main__":
    uvicorn.run("app:app", reload=True, host=SERVER_HOST, port=SERVER_PORT)