import * as ecr from '@aws-sdk/client-ecr';

export class EcrRegistry {
    ecrClient: ecr.ECRClient;

    constructor(
        public url,
        public tag = 'latest',
        opts?: ecr.ECRClientConfig
    ) {
        this.ecrClient = new ecr.ECRClient(opts);
    }

    getCredentials() {
        const command = new ecr.GetAuthorizationTokenCommand({});
        return this.ecrClient.send(command).then((res) => {
            let authInfo = res.authorizationData[0];
            let [user, pass] = Buffer.from(
                authInfo.authorizationToken,
                'base64'
            )
                .toString()
                .split(':');
            return {
                username: user,
                password: pass,
                serveraddress: new URL(authInfo.proxyEndpoint).host,
            };
        });
    }
}
