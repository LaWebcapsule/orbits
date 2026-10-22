import {
    AddResourceHookOptions,
    Gitlab,
    ProjectHookSchema,
} from '@gitbeaker/rest';
import { GitProvider, gitProviders } from './gitcenter.js';
import { Commit } from './gitrepo.js';

// API documentation: https://docs.gitlab.com/ee/api/projects.html

/** GitLab has no `events` parameter: it takes one boolean per event type. */
export function toGitlabHookOptions(events: string[]): AddResourceHookOptions {
    const options: Record<string, boolean> = {};
    for (const event of events) {
        options[event] = true;
    }
    return options as AddResourceHookOptions;
}

export class GitlabApi implements GitProvider {
    url = 'gitlab.com';
    providerName = gitProviders.GITLAB;

    gitBeaker: Gitlab;

    constructor(public authConfig: GitProvider['authConfig']) {
        this.gitBeaker = new Gitlab({
            token: authConfig.token,
        });
    }

    addWebHook(
        projectId: string,
        targetUrl: string,
        events: string[]
    ): Promise<ProjectHookSchema> {
        return this.gitBeaker.ProjectHooks.add(
            projectId,
            targetUrl,
            toGitlabHookOptions(events)
        );
    }

    getLastCommitsOnBranch(
        id: string,
        branch: string,
        since: Date
    ): Promise<Commit[]> {
        return this.gitBeaker.Commits.all(id, {
            since: since.toISOString(),
        }).then((res) => {
            const result: Commit[] = [];
            for (const commit of res) {
                result.push({
                    // GitLab sends an ISO string, Commit.createdAt is a Date.
                    createdAt: new Date(commit.created_at),
                    sha: commit.id,
                });
            }
            return result;
        });
    }
}
