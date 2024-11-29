import { DockerAction } from './actions-test';
import { ActionState } from '@wbce/orbits-core';

describe('Test action', () => {
    const testAction = new DockerAction();
    testAction.setArgument({ y: 1 });

    beforeAll(() => {
        spyOn(testAction, 'init');
        return testAction.dbDoc
            .save()
            .then(
                () =>
                    new Promise<void>((resolve) => {
                        setTimeout(
                            () => {
                                resolve();
                            },
                            2 * 60 * 1000
                        );
                    })
            )
            .then(() => testAction.resyncWithDb());
    });

    it('should  be a success', () => {
        expect(testAction.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testAction.result.z).toEqual(10);
    });

    afterAll(() => testAction.dbDoc.remove());
});
