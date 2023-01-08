

export class PublicRegistry{
    constructor(public url, public tag = 'latest'){
    }

    getCredentials(){
        return Promise.resolve();
    }
}