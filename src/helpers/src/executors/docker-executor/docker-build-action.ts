import {Action} from "@wbce/actions";
import { DockerExecutor } from "./docker-executor";
import { EcrRegistry } from "./ecr-registry";
import Docker from "dockerode"



export class DockerBuildAction extends Action{
    executor = new DockerExecutor({
        registry : new EcrRegistry('')
    })


    IArgument: {
        dockerfilePath : string,
        imageName : string,
        tag : string
    };


    registry : DockerExecutor['registry'];

    init(){
        return Promise.resolve()
    }



    main(){
        const dockerClient = new Docker({socketPath: '/var/run/docker.sock'})
        return new Promise((resolve, reject)=>{
            dockerClient.buildImage(this.argument.dockerfilePath, {t: `${this.argument.imageName}:${this.argument.tag}`}, function(err, response){
                if(err){
                    reject(err)
                }
                else{
                    dockerClient.modem.followProgress(response, (err, res) => err ? reject(err) : resolve(res))
                }
            })
        }).then(()=>{
            return this.registry.getCredentials()
        }).then((authInfo)=>{
            const opts = {
                tag : this.argument.tag
            }
            authInfo ? opts['authconfig'] = authInfo : null;
            return dockerClient.getImage(`${this.argument.imageName}:${this.argument.tag}`).push(opts)
        })
    }


}