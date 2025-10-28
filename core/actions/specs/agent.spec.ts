import { Action, ActionRuntime, ActionState } from '../index.js';
import { BlankAgent } from './test-action.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('Agent', () => {
    const testAgent = new BlankAgent();
    let testAgentUpdate = new BlankAgent();
    let testAgentChangeVersion = new BlankAgent();
    testAgentChangeVersion.setArgument({
        version: '2.0.0',
    });

    beforeAll(() => {
        console.log('before all');
        return ActionRuntime.activeRuntime.ActionModel.deleteMany({})
            .then(() => {
                return ActionRuntime.activeRuntime.AgentModel.deleteMany({});
            })
            .then(() => {
                return Promise.all([testAgent.save()]);
            })
            .then(() => {
                const endState = [ActionState.SUCCESS, ActionState.ERROR];
                return Promise.all([
                    Action.trackActionAsPromise(testAgent, endState),
                ]);
            })
            .then(() => {
                return testAgentUpdate.save();
            })
            .then(() => {
                return Action.trackActionAsPromise(testAgentUpdate, [
                    ActionState.SUCCESS,
                    ActionState.ERROR,
                ]);
            })
            .then(() => {
                return testAgentChangeVersion.save();
            })
            .then(() => {
                return Action.trackActionAsPromise(testAgentChangeVersion, [
                    ActionState.SUCCESS,
                    ActionState.ERROR,
                ]);
            })
            .then(() => {
                return Promise.all([
                    testAgent.resyncWithDb(),
                    testAgentChangeVersion.resyncWithDb(),
                    testAgentUpdate.resyncWithDb(),
                ]);
            });
    });

    it('should be in success', () => {
        expect(testAgent.dbDoc.state).toEqual(ActionState.SUCCESS);
        expect(testAgentChangeVersion.dbDoc.state).toEqual(
            ActionState.SUCCESS
        );
        expect(testAgentUpdate.dbDoc.state).toEqual(ActionState.SUCCESS);
    });

    it('should have been installed twice', async () => {
        const agent = new BlankAgent();
        await agent.initialization();
        expect(agent.agentDbDoc.info['ninstall']).toEqual(2);
    });

    it('should have been updated three times', async () => {
        const agent = new BlankAgent();
        await agent.initialization();
        expect(agent.agentDbDoc.info['nupdate']).toEqual(3);
    });

    it('should have one controller', async () => {
        const controllers = await ActionRuntime.activeRuntime.ActionModel.find({
            actionRef: 'AgentController',
        });
        expect(controllers).toHaveSize(1);
    });

    it('should have correct output', async () => {
        const agent = new BlankAgent();
        const output = await agent.getAgentOutput();
        expect(output as any).toEqual({
            xyz: 'abc',
        });
    });
});
