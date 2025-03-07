import { Action, ActionApp, CoreActionApp } from '../index.js';

export class TestAction extends Action {}

export class ImportedApp extends ActionApp {
    declare = [TestAction];
}

export class ImportingApp extends ActionApp {
    imports: (typeof ActionApp)[] = [ImportedApp];
}

describe('action app', () => {
    it('bootstrap should import', () => {
        const app = new ImportingApp();
        const coreApp = new CoreActionApp();
        app.bootstrap().catch(() => {});
        //we don't wait end of bootstrap, because we don't care about the connection db here.
        expect(app.declare).toEqual([TestAction, ...coreApp.declare]);
    });

    describe('registerAction should work', function () {
        it('with permanentRef as array of strings', () => {
            const app = new ActionApp();
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
            const app = new ActionApp();
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
            const app = new ActionApp();
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
