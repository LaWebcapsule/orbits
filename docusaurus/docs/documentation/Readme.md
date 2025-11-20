---
sidebar_position: 0.1
---

# Introducing Orbits

Orbits is an open-source framework for orchestrating long-lived resources and workflows involving long-running processes. It lets you manage your infrastructure templates from a single, unified place using native TypeScript code.

By combining the flexibility of Node.js with a powerful workflow engine, Orbits helps you build modern, adaptable infrastructure operations. It’s ideal for automating processes that self-adapt to their environment and for exposing workflows as reusable, reliable building blocks. It also provides a solid foundation for building crash-resilient Node.js applications.


## Why orbits ?

As stated in our [manifesto](/blog/manifesto), we believe that to achieve greater automation and reliability, Ops systems need to be augmented with orchestration.
Infrastructure is evolving. Lifecycles are becoming more complex and it is not always possible to reduce them to Git hooks alone. As systems grow, they require orchestration — logic that can react, adapt, and maintain consistency across environments and changes.
Orbits is our effort to empower developers, operators, and DevOps teams to build independent, self-adaptable, and goal-oriented orchestration platforms.

## Use cases

It's made for you if you want to:
- Write your CI/CD logic in TypeScript.
- Write your platform engineering backend in TypeScript.
- Automate AWS cross-region or cross-account deployments.
- Use a model-driven orchestrator for Cdk8s.
- Build your own custom Helm-like experience.
- Combine the power of Pulumi with Cdk8s.
- Provide a self-service developer platform with flexible automation.
- Make your app portable across environments.
- Automate the links between the services of your stack.
- Deploy a multi-tenant apps across multiples environments.

## What does it offer?

Orbits provides:

### 🧠 A TypeScript-Native Workflow Engine
- Write your orchestration logic directly in TypeScript and tap into the full Node.js ecosystem.
- Create feedback loops that adapt to changes in your infrastructure.
- Ensure your workflows follow the [SAGA principle](https://microservices.io/patterns/data/saga.html), ensuring transactions over services, for robust and predictable deployments.

### 🔌 Smart Integrations for Infrastructure-as-Code
- Programmatically deploy your infrastructure using your favorite IaC tools.
- Trigger remote actions in isolated or external environments.
- Distribute your infrastructure templates cleanly and portably.

### 🦾 Crash-proof and Reliable Agents
- Design fault-tolerant agents that can safely run in production environments.
- Enforce a clear concurrency model to execute operations once and only once across your application lifecycle.
- Guarantee deterministic, high-availability orchestration across distributed systems


## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **👋 [Quickstart](./quickstart)** - Run your first workflow and see immediate results
2. **⚙️ [Core concepts](./core-concepts/readme.md)** - Master the fundamental architecture principles and design patterns that power Orbits  
3. **🛤️ [Guides](./guides/readme.md)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::