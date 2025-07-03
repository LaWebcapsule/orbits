import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-29';
import { Construct } from 'constructs';
import {
	WBCEChart,
	WBCEChartProps,
} from '../../../../clouds/cdk8s/wbce-chart.js';
import { logger } from '../../../../logger/logger.js';
import { OvhRouteConstruct } from '../../kubernetes-ingress/ovh/cdk8s/route-construct.js';

export interface HeadlampDeploymentChartProps extends WBCEChartProps {
	ingress: {
		certIssuer: {
			name: string;
			kind: string;
		};
	};
	namespace: string;
	urls: URL[];
}

export class HeadlampDeploymentChart extends Chart {
	IMG_VERSION = 'v0.25.0';

	constructor(
		scope: Construct,
		id: string,
		props: HeadlampDeploymentChartProps
	) {
		super(scope, id, props);

		new kplus.Namespace(this, props.namespace, {
			metadata: { name: props.namespace },
		});

		const deployment = new kplus.Deployment(this, 'headlamp-deployment', {
			replicas: 1,
			securityContext: {
				user: 100,
				group: 101,
			},
			automountServiceAccountToken: true,
			containers: [
				{
					resources: {
						cpu: { request: kplus.Cpu.millis(250) },
						memory: { request: cdk8s.Size.mebibytes(512) },
					},
					name: 'headlamp',
					image: `ghcr.io/headlamp-k8s/headlamp:${this.IMG_VERSION}`,
					args: ['-in-cluster', '-plugins-dir=/headlamp/plugins'],
					port: 4466,
					liveness: kplus.Probe.fromHttpGet('/', {
						initialDelaySeconds: cdk8s.Duration.seconds(30),
						timeoutSeconds: cdk8s.Duration.seconds(30),
					}),
					securityContext: {
						readOnlyRootFilesystem: false,
					},
				},
			],
		});

		const service = deployment.exposeViaService({
			ports: [{ port: deployment.containers[0].portNumber }],
		});

	}
}
