import { Octokit } from 'octokit';
import {createTokenAuth} from '@octokit/auth-token'
import { GitProvider, gitProviders } from './gitcenter';
import { Commit } from './gitrepo';

export interface GithubRepoResponse{//d'autres params non indiques ici
    id : number,
    default_branch : string,
    ssh_url : string,
    clone_url : string,
    "owner": {
        "id": number,
        "login": string,
    },
    "name": string,
    "name_with_namespace": string,
    created_at : string //timestamp
}

export class GithubApi implements GitProvider{
    url = "api.github.com";
    providerName = gitProviders.GITHUB;
    octokit : Octokit

    constructor(public authConfig : GitProvider['authConfig']){
        let authStrategy, authInfo;
        if(authConfig.token){
            authStrategy = createTokenAuth,
            authInfo = authConfig.token
        }

        this.octokit = new Octokit({
            authStrategy,
            auth: authInfo
        })
    }

    getCurrentUser(){
        return this.octokit.rest.users.getAuthenticated()
    }

    getDateOfCommit(repo : string, sha : string){
        return this.getCurrentUser().then((user)=>{
            return this.octokit.rest.repos.listCommits({
                owner : user.data.login,
                repo,
                sha
            }).then((res)=>{
                return res.data[0].commit.author.date
            })
        })
    }

    getLastCommitsOnBranch(repo : string, branch : string, since : Date){
        return this.getCurrentUser().then((user)=>{
            return this.octokit.rest.repos.listCommits({
                owner : user.data.login,
                repo,
                sha : branch,
                since : since.toISOString()
            })
        }).then(res=>{
            const result : Commit[] = [];
            for(const commit of res.data){
                result.push({
                    createdAt : new Date(commit.commit.author.date),
                    sha : commit.sha
                })
            }
            return result;
        })
    }

    isPrOpened(id: string, branchId: string): Promise<boolean> {
        return this.getCurrentUser().then((user)=>{
            return this.octokit.rest.pulls.list({
                repo : id,
                owner: user.data.login,
                query : {
                    head: branchId,
                    state: "open"
                }
            })
        }).then((infos)=>{
            return infos.data.length ? true : false;
        })
    }

    addWebHook(repo: string, targetUrl : string, events : string[]){
        return this.getCurrentUser().then((user)=>{
            return this.octokit.rest.repos.createWebhook({
                owner : user.data.login,
                repo,
                name : 'web',
                events,
                config : {
                    url : targetUrl
                }
            })
        })
    }

}