
export abstract class Resource{

    constructor(){

    }

    abstract identity()

    abstract install()

    abstract mount()

    abstract unmount()

    abstract hasChange()

    abstract update()

    abstract delete()

} 


export class SocleResource extends Resource{


    install(){
        const resource = new SocleResource();
        await this.do("...", )
        await this.do("...", new Resource().install());
        await this.do("...")
    }



}


