import { Cdk8sAction } from './src/standards-actions/cdk8s/cdk8s-action.js';

import { Chart } from 'cdk8s';
import { Construct } from 'constructs';

import { Deployment, Service, ServiceType } from 'cdk8s-plus-29';
import { Action, ActionState } from '@wbce/orbits-core';

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

export class MyAction extends Action {
    static permanentRef = 'coucou';

    // generateStack(): this['stack'] | Promise<this['stack']> {
    //     return new Core(this.cdkApp, 'test-core');
    // }

    main() {
        console.log('MMMMAAAAAAAIIIIIINNNNN');
        return ActionState.SUCCESS;
    }
}


// const action = new MyAction();
// action.save();
