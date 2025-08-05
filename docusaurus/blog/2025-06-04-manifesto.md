---
slug: manifesto
title: Infra is code
authors: [louis, loic, arthur, tom, sofia]
tags: [manifesto, orbits]
---

# Manifesto: Infra is Code!

_Infra is code!_
At first glance, this slogan might be the most stupid one ever read for a long time — if not on the entire planet, then at least in the web sphere. Yes, infrastructure has always been code: from the Ubuntu web server to the Cockroach database, it is nothing but code controlled by code. But if the Ops field has progressively shifted towards the notion of Infrastructure as Code, it is precisely because there is a substantial difference: the DevOps domain is better formalized as a description of reproducible artifacts rather than as a prescription of successive commands to execute.
Thus, boldly displaying this slogan _Infra is code!_ on any article should make any somewhat experienced DevOps practitioner pause.

<!-- truncate -->

Yet, friend reading these lines, don’t go away so quickly! Haven’t you already felt that while DevOps improved developers’ lives with democratization of virtualization, convergence of interfaces, and unprecedented deployment speed, infrastructure itself remained, tucked away in some Git annex, a poor relative of computer code — difficult to edit, inflexible, and slow to test?
The popular wisdom among developers seems to say: the less you touch infrastructure, the better off you are.
With this, tirelessly, we arrive at a state-of-the-art where:

- every project [restarts infrastructure work](https://www.reddit.com/r/devops/comments/1l8dsax/whats_eating_up_most_of_your_time_as_a_devops/) as if its neighbor didn’t exist
- building a service stack remains a patchwork, a [conglomerate of loosely connected elements](https://www.tandfonline.com/doi/full/10.1080/17530350.2023.2229347)
- it is difficult, [without manual intervention, to redeploy an app from scratch on a new environment](https://insights.sei.cmu.edu/documents/576/2019_019_001_539335.pdf).
- apps are [hardly portable from one cloud to another](https://theses.hal.science/tel-02798770/file/90479_BRABRA_2020_archivage-4.pdf) — and the question of sovereignty is, out of frustration, abandoned.

Finally, all in all, a large part of DevOps activity remains manual, and the trust chain in the system relies on a chain of responsibility and a comprehensive understanding of the system by a few operators in the team (which is positive) rather than on appropriate tooling (which is disappointing because, as system complexity grows, [relying solely on knowledge leads to rigid systems](https://link.springer.com/chapter/10.1007/978-3-319-74183-3_4)).

Consequently, we unanimously demand that infrastructure specifications have the same rights and level of citizenship as any other piece of code in the stack.

A demand that could remain dead letter if it were not accompanied by two recommendations:

- orchestrators offer infrastructure an opportunity for liberation that it can seize to obtain its citizenship rights. The engineering platform movement has made a strong commitment in this direction and orchestration must be at the center of efforts.

- increasingly, infrastructure benefits from being written in standard code: CDKs bear witness to the direction to follow. This allows a convergence of best practices between infrastructure and code.

Thus, IaC must be enhanced, orchestrated, and managed — as much as possible through standard code.
We began working under these assumptions three years ago, and it has allowed us to build numerous engineering platforms since then. As we found nothing that met our criteria, we built our own orchestration framework: OrbiTS (aka Orbi.ts).
It is now mature enough to fly on its own: since freedom is not won alone, we present it today to the community, hoping it can help build infrastructures and deployment pipelines that are more flexible, more robust, and more sovereign.
