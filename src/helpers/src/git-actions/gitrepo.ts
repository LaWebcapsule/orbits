import { o } from "@wbce/services";
import { gitProviders } from "./gitcenter";


export interface Commit{
    createdAt : Date,
    sha : string
}


export class GitRepo{
    url : URL;
    providerName : gitProviders;
    gitId : string;
    name : string;
    projectName : string;
    description : string;
    hooks : string[] = []
    loaded : boolean = false;//internal : pour savoir si info a jour ou non
 
    constructor(obj : {providerName, gitId, 
        url?, name?, description?, currentBranch?, loaded?, serviceId?, hooks?}){
        o.deepCopy(obj, this);
        if(obj.url instanceof URL){
            this.url = obj.url;//le deep copy n'est pas bon ici.
        }
        else if(obj.url){
            this.url = new URL(obj.url)
        }
        this.projectName = this.projectName || this.name;
    }

}