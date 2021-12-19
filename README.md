# Nitad Poll

## Requirement
- Nodejs
    - [Nodejs](https://nodejs.org/en/download/) version 16.10 or later
- Package Manager
    - [Yarn](https://yarnpkg.com/getting-started/install)  [Please **DON'T** upgrade yarn to version 2]
    - `npm install --global yarn`
- Tools
  - [Docker](https://www.docker.com/get-started) [Require]
  - [Postman](https://www.postman.com/downloads/) [Optional]
  - [Table Plus](https://tableplus.com) [Optional]

## Clone project to directory
- run command
```bash
  # Select Directory
  $ cd <your directory that want project to install>

  # Clone project
  $ git clone -b master https://github.com/Nitad-18/nitad-poll-backend.git
```

## Installation

- **If this is the first time to use NestJS**
  ```bash
  $ yarn global add @nestjs/cli 
  ```
- Install Package
  ```bash
  $ yarn install
  ```

## Setup ENV File

- Create new files **_.env.development_** and **_.env.production_**
- Copy template in **_.env.example_** and then fill in **_.env.development_** and **_.env.production_**
- Setup .env file (fill in the blank)
  <br/>
  - **`PORT`** Any number(default 4000)<br/>
  - **`DATABASE_NAME`** Name of the database (customize but **NOT BLANK**)<br/>
  - **`DATABASE_USERNAME`** username (customize but **NOT BLANK**)<br/>
  - **`DATABASE_PASSWORD`** password (customize)
  <br/>

## Database

### Docker Compose
- run command 
  ```bash
  $ docker-compose --env-file ./.env.development up
  ```

### Run migration files
- run command
  ```bash
  $ yarn typeorm:run
  ```

### Generate a mock data (Optional)
- this command will generate 20 users and 10 polls with 2 up to 7 poll-options in each poll
- password = `adminadmin`
- run command
  ```bash
  $ yarn seed:run
  ```

### Connect database with table plus

1. Open Table Plus and then press the "create new connection" and select PostgreSQL
2. Fill the blank textbox with your credential in .env.development file
3. Click Test (if not thing wrong it will show connection is OK)
4. Press connnect

## Running the app
- start the service
  ```bash
  # watch mode (Dev mode)
  $ yarn start:dev

  # complie to js
  $ yarn build

  # production mode
  $ yarn start:prod
  ```
  
## API Doc
- Go to path `http://localhost:<PORT>/api`

## Swagger-Stats
- Go to path `http://localhost:<PORT>/swagger-stats`
  
## PG Admin
- Go to path `http://localhost:<PG_ADMIN_PORT>` (PORT in .env.development file)
- Login by using data in .env.development file
- open cmd/terminal and run command
    - `docker network inspect nitad-poll-backend_default`
    - find the IPV4Address of container name nitad-poll-db and copy it 
    - eg IPV4Address = 172.168.0.2/16 ----> COPY ONLY 172.168.0.2
- click add new server and fill name (anything)
    - click at connection tap and fill host with the IPV4Address that you copied
    - then fill the rest with data in .env.development (maintainance database === database name)
    - leave ROLE and SERVICE with blank (don't fill)
    - click save
- view data
    - goto servers -> <your server name> -> databases -> <your database name> -> schemas -> tables -> <table name>
    - right click the <table name> and then click at `view/edit data` and select amount that you want to display
  
## Etc Command
  ```bash
  # format code template
  $ yarn format
  
  # format fix code to be as the eslint rule in .eslintrc.js
  $ yarn lint

  # create nest resource
  $ nest g res <name>

  # automatically create a migration file
  $ yarn typeorm:auto-create

  # create empty migration file
  $ yarn typeorm:create

  # show config (typeorm config)
  $ yarn seed:config

  # run seeds and factorires files
  $ yarn seed:run
  ```
