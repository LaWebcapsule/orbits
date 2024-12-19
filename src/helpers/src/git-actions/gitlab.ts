import { Gitlab, Types } from '@gitbeaker/node';
import { GitProvider, gitProviders } from './gitcenter';
import { Commit } from './gitrepo';

// API documentation: https://docs.gitlab.com/ee/api/projects.html

export class GitlabApi implements GitProvider {
    url = 'gitlab.com';
    providerName = gitProviders.GITLAB;

    gitBeaker: InstanceType<typeof Gitlab> = new Gitlab({});

    constructor(public authConfig: GitProvider['authConfig']) {
        this.gitBeaker = new Gitlab({
            token: authConfig.token,
        });
    }

    addWebHook(
        projectId: string,
        targetUrl: string,
        events: string[]
    ): Promise<Types.ProjectHookSchema> {
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
