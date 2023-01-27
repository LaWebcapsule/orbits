import { ActionApp } from "@wbce/orbits-core";
import { AddGitWebHookAction, WaitForNewCommits } from "./gitactions";
import { GithubApi } from "./github";
import { GitlabApi } from "./gitlab";
import { Commit } from "./gitrepo";


export enum gitProviders{
    GITLAB = 'gitlab',
    GITHUB = 'github'
}

export interface GitProvider{
    url : string ;
    authConfig? : {
        token? : string
    }
    providerName : string;
    getLastCommitsOnBranch(id : string, branch : string, since : Date): Promise<Commit[]>
    isPrOpened?(id : string, branchId : string) : Promise<boolean>
    addWebHook(id : string, targetUrl : string, events : string[], ) : Promise<any>
}

export const gitCenter = {
    registry : new Map<gitProviders, new(...args : any[])=>GitProvider>(),

    getGitProvider(providerName : gitProviders, authConfig : GitProvider['authConfig']){
        return new (gitCenter.registry.get(providerName))(authConfig);
    }

}

gitCenter.registry.set(gitProviders.GITHUB, GithubApi)
gitCenter.registry.set(gitProviders.GITLAB, GitlabApi);

export class GitHelperApp extends ActionApp{
    declare = [AddGitWebHookAction, WaitForNewCommits]
}