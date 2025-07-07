---
title: Orbits vs Dagger
sidebar_position: 1
---

# Orbits vs Dagger

Orbits and Dagger are both orchestration tools, but they differ radically in scope, architecture, and intended use cases. While Dagger focuses on CI/CD pipelines and containerized workflows, Orbits is designed to manage and orchestrate entire cloud infrastructures with multi-cloud and multi-tenant support.

| Feature                        | Orbits                                               | Dagger                               |
|--------------------------------|------------------------------------------------------|--------------------------------------|
| **Primary Language**           | TypeScript                                           | Go (with CUE for configuration)     |
| **Approach**                   | Imperative, fine-grained state control               | Declarative, CI/CD pipeline focus   |
| **Multi-cloud & Multi-tenant** | ✅ Native support                                     | 🟡 Possible via CI/CD pipelines      |
| **State Management**           | Persistent orchestration state and rollback support  | Stateless (relies on CI/CD state)   |
| **Error Handling**             | Dynamic feedback loops, retroactive correction       | Limited to retry policies            |
| **Main Focus**                 | Infrastructure orchestration & lifecycle management  | CI/CD workflows and build pipelines |
| **Extensibility**              | Build complex workflows with full Node.js ecosystem  | Limited to DAG-based pipeline logic |

## Technical Analysis   
Orbits provides granular control over infrastructure deployments across clouds and tenants, with dynamic error recovery and persistent state. Dagger, while elegant for container-based pipelines, lacks native support for multi-cloud orchestration and is better suited for CI/CD workflows.

**When to choose Orbits:**  
When you need to manage complex, distributed infrastructure with orchestration capabilities beyond container build and deploy.  
**When to choose Dagger:**  
When you want to simplify CI/CD workflows in a container-centric development environment.
