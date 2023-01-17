import { Action } from "@wbce/orbits-core";
import { DockerExecutor, PublicRegistry } from "@wbce/orbits-fuel";
import { Cli } from "@wbce/services";


export class GitCloneAction extends Action{
    //this action is only a basis for other action and is not registered as an action itself
    executor = new DockerExecutor({
        registry : new PublicRegistry('node','16.14.2')
    })

    cli = new Cli()

    init(){
        console.log("init git")
        console.log(process.env);
        return this.cli.command("git",  ["config", "--global", "user.name", process.env['git_user']!] ).then(()=>{
            console.log("first git command")
            return this.cli.command("git",  ["config", "--global", "user.password", process.env['git_pwd']!] )
        })
    }

    gitClone(){
        return this.cli.command("git", ["clone", "https://github.com/semantic-release/semantic-release.git", "/tmp/orbits"]).then(()=>{
            return process.chdir(`/tmp/orbits/`)
        })
    }

}