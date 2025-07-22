import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Going to production

## Manual installation

Orbits requires two persistent services:

- **MongoDB service**  
  Refer to the [MongoDB documentation](https://www.mongodb.com/docs/manual/self-managed-deployments/) for setup details.  
  Orbits stores a small amount of long-lived data in MongoDB. You may consider using [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) with a small cluster for hosting your database.

- **Node.js service running your action code**  
  See the [Node.js documentation](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production) for production best practices.

### Recommended resources for the Node.js service

- 2 GB RAM and 1 CPU is generally sufficient; adjust based on your workload.
- Deployment options for redundancy:
    - Kubernetes deployment with at least two pods.
    - ECS service with at least two tasks.

If your actions are not exposed via a web server, you do not need to expose your deployment through a service or load balancer.

### Independent Worker Deployment

The main goal in production is to ensure at least one Node.js process runs an `ActionJob`.

- Control the number of `ActionJob` instances per Node.js process with the `ORBITS_WORKERS__QUANTITY` environment variable.
- Example design:
    - Tasks with `ORBITS_WORKERS__QUANTITY=0` (no workers), dedicated to hosting a web server or other purposes
    - Tasks with `ORBITS_WORKERS__QUANTITY=2` dedicated solely to running `ActionJob` workers

## Orbits cloud (β)

With Orbits Cloud, you don’t need to manage the MongoDB cluster neither the Node.js service.

You also benefit from:

- Automatic scaling of your Orbits services;
- Automatic deployment from your Git repositories;
- A frontend to visualize your resources and workflows;
- Persistent logging;
- Insights into your actions, workflows, and resources;
- Permissions and secrets management over actions, workflows, and resources;
  If you’re interested in accessing the beta, [click here](https://form.typeform.com/to/nuQSZn2y).
