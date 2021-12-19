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
  $ git clone -b template https://github.com/Nitad-18/nitad-poll-backend.git
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
  - **`DATABASE_NAME`** Name of the database (customize but NOT BLANK)<br/>
  - **`DATABASE_USERNAME`** username (customize but NOT BLANK)<br/>
  - **`DATABASE_PASSWORD`** password (customize)
  <br/>

## Database

### Docker Compose
- run command 
  ```bash
  $ docker-compose --env-file ./.env.development up
  ```

### Connect database with table plus

1. Open Table Plus and then press the "create new connection" and select PostgreSQL
2. Fill the blank textbox with your credential in .env.development file
3. Click Test (if not thing wrong connection is OK)
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

## Assignment
there are 6 tasks in this assignment

  1. Setup the Service
  2. Complete the User Entity
  3. Complete the Poll Entity
  4. Complete the Poll Option Entity
  5. Complete The Vote and Close Poll
  6. Set API Document and Swagger-Stats

## Task 1 Setup the Service
First of all we must setup the service config please do all this taks
- open the `config.ts` file and then complete the config setup
- open the `typeorm.ts` file and then complete the typeorm config setup
- open the `main.ts` file and then complete the service config setup
- open the `app.module.ts` file and then complete the typeorm connection setup

## Task 2 Complete the User Entity
After we setup config of the service we should create an user entity for our service
- open the `user.entity.ts` file and complete the schema
- open the `resgiter.dto.ts` and `login.dto.ts` file and complete the schema
- open the `user.service.ts` and complete all function
- open the `user.controller.ts` and complete all endpoint
- open the `user.module.ts` and import the typeorm module for user entity 

You can test this tasks by run the command `yarn test:user`

## Task 3 Complete the Poll Entity
After we create an user entity next we will create a poll entity to store the question and poll's status
- open the `poll.entity.ts` file and complete the schema
- open the `create-poll.dto.ts` file and complete the schema
- open the `poll.service.ts` and complete all function **EXCEPT** `vote` and `close`
- open the `poll.controller.ts` and complete all endpoint
- open the `poll.module.ts` and import the typeorm module for poll entity

## Task 4 Complete the Poll Option Entity
After we have both user and poll entity we need a poll option to store votes from user
- open the `poll-option.entity.ts` file and complete the schema
- open the `create-poll-option.dto.ts` file and complete the schema
- open the `poll-option.service.ts` and complete all function
- open the `poll-option.controller.ts` and complete all endpoint
- open the `poll-option.module.ts` and import the typeorm module for poll-option entity

## Task 5 Complete The Vote and Close Poll
After we create all essential entity for our service next we will create a function to handle the vote from users
- open the `poll.service.ts` and complete vote and 
- open the `poll.controller.ts` and complete all endpoint

## Task 6 Set API Document and Swagger-Stats
After we finished all requirement for our service the last thing we must do is create a API documentation for **frontend dev** and monitoring for **devops**
- open the `main.ts` file and setup API DOC and Swagger-Stats

## Doc List
  - NestJS
    - [Official Doc](https://docs.nestjs.com)
  - Typeorm
    - [Model Relationship](https://typeorm.io/#/relations)
    - [Column Type](https://typeorm.io/#/entities/#Column%20types)
    - [Querybuilder](https://typeorm.io/#/select-query-builder)
    - [Decorator Refereneces](https://typeorm.io/#/decorator-reference)
  - Eslint
    - [Rules](https://eslint.org/docs/rules/)


