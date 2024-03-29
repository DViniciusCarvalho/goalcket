# About the project

Goalcket is a Kanban application designed for managing enterprise goals, built using Next.js for the front-end, FastAPI for the back-end, and MongoDB as the database.

# Running Goalcket on Your Machine

First of all, you'll need Git, Docker, and Docker Compose installed on your machine. If you haven't already, you can download and install them using the following links:

- [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Docker Compose Installation Guide](https://docs.docker.com/compose/install)

**Note:** The next step will start 3 containers on your machine.

The next step is to run the following commands in your terminal:

```bash
git clone https://github.com/DViniciusCarvalho/goalcket.git
cd goalcket
docker-compose up
```

**Notes:**
* You can change the ports just changing the Dockerfiles, the docker-compose.yaml and the frontend/view/src/lib/endpoints.ts.
* If you have already created the containers using the ```docker-compose up``` command, run ```docker-compose up --build``` to apply changes you've made.


By default, the containers will start in the ports:
- 8080 (Front-end)
- 5050 (Back-end)
- 27020 (Database)

After starting the containers, access http://localhost:8080 to interact with the application.