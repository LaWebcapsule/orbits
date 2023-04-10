import { Action, ActionState } from "@wbce/orbits-core";
import { gitCenter, GitProvider, gitProviders } from "./gitcenter";
import { Commit } from "./gitrepo";


export class GitAction extends Action{
    //to note : this action is not registered. It serves as a base for the other actions.
    IArgument: {
        repoName : string,
        gitProviderName : gitProviders
    }


    gitProvider : GitProvider;
    initGitProvider(){
        let gitToken = process.env['git_token'];
        if(!gitToken && this.argument.gitProviderName === gitProviders.GITHUB){
            gitToken = process.env['gh_token']
        }
        else if(!gitToken && this.argument.gitProviderName === gitProviders.GITLAB){
            gitToken = process.env['gitlab_token'];
        }
        this.gitProvider = gitCenter.getGitProvider(this.argument.gitProviderName, {
            token : gitToken
        })   
    }

    init(){
        return Promise.resolve().then(()=>{
            return this.initGitProvider();
        });
    }
}



export class AddGitWebHookAction extends GitAction{
    IArgument : GitAction['IArgument'] & {
        targetUrl : string,
        events : string[]
    }

    static defaultDelay = 2*60*1000;

    main(){
        return this.gitProvider.addWebHook(
            this.argument.repoName, 
            this.argument.targetUrl,
            this.argument.events
        )
    }

    watcher(){
        //pas de watch pour l'instant donc on ajoute plusiers fois le hook si erreur
        //sinon il faudrait ici verifier l'ajout du hook avec une requete http
        return Promise.resolve(ActionState.UNKNOW);
    }
}





export class WaitForNewCommits extends GitAction{

    static defaultDelay = Infinity;//potentiellement infini

    IArgument : {
        branches : {
            name: string,
            lastCommit? : Commit
        }[]
    } & GitAction['IArgument']

    IResult : {
        branches : {
            name : string,
            commits : Commit[]
        }[]
    }

    static cronDefaultSettings = {
        activityFrequence : 24*60*60*1000
    }

    init(){
        return super.init().then(()=>{
            if(!this.result.branches){
                this.result.branches = [];
            }
        })
    }

    main(){
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher() : Promise<ActionState>{
        let hasNewCommits = false;
        let p = Promise.resolve();
        for(const branch of this.argument.branches){
            const since = branch.lastCommit?.createdAt.getTime() || 0;
            p = p.then(()=>{
                return this.gitProvider.getLastCommitsOnBranch(
                    this.argument.repoName,
                    branch.name,
                    new Date(since)
                )
            }).then((commits)=>{
                commits = commits.filter(c=>{
                    return c.sha !== branch.lastCommit?.sha
                })
                if(commits.length > 0){
                    hasNewCommits = true
                    this.result.branches.push({
                        name : branch.name,
                        commits : commits
                    })
                }
            })
        }
        return p.then(()=>{
            if(hasNewCommits){
                return ActionState.SUCCESS
            }
            else{
                return ActionState.IN_PROGRESS
            }
        })

    }
}