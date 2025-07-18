/* import { Action, ActionRuntime } from '../index.js';

export class TestAction extends Action {}

describe('action app', () => {

    describe('registerAction should work', function () {
        it('with permanentRef as array of strings', () => {
            const app = new ActionRuntime();
            const action = class testAction extends Action {};
            const expectedActionsRegistry = new Map();
            const expectedInvertedActionsRegistry = new Map();

            action.permanentRef = ['newRef', 'oldRef'];
            expectedActionsRegistry.set('newRef', action);
            expectedActionsRegistry.set('oldRef', action);
            expectedActionsRegistry.set(action.name, action);
            expectedInvertedActionsRegistry.set(action, 'newRef');

            app['registerAction'](action);
            expect(app['actionsRegistry']).toEqual(expectedActionsRegistry);
            expect(app['invertedActionsRegistry']).toEqual(
                expectedInvertedActionsRegistry
            );
        });

        it('with permanentRef as string', () => {
            const app = new ActionRuntime();
            const action = class testAction extends Action {};
            const expectedActionsRegistry = new Map();
            const expectedInvertedActionsRegistry = new Map();

            action.permanentRef = 'myRef';
            expectedActionsRegistry.set('myRef', action);
            expectedActionsRegistry.set(action.name, action);
            expectedInvertedActionsRegistry.set(action, 'myRef');

            app['registerAction'](action);
            expect(app['actionsRegistry']).toEqual(expectedActionsRegistry);
            expect(app['invertedActionsRegistry']).toEqual(
                expectedInvertedActionsRegistry
            );
        });

        it('with no permanentRef', () => {
            const app = new ActionRuntime();
            const action = class testAction extends Action {};
            const expectedActionsRegistry = new Map();
            const expectedInvertedActionsRegistry = new Map();

            expectedActionsRegistry.set(action.name, action);
            expectedInvertedActionsRegistry.set(action, action.name);

            app['registerAction'](action);
            expect(app['actionsRegistry']).toEqual(expectedActionsRegistry);
            expect(app['invertedActionsRegistry']).toEqual(
                expectedInvertedActionsRegistry
            );
        });
    });
});
 */
