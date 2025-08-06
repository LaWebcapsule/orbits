---
slug: why-orchestration-matters
title: Why orchestration matters?
authors: [louis]
tags:
    [
        orchestration,
        self-adaptive platform,
        drift-detection,
        automation,
        orbits,
        workflow,
    ]
---

# Why orchestration matters?

While cloud services offer great flexibility in their usage and consumption, their growth has also led to an increase in the supply, with a multiplication of APIs, tools, and platforms to enhance, facilitate, and optimize access to cloud services. \[[1](https://www.researchgate.net/profile/Neha-Agrawal-4/publication/354149677_Autonomic_cloud_computing_based_management_and_security_solutions_State-of-the-art_challenges_and_opportunities/links/62c6bea051f08a717c149f44/Autonomic-cloud-computing-based-management-and-security-solutions-State-of-the-art-challenges-and-opportunities.pdf)\] This proliferation of offerings is one of the reasons that has led to the heterogeneity of cloud environments and the difficulty of their interoperability. \[[2](https://theses.hal.science/tel-02798770)\]. It is now widely accepted that “cloud resource management, traditionally handled by system administrators, must now be automated to be efficient, secure, and dynamic.” \[[3](https://radar.inria.fr/rapportsactivite/RA2023/ctrl-a/ctrl-a.pdf)\]

From this perspective, Ops teams and developers must be supported by complex engineering platforms called Internal Developer Platforms. These platforms must ensure requirements for quality of service, security, and cloud cost, while also allowing administrators access for audit, customization, and modification purposes.

<!-- truncate -->

## Autonomic cloud computing

To address the issue of heterogeneity in cloud resources, a research field called autonomic cloud computing has decided to overturn the imperative programming perspective. While it is difficult to specify the state of each resource used, the desired outcome—the target state of the system—is often known. Essentially, this involves applying the principles of a thermostat to web infrastructures. The idea is to apply Control Theory results to software design, more precisely to cloud resource orchestration \[[4](https://inria.hal.science/hal-01281063v1/document)\].

In this paradigm, a resource is managed by controllers. For example, Kubernetes DevOps engineers are accustomed to [handling controllers](https://kubernetes.io/docs/concepts/architecture/controller/) and build their infrastructures by specifying desired states, such as indicating that a service node should always consume between 30% and 100% of its dedicated CPU.

However, these controllers are only used within limited scopes. Indeed, autonomic computing (AC) creates complex systems, which slows down their generalization \[[5](https://www.sei.cmu.edu/library/guide-to-implementing-devsecops-for-a-system-of-systems-in-highly-regulated-environments/)\]. Moreover, mastering this paradigm by system engineers is a challenge for its adoption \[[6](https://inria.hal.science/hal-01281063v1/document)\].

Actions aimed at ensuring infrastructure commissioning, structuring incident response, or verifying application compliance with security policies are rarely subject today to feedback loops. The definition of transitions between configurations is then “very tedious and costly, which may consequently lead to error-prone dynamic behaviors” \[[7](https://hal.science/hal-01450517)\].

## The Role of operator knowledge in DevSecOps environments

This separation, however, comes from the DevSecOps approach itself. Embedded in a control paradigm, it is important for organizations to have an abstract understanding of all their components. Thus, implementation models used in highly regulated environments begin with the establishment of architectural diagrams and models \[[8](https://kilthub.cmu.edu/articles/report/Using_Model-Based_Systems_Engineering_MBSE_to_Assure_a_DevSecOps_Pipeline_is_Sufficiently_Secure/22592884?file=40862315)\]. In these models, the response to an event and the actions applied to the system are pipelines \[[5](https://www.sei.cmu.edu/library/guide-to-implementing-devsecops-for-a-system-of-systems-in-highly-regulated-environments/)\]. Deploying a new software version, building an artifact, or responding to a security incident are all encompassed under the concept of a pipeline or workflow.

As a consequence of this perspective, in the industry, all tools responsible for this DevSecOps part are workflow tools that themselves use [acyclic graphs](https://luigi.readthedocs.io/en/stable/tasks.html).

Such a design implicitly assumes that a human, an Ops engineer, supervises and can have full knowledge of the entire system. This thesis has proven difficult to maintain given the system’s complexity but, within a socio-economic system, it helps maintain the chain of accountability. In this regard, a number of anti-patterns that appear in Continuous Integration (CI) construction stem from the implementers’ lack of system knowledge. For example, CI anti-patterns often arise from the “inadequate choice of hardware and software components \[which\] can make artifact builds slow and non-reproducible” \[[9](https://www.zora.uzh.ch/id/eprint/197036/)\]. As mentioned earlier, resource management systems that rely on exact step specifications prove error-prone and suboptimal; they hinder the replicability of architectures.

## The antinomy between dynamic adaptation and acyclic workflows

- Autonomic cloud computing advocates the use of algorithms based on feedback loops to dynamically adapt to changes.
- Workflows responsible for orchestrating distributed environments, however, are designed as acyclic graphs, thereby preventing the incorporation of feedback loops and the specification of deliveries through desired state definitions.
  Yet today, “there is no cloud resource orchestration programming language to uniformly describe and combine resource descriptions.” \[[10](https://ieeexplore.ieee.org/document/7230217)\]

## Unlocking efficiency and security with autonomic cloud practices

As a consequence, a strategic application of autonomic computing (AC) across the entire application lifecycle—including critical DevSecOps processes—offers several key benefits:

- Reduce error-prone deployments: a control system based on AC enables effective immediate rollbacks in case a bug is present in a release.

- Increase system security: automatic detection of certain events, such as the release of a security patch, helps reduce the attack surface.

- Simplify design for operators: with the right level of expressiveness, operators no longer need to know the entire system but only the desired state of their application.

To support these goals, Orbits provides a TypeScript framework designed for effortlessly creating state machines and feedback loops, empowering developers and operators to effectively manage the lifecycle of cloud stacks.
