import {
    CloudFrontClient,
    CreateInvalidationCommand,
    CreateInvalidationCommandInput,
    GetInvalidationCommand,
} from '@aws-sdk/client-cloudfront';
import { Action, ActionState } from '@orbi-ts/core';
export enum distributionStates {
    COMPLETED = 'Completed',
    DEPLOYED = 'Deployed',
}

export class InvalidateCacheAction extends Action {
    declare IArgument: {
        distributionId: string;
        env: { region: string };
    };

    declare IBag: Action['IBag'] & {
        distributionId: string;
    };

    client?: CloudFrontClient;

    async init() {
        this.client = new CloudFrontClient({
            region: this.argument.env.region,
        });
    }

    async createInvalidation(distributionId: string) {
        const params: CreateInvalidationCommandInput = {
            DistributionId: distributionId,
            InvalidationBatch: {
                CallerReference: 'hello-invalidate',
                Paths: {
                    Quantity: 1,
                    Items: ['/*'],
                },
            },
        };
        const res = await this.client!.send(
            new CreateInvalidationCommand(params)
        );
        return res.Invalidation?.Id;
    }

    async checkInvalidationFinished(
        distributionId: string,
        invalidationId: string
    ) {
        const res = await this.client!.send(
            new GetInvalidationCommand({
                DistributionId: distributionId,
                Id: invalidationId,
            })
        );
        return res.Invalidation?.Status === 'Completed';
    }

    async main() {
        const invalidationId = await this.createInvalidation(
            this.argument.distributionId
        );
        this.bag.invalidationId = invalidationId;
        return ActionState.IN_PROGRESS;
    }

    async watcher() {
        if (
            await this.checkInvalidationFinished(
                this.argument.distributionId,
                this.bag.invalidationId
            )
        ) {
            return ActionState.SUCCESS;
        }
        return ActionState.IN_PROGRESS;
    }
}
