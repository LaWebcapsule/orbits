---
title: Orbits vs Helm
sidebar_position: 4
---

# Orbits vs Helm

Orbits and Helm address deployment automation but operate at different levels. Helm is a package manager for Kubernetes, while Orbits orchestrates complete infrastructure workflows across multiple clouds and tenants.

| Feature                        | Orbits                                               | Helm                                 |
|--------------------------------|------------------------------------------------------|--------------------------------------|
| **Primary Language**           | TypeScript                                           | YAML (Go templating)                |
| **Approach**                   | Imperative orchestration                             | Declarative package management      |
| **Multi-cloud & Multi-tenant** | ✅ Native                                             | ❌ Limited to Kubernetes             |
| **Infrastructure Orchestration**| ✅ Full stack orchestration                          | ❌ Focused on K8s applications       |
| **Error Handling**             | Retroactive feedback and corrective actions          | Basic hooks and rollback support    |
| **Main Focus**                 | Complete infra lifecycle management                  | Managing Kubernetes charts           |
| **Extensibility**              | Full Node.js ecosystem                               | Tied to Kubernetes ecosystem         |

## Technical Analysis 
Helm is great for deploying applications within Kubernetes clusters using reusable charts. Orbits goes further, managing entire infrastructure deployments, coordinating resources, and supporting non-Kubernetes workloads.

**When to choose Orbits:**  
For orchestrating heterogeneous infrastructure environments across clouds.  
**When to choose Helm:**  
When managing Kubernetes-specific application deployments with reusable charts.
