# deno-todo-backend

This is a simple example of a Deno + Oak API server implementation of the [TODO Backend](https://www.todobackend.com/) spec.

An accompanied blog post for this project can be found [here](https://hellorealworld.com/lets-take-deno-for-a-ride).

## Prerequisites
* A running PostgreSQL server

## Setup
#### Install Deno
https://deno.land/#installation

#### Run the Server
Run the `src/server.ts` script with environment variables and networking enabled:
```bash
deno run --allow-env --allow-net ./src/server.ts
```

If you need to run the server with non-default PostgreSQL parameters:
```bash
DB_HOST=localhost \
DB_PORT=5432 \
DB_USER=postgres \
DB_NAME=todo \
deno run --allow-env --allow-net ./src/server.ts

# inline:
DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_NAME=todo deno run --allow-env --allow-net ./src/server.ts
```
