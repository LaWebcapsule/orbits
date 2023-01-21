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

### Standard installation

```bash
npm install @wbce/orbits-core @wbce/orbits-fuel
```

### Minimal installation
```bash
npm install @wbce/orbits-core
```


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

