The best way to find a good contribution is to use Orbits for something. Then write down what problems you encounter.
Could be as simple as a question you had, that the docs didn't answer. Or a bug in the tool, or a missing feature.
Then pick an item that you're comfortable with in terms of difficulty, and give it a try. 🙂

You can ask questions along the way, we're always happy to help you with your contribution. The bigger the contribution,
the earlier you should talk to maintainers to make sure you're taking the right approach and are not wasting your effort
on something that will not get merged.

## Building/Running/Testing

Working on Orbits requires orbits to bootstrap - you can install orbits
using the instructions at [https://orbits.do/documentation/installation](https://orbits.do/documentation/installation).


## GitHub Workflow

The recommended workflow is to fork the repository and open pull requests from your fork.

### 1. Fork, clone & configure Orbits upstream

- Click on the _Fork_ button on GitHub
- Clone your fork
- Add the upstream repository as a new remote

```shell
# Clone repository
git clone git@github.com:$YOUR_GITHUB_USER/orbits.git

# Add upstream origin
git remote add upstream git@github.com:/LaWebcapsule/orbits.git
```

### 2. Create a pull request

```shell
# Create a new feature branch
git checkout -b my_feature_branch

# Make changes to your branch
# ...

# Commit changes - remember to sign!
git commit -s

# Push your new feature branch
git push my_feature_branch

# Create a new pull request from https://github.com/dagger/dagger
```

### 3. Add release notes fragment

Please add a line for the release notes.

```shell
pnpm changeset
```

### 4. Update your pull request with latest changes

```shell
# Checkout main branch
git checkout main

# Update your fork's main branch from upstream
git pull upstream main

# Checkout your feature branch
git checkout my_feature_branch

# Rebase your feature branch changes on top of the updated main branch
git rebase main

# Update your pull request with latest changes
git push -f my_feature_branch
```

## Commits

### License

Contributions to this project are made under the MIT License (MIT).

### DCO

Contributions to this project must be accompanied by a Developer Certificate of
Origin (DCO).

All commit messages must contain the Signed-off-by line with an email address
that matches the commit author. When committing, use the `--signoff` flag:

```shell
git commit -s
```

The Signed-off-by line must match the **author's real name**, otherwise the PR will be rejected.


## Docs

### Use relative file paths for links

Instead of using URLs to link to a doc page, use relative file paths instead:

```markdown
❌ This is [a problematic link](/doc-url).

✅ This is [a good link](../relative-doc-file-path.md).
```

The docs compiler will replace file links with URLs automatically. This helps
prevent broken internal links. If a file gets renamed, the compiler will catch
broken links and throw an error. [Learn
more](https://docusaurus.io/docs/markdown-features/links).
