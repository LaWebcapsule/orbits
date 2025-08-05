# Orbits

Keep your orbit in the cloud galaxy! A typescript framework for DevOps workflow.

<p align="center"><img src="docusaurus/static/img/workflow_orbits.png" width="75%"></p>

## What is Orbits ?

Orbits is an open-source framework for orchestrating long-lived resources and workflows involving long-running processes. It lets you manage your infrastructure templates from a single, unified place using native TypeScript code.

By combining the flexibility of Node.js with a powerful workflow engine, Orbits helps you build modern, adaptable infrastructure operations. It’s ideal for automating processes that self-adapt to their environment and for exposing workflows as reusable, reliable building blocks. It also provides a solid foundation for building crash-resilient Node.js applications.

## Key features

- **Reusable Workflow in typescript**: Apply the [SAGA principles](https://www.baeldung.com/cs/saga-pattern-microservices directly in native TypeScript. Build crash-resilient orchestrators that are easy to maintain and evolve
- **Model-Driven Orchestration for IaC**: Extend your existing tools like Helm or ArgoCD with custom logic. Define infrastructure as models and orchestrate them according to your specific needs.
- **Multi-Tenant by Design**: Orchestrate deployments across accounts, services, and environments — all from a unified framework..
- **Local Testing & Repeatability**: Run your CI/CD workflows locally, write unit tests with Jasmine or Mocha, and ensure reliability before deploying.
- **Built-in Observability**: Get full visibility into your workflows with native tracing, structured logs, and metrics. Easily debug complex executions and track every operation step-by-step

## Getting started

Read the [Hello world quickstart](https://orbits.do/documentation/quick-start)

## Documentation

<p align="center"><img src="docusaurus/static/img/singe_bouquine.png" width="75%"></p>

Read the [documentation](https://orbits.do/documentation)

## Install

Read the [install tutorial](https://orbits.do/documentation/installation/install)

## Testing

In each specific package, go to the `/specs/` folder. There is a `main.spec.ts`.
In the jasmine configuration, choose the specs you want to run and then run:

```bash
npx tsx main.spec.ts
```

## Contributing

This repository is open to contributions on all its forms.

### Repository folders

This git repository manages three packages:
- the core package is under `/src/core/actions`
- the fuel package is under `/src/helpers`
- the service package is under `/src/packages/services`

Also, there is a `/src/examples` folder with some examples.

## Community

- join us on [slack](https://join.slack.com/t/orbitsgroupe/shared_invite/zt-394jwf72o-utjAV~odD32GhyKnhjnDFQ)

<p align="center"><img src="docusaurus/static/img/singe_orchestrate.png" width="75%"></p>
