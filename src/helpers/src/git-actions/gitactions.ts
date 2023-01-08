import { Action, ActionState } from "@wbce/actions";
import { GitProvider, gitProviders } from "./gitcenter";
import { Commit } from "./gitrepo";


export class GitAction extends Action{
    //to note : this action is not registered. It serves as a base for the other actions.
    IArgument: {
        repoName : string
    }


    gitProvider : GitProvider;
    initGitProvider(){
        
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

    defaultDelay = 2*60*1000;

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

    defaultDelay = Infinity;//potentiellement infini

    IArgument : {
        branches : {
            name: string,
            lastCommit : Commit
        }[]
    } & GitAction['IArgument']

    IResult : {
        branches : {
            name : string,
            commits : Commit[]
        }[]
    }

    cronDefaultSettings = {
        activityFrequence : 24*60*60*1000
    }

    main(){
        return Promise.resolve(ActionState.IN_PROGRESS);
    }

    watcher() : Promise<ActionState>{
        let hasNewCommits = false;
        let p = Promise.resolve();
        for(const branch of this.argument.branches){
            p = p.then(()=>{
                return this.gitProvider.getLastCommitsOnBranch(
                    this.argument.repoName,
                    branch.name,
                    branch.lastCommit.createdAt
                )
            }).then((commits)=>{
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