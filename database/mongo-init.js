const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const database = process.env.MONGO_INITDB_DATABASE;

db.createUser({
    user: user,
    pwd: password,
    roles: [
        { 
            role: 'readWrite', 
            db: database 
        }
    ]
});

db = db.getSiblingDB(database);
db.createCollection('users');
db.createCollection('groups');