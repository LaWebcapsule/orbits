import { spawn, SpawnOptions, SpawnOptionsWithoutStdio } from "child_process"
import { Stream, Writable } from "stream";

export class Cli{

    command(command : string, args : string[], options : SpawnOptionsWithoutStdio & {stderr? : Writable, stdout? : Writable} = {}){
        return new Promise<void>((resolve, reject)=>{
            const childProcess = spawn(command, args, {...options});
            let error : Error;
            childProcess.on("error", (err)=>{
                error = new Error();
                error.message = String(err);
                /* if((err as any).code  === 'ENOENT'){
                    error = 'command not found!'
                } */
            })
            childProcess.stderr.pipe(options.stderr || process.stderr);
            childProcess.stdout.pipe(options.stdout || process.stdout);


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