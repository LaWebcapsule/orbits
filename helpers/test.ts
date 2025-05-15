import { ActionApp } from '@wbce/orbits-core';
import { Cdk8sAction } from './src/standards-actions/cdk8s/cdk8s-action.js';

import { Chart } from 'cdk8s';
import { Construct } from 'constructs';

// imported constructs
// import { Deployment, Service, IntOrString } from './imports/k8s';
import { Deployment, Service, ServiceType } from 'cdk8s-plus-29';

export class Core extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const label = { app: 'hello-k8s' };

        new Service(this, 'service', {
            type: ServiceType.LOAD_BALANCER,
            ports: [{ port: 80, targetPort: 8080 }],
        });

        new Deployment(this, 'deployment', {
            containers: [
                {
                    name: 'hello-kubernetes',
                    image: 'paulbouwer/hello-kubernetes:1.7',
                    ports: [{ number: 8080 }],
                },
            ],
        });
    }
}

class MyAction extends Cdk8sAction {
    static permanentRef = 'coucou';

    generateStack(): this['stack'] | Promise<this['stack']> {
        return new Core(this.cdkApp, 'test-core');
    }
}

class MyApp extends ActionApp {
    declare = [MyAction];
}

export default {
    action: MyAction,
    app: MyApp,
};
