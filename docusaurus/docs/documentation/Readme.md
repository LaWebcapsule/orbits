---
sidebar_position: 0.1
---

# Introducing Orbits

Orbits is an open-source, infinitely scalable orchestration framework. It lets you drive and manage your infrastructure templates from a single, unified place with native typescript code.

Orbits combines the flexibility of Node.js with a powerful workflow engine to help you build modern, adaptable infrastructure operations.

## Why orbits ?

As state our [manifesto](/blog/manifesto), we believe that to achieve greater automation and reliability, Ops systems need to be augmented with orchestration.
Infrastructure is evolving. Lifecycles are becoming more complex and it is not always possible to reduced them to Git hooks alone. As systems grow, they require orchestration — logic that can react, adapt, and maintain consistency across environments and changes.
Orbits is our effort to empower developers, operators, and DevOps teams to build independent, self-adaptable, and goal-oriented orchestration platforms.

## Use cases

It's made for you if you want to:
- Write your CI/CD logic in TypeScript.
- Write your platform engineering backend in Typescript.
- Automate AWS cross-region or cross-account deployment
- Use a model-driven orchestrator for Cdk8s.
- Build your own custom Helm-like experience.
- Combine the power of Pulumi with Cdk8s.
- Provide a self-service developer platform with flexible automation.
- Make your app portable accross environment
- Automate the links between the services of your stack
- Deploy a multi-tenant apps through multiples environments

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

## Next Steps

:::tip What's Next?
Here are three recommended next steps to continue your journey:

1. **👋 [Quickstart](./quick-start.md)** - Run your first workflow and see immediate results
2. **⚙️ [Core-concepts](/docs/category/core-concepts)** - Master the fundamental architecture principles and design patterns that power Orbits  
3. **🛤️ [Guides](/docs/category/guides)** - Explore hands-on tutorials ranging from beginner-friendly to advanced implementation techniques
:::