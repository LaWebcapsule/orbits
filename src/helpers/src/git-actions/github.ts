import { Octokit } from 'octokit';
import { createTokenAuth } from '@octokit/auth-token';
import { GitProvider, gitProviders } from './gitcenter';
import { Commit } from './gitrepo';

export interface GithubRepoResponse {
    //d'autres params non indiques ici
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
        } else {
            /**
             * octokitAuth = {
             *  authStategy : ...,
             *  auth : ...(an object)
             * }
             */
        }

        this.octokit = new Octokit({
            ...octokitAuth,
        });
    }

    getCurrentUser() {
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
            return this.getCurrentUser().then((user) => {
                return {
                    owner: user.data.login,
                    repoName: repo,
                };
            });
        }
    }

    getDateOfCommit(repo: string, sha: string) {
        return this.getOwnerAndRepoName(repo).then((repoInfo) => {
            return this.octokit.rest.repos
                .listCommits({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    sha,
                })
                .then((res) => {
                    return res.data[0].commit.author.date;
                });
        });
    }

    getLastCommitsOnBranch(repo: string, branch: string, since: Date) {
        return this.getOwnerAndRepoName(repo)
            .then((repoInfo) => {
                return this.octokit.rest.repos.listCommits({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    sha: branch,
                    since: since.toISOString(),
                });
            })
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
        return this.getOwnerAndRepoName(repo)
            .then((repoInfo) => {
                return this.octokit.rest.pulls.list({
                    owner: repoInfo.owner,
                    repo: repoInfo.repoName,
                    query: {
                        head: branchId,
                        state: 'open',
                    },
                });
            })
            .then((infos) => {
                return infos.data.length ? true : false;
            });
    }

    addWebHook(repo: string, targetUrl: string, events: string[]) {
        return this.getOwnerAndRepoName(repo).then((repoInfo) => {
            return this.octokit.rest.repos.createWebhook({
                owner: repoInfo.owner,
                repo: repoInfo.repoName,
                name: 'web',
                events,
                config: {
                    url: targetUrl,
                },
            });
        });
    }
}
