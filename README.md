## Trot race by polling by Nachi

This repository contains the code for the trot race polling by Nachi.

## Critical Environment Variables and constants

As for the Production envs We should not use hardcoded values of any envs which shouldnt be checkedin the code Used the Config Module for the critical Variables and constants this is default file we hav in here for the demo. for other environments we have different files which would overwrite the exisitng default like
say for production we have its own file and this production json can be totally encrypted i.e. only those
developers who have the rights would be able to see the values in the working dir, for others it would be impossible to see the contents.

## Run Locally

Go to the project directory

```
  cd nachi-trot-race
```

#### Install dependencies

Install npm

```
  npm i
```

#### Start the app

```
  npm start
```

### Mongo DB

URI for local MongoDB:

> mongodb://localhost:27017/nachitrotrace

The above is already mentioned in the default json file.

## Docker

Change the **MONGO_DB_URL** value from "localhost" to "mongo" in default json.

Use below command to run the project on docker:

```
  docker compose up
```

## Running Tests

To run tests, run the below command:

```
  npm test
```

Get the report for the code coverage:

```
    npm run test:coverage
```

## Check eslint warnings and errors

Use below command to check lint issues:

```
    npm run lint:check
```

To fix lint issue, use following command:

```
    npm run lint:fix
```

If you make any changes, please be sure to check for code formatting.

### Code formatting

Check for code formatting - Prettier check is added

```
    npm run format:check
```

Format code:

```
    npm run format:write
```

### Logger

the winston logger module is also added which would auto rotate the logs and write into the file
this logger enables us to write the consoles only if the node env isent production
else only the errors or required information is written to the log file
instead of showing it on the node consoles (using of console.log slows down the application as
its synchronous out on console prevents further execution until its done)
whereas switching as per the env enables us to easily debug the aplication and see the logs
which are stored for given time(simple console.log doesnt allow this.)
