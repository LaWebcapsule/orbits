<p align="center">
  <img src="https://github.com/LaWebcapsule/orbits/blob/main/Logo-Orbits.png" alt="Orbits-logo" width=50% height=50%/>
</p>

# Orbits
Keep your orbit in the cloud galaxy ! A typescript framework for DevOps workflow

## Documentation

Read the documentation [here](./pages/main.md)

## Install

### Requirement

- Node.js v16
- MongoDb v4
- (optional but strongly recommended) Docker

#### Database

Orbits, at this stage, only support mongodb as database.
To get a mongodb connection, you can:
- deploy mongo in local (in this case, you will need to opt for the `replicaset` configuration)
- use a Mongo Atlas cluster (you can start with a free cluster)
- use the [docker compose](./docker-compose.yml) file.

### Standard installation

```bash
npm install @wbce/orbits-core @wbce/orbits-fuel
```

### Minimal installation
```bash
npm install @wbce/orbits-core
```

### Docker compose

You can use the docker-compose.yml in order to run your app.
- Put the file at the root of your Orbits directory (for example, at ./src/examples/basic-bash-example)
- launch a docker-compose process with the `docker compose up` command.
If you opt for this way of working, you still need to [install the depencies](#standard-installation) 


## Testing
In each specific package, go to the `/specs/` folder. There is a `main.spec.ts`.
In the jasmine configuration, choose the specs you want to run and then run :
```bash
npx ts-node-dev main.spec.ts
```

## Contributing
This repository is open to contributions on all its forms.

### Repository folders
This git repository manages three packages
- the core package is under /src/core/actions folder 
- the fuel package is under /src/helpers folder
- the service package is under /src/packages/services

Also, there is a /src/examples folder with some examples.


## Roadmap
> We will complete this soon.

