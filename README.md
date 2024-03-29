# DragonManual-Back

This repo contains the source code to run a personnal project : _the API for DragonManual_.

With this personnal project, I have the objectif to learn more about the back, with Node.js, quality requirement and fun.
My constraint : dont't use frameworks (as express).
Why ? By challenge and to really discover the depths of the back as first approach.


## 1. Project features

This API has differents objectives :
 - allow to create, login and edit a user 
 - allow to create, edit and delete a dragon character by a connected user
 - allow to have informations about different dragon species of the Dreamworks universe

For more information about the API functioning,   
please to consult the [swagger documentation](./swagger.yaml).


## 2. How to Install and Run the Project

### 2.1 Prerequisites

 - [Docker Desktop](https://www.docker.com/products/docker-desktop)


### 2.2 Installation

 - The `docker run --name dragonmanual-container -e POSTGRES_USER='User' -e POSTGRES_PASSWORD='Password' -e POSTGRES_DB=projectdatabase -p 5432:5432 -d postgres` command,  with 'User' and 'Password' replaced by your own user name and password,  will allow you to create your Docker container, it database and run your image on port 5432.
 - Save your user name and password in a .env file, as the .env.exemple (be carful to update the DATABASE_URL to).
 - The `npm install` command will allow you to install the dependencies.
 - The `npm run migrate up` command will allow you to migrate the database.

** Database content **  
If you want to fill the database with the dragon species (approximately 20), use the `npm run fill-db` command after the migration.


### 2.3 Run

 - The `npm start` command will allow you to run the app in the development mode.
 - Please enjoy !


## 3. Extra points

This project use a database with several table.
For more information about the database functioning,   
please to consult the [db documentation](./dbDocumentation.md).