import { Workflow } from "./../index.js";


export class Deploy extends Command{

}

export class Generator{

    IResult: any;

    constructor(){
    }

    identity():Object{
        return;
    }
    sortOrder(){
        
    }

    oneCycle(tokenExecution : string){
        if(tokenExecution.includes("changes")){

        }
    }

    generate(){
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }

    }

    private async define(){
        while(true){
            await this.call("init", {})
            await this.call("body")
            if(this.quit){
                await this.do("quit");
            }
        }
    }

}

export class Resource{

    install(){
        await this.do("xyz", ...)
        await this.do("xyz", ...)

    }

    define(){
    
    }

    update(){

    }

    uninstall(){

    }

    digest(){
        if(this.codeHasChanged() && this.initHasChanged()){
            return this.completeDef()
        }
        else{
            return this.update()
        }
        if(this.argument === 'delete'){
            return this.delete()
        }
    }




}