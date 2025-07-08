import { utils } from '@orbi-ts/services';
import { gitProviders } from './gitcenter.js';

export interface Commit {
    createdAt: Date;
    sha: string;
}

export class GitRepo {
    url: URL;
    providerName: gitProviders;
    gitId: string;
    name: string;
    projectName: string;
    description: string;
    hooks: string[] = [];
    loaded: boolean = false; // internal to know whether info is up to date

    constructor(obj: {
        providerName;
        gitId;
        url?;
        name?;
        description?;
        currentBranch?;
        loaded?;
        serviceId?;
        hooks?;
    }) {
        utils.deepCopy(obj, this);
        if (obj.url instanceof URL) {
            this.url = obj.url; // deep copy is not correct here
        } else if (obj.url) {
            this.url = new URL(obj.url);
        }
        this.projectName = this.projectName || this.name;
    }
}
