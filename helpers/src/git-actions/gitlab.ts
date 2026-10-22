import {
    AddResourceHookOptions,
    Gitlab,
    ProjectHookSchema,
} from '@gitbeaker/rest';
import { GitProvider, gitProviders } from './gitcenter.js';
import { Commit } from './gitrepo.js';

// API documentation: https://docs.gitlab.com/ee/api/projects.html

export class GitlabApi implements GitProvider {
    url = 'gitlab.com';
    providerName = gitProviders.GITLAB;

    gitBeaker: Gitlab;

    constructor(public authConfig: GitProvider['authConfig']) {
        // @gitbeaker/rest sends `PRIVATE-TOKEN: undefined` when the key is
        // present, @gitbeaker/node sent no header for a falsy token.
        this.gitBeaker = new Gitlab(
            authConfig.token ? { token: authConfig.token } : {}
        );
    }

    addWebHook(
        projectId: string,
        targetUrl: string,
        events: string[]
    ): Promise<ProjectHookSchema> {
        // GitLab ignores `events` (it expects one boolean per event type).
        // Sent unchanged to keep the 0.0.57 behavior on this maintenance line.
        return this.gitBeaker.ProjectHooks.add(projectId, targetUrl, {
            events,
        } as AddResourceHookOptions);
    }

    getLastCommitsOnBranch(
        id: string,
        branch: string,
        since: Date
    ): Promise<any> {
        return this.gitBeaker.Commits.all(id, {
            // @gitbeaker/node serialized the Date with toISOString().
            since: since.toISOString(),
        }).then((res) => {
            const result: Commit[] = [];
            for (const commit of res) {
                result.push({
                    // Still the raw ISO string, as with @gitbeaker/node.
                    createdAt: commit.created_at as unknown as Date,
                    sha: commit.id,
                });
            }
            return result;
        });
    }
}
