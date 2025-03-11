import type { Endpoints } from '@octokit/types';
import { Octokit } from 'octokit';
import { GitProvider, gitProviders } from './gitcenter.js';
import { Commit } from './gitrepo.js';

export interface GithubRepoResponse {
    id: number;
    default_branch: string;
    ssh_url: string;
    clone_url: string;
    owner: {
        id: number;
        login: string;
    };
    name: string;
    name_with_namespace: string;
    created_at: string; //timestamp
}

export class GithubApi implements GitProvider {
    url = 'api.github.com';
    providerName = gitProviders.GITHUB;
    octokit: Octokit;

    constructor(public authConfig: GitProvider['authConfig']) {
        let octokitAuth = {};
        if (authConfig.token) {
            octokitAuth = {
                auth: authConfig.token,
            };
        }

        this.octokit = new Octokit({
            ...octokitAuth,
        });
    }

    getCurrentUser(): Promise<Endpoints['GET /user']['response']> {
        return this.octokit.rest.users.getAuthenticated();
    }

    /**
     * From the repo parameter, infer owner and repoName
     * If repo is, e.g., "LaWebcapsule/Orbits", owner will be "LaWebcapsule", repoName, "Orbits"
     * If repo is, e.g., "MyRepo", owner will be the authenticated user, repoName, "MyRepo"
     * @param repo : string
     * @returns {
     *  user : the current user,
     *  owner : the most probable owner,
     *  repoName : the repository name
     * }
     */
    getOwnerAndRepoName(repo: string) {
        const repoData = repo.split('/');
        if (repoData.length === 2) {
            return Promise.resolve({
                owner: repoData[0],
                repoName: repoData[1],
            });
        } else {
            return this.getCurrentUser().then((user) => ({
                owner: user.data.login,
                repoName: repo,
            }));
        }
    }

    getDateOfCommit(repo: string, sha: string) {
        return this.getOwnerAndRepoName(repo).then((repoInfo) =>
            this.octokit.rest.repos
                .listCommits({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    sha,
                })
                .then((res) => res.data[0].commit.author.date)
        );
    }

    getLastCommitsOnBranch(repo: string, branch: string, since: Date) {
        return this.getOwnerAndRepoName(repo)
            .then((repoInfo) =>
                this.octokit.rest.repos.listCommits({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    sha: branch,
                    since: since.toISOString(),
                })
            )
            .then((res) => {
                const result: Commit[] = [];
                for (const commit of res.data) {
                    result.push({
                        createdAt: new Date(commit.commit.author.date),
                        sha: commit.sha,
                    });
                }
                return result;
            });
    }

    isPrOpened(repo: string, branchId: string): Promise<boolean> {
        // if given branchId is in the format `user:ref-name` or `organization:ref-name`
        // we only take ref-name as repo owner will be prepended
        const [refId] = branchId.split(':').reverse();
        return this.getOwnerAndRepoName(repo)
            .then((repoInfo) =>
                this.octokit.rest.pulls.list({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    head: `${repoInfo.owner}:${refId}`,
                    state: 'open',
                })
            )
            .then((infos) =>
                Boolean(
                    infos.data.length &&
                        // make sure data includes the given ref
                        infos.data.find((data) => data.head.ref === refId)
                )
            );
    }

    addWebHook(
        repo: string,
        targetUrl: string,
        events: string[]
    ): Promise<Endpoints['POST /repos/{owner}/{repo}/hooks']['response']> {
        return this.getOwnerAndRepoName(repo).then((repoInfo) =>
            this.octokit.rest.repos.createWebhook({
                owner: repoInfo.owner,
                repo: repoInfo.repoName,
                name: 'web',
                events,
                config: {
                    url: targetUrl,
                },
            })
        );
    }
}
