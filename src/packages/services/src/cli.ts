import { spawn } from "child_process"

export class Cli{

    command(command : string, args : string[], options = {}){
        return new Promise<void>((resolve, reject)=>{
            const childProcess = spawn(command, args, {...options, stdio: ['inherit', 'inherit', 'inherit']});
            let error : Error;
            childProcess.on("error", (err)=>{
                error = new Error();
                error.message = String(err);
                /* if((err as any).code  === 'ENOENT'){
                    error = 'command not found!'
                } */
            })
            childProcess.on("close", (code)=>{
                if(error){
                    reject(error);
                }
                else if(code===0){
                    resolve()
                }
                else{
                    //on pourrait faire une liste des erreurs standards
                    error = new Error();
                    error.message = `Process ${command} exited with code ${code}`;
                    reject(error);
                }
            })
        })
    }
}