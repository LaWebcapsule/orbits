import { GitProvider, gitProviders } from './gitcenter';
import { Gitlab } from '@gitbeaker/node';
import { Commit } from './gitrepo';
/**
 * documentation de l'api : https://docs.gitlab.com/ee/api/projects.html
 */

export class GitlabApi implements GitProvider {
    url = 'gitlab.com';
    providerName = gitProviders.GITLAB;

    gitBeaker = new Gitlab({});

    constructor(public authConfig: GitProvider['authConfig']) {
        this.gitBeaker = new Gitlab({
            token: authConfig.token,
        });
    }

    addWebHook(projectId: string, targetUrl: string, events: string[]) {
        return this.gitBeaker.ProjectHooks.add(projectId, targetUrl, {
            events,
        });
    }

    getLastCommitsOnBranch(
        id: string,
        branch: string,
        since: Date
    ): Promise<any> {
        return this.gitBeaker.Commits.all(id, {
            since,
        }).then((res) => {
            const result: Commit[] = [];
            for (const commit of res) {
                result.push({
                    createdAt: commit.created_at,
                    sha: commit.id,
                });
            }
            return result;
        });
    }
}
