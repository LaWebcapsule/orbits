---
position: 2
title: Core Concepts
---

At its core, orbits enfore the [SAGA principle](https://microservices.io/patterns/data/saga.html), ensuring that your applications are robust and resilient.
Orbits introduces three main primitives:
- [Actions](./action.md) are used to represents a mutating process
- [Workflow](./workflow.md) allow you to compose actions using expressive syntax. Thanks to built-in syntactic sugar, you can model complex business logic without having to alter your typescript way of thinking.
- [Resources](./resource.md) orchestrate and model the lifecycle of real-world resources. They offer a stateful abstraction over systems such as environments, deployments

Once you're familiar with Actions, it's important to understand two supporting concepts:
- [Executors](./executor.md) enable actions to run in specific execution environments — for example, inside a different Kubernetes cluster or via a serverless function like AWS Lambda.
- [Runtime](./runtime.md) defines the default configuration and behavior of the Orbits framework, such as database connections, logging, and execution constraints.

Once you understand these core concepts, head over to the ["Pilot your infra"](./../helper/_category_.json) section to learn how to apply them in practice — from designing workflows to actively operating and observing your infrastructure.

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```