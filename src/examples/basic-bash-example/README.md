# Bash example

This is a simple example demonstrating how workflow and actions work.  

## Scope

This example increment a counter and print it 30 times in the console, with a delay between each print.

## Architecture
- ./src/actions/ contains the actions to print and wait.
- ./src/main-workflow.ts contains our main workflow.
- ./index.ts contains the bootstrapping process

## Installation


### Requirements

See the requirements for [Orbits installation](./../../../README.md)

### Customizing the app

Once this folder downloaded on your machine and the requirements installed, you can :
- modify the bootstraping process with your mongodb url
- add or remove different steps of the process.

### Launching the app

- install the dependencies
```console
npm install
```
- build the app
```console
npm run build
```
- launch the app
```console
npm start
```

You can also use ts-node :
```console
npx ts-node index.ts
```

### With docker compose

- Copy the docker-compose file at the root of this git project.
```console
cp ./../../../docker-compose.yml ./docker-compose.yml
```
- Launch the app with docker-compose.
```console
docker compose up
```

