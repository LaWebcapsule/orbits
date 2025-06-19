
import { Chart } from 'cdk8s';
import { Construct } from 'constructs';

import { ActionRuntime } from '@wbce/orbits-core';
import { Deployment, Service, ServiceType } from 'cdk8s-plus-32';
import { Cdk8sResource } from './src/standards-actions/cdk/cdk8s/cdk8s-resource.js';

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
                    securityContext: {
                        user: 1000,
                    },
                },
            ],
        });
    }
}

export class MyAction extends Cdk8sResource {
    static permanentRef = 'test-cdk8s';

    generateStack(): this['stack'] | Promise<this['stack']> {
        return new Core(this.cdkApp, this.argument.stackName);
    }
}

const main = async () => {
    await ActionRuntime.waitForActiveRuntime;
    console.log('will start');
    const action = new MyAction();
    action.setArgument({ stackName: 'test' });
    action.save();
};

main();