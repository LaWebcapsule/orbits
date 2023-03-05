import {  ActionState } from "../index";
import { BasicWorkflow, TestRollBack, x } from "./test-action";

describe("testing workflow -", () => {
  

  let basicWorkflow = new BasicWorkflow();
  basicWorkflow.setArgument({ x: 14})
  basicWorkflow.dbDoc.save();

  beforeAll(() => {
    jasmine.setDefaultSpyStrategy((and) => and.callThrough());
    return new Promise((resolve)=>{
      let i = 0;
      let runTime = 10;//seconds
      const sI = setInterval(()=>{
        console.log(`launching tests in ${runTime-i} seconds`);
        if(i>runTime){
          clearInterval(sI);
          console.log("debut des tests!")
          resolve("ok");
        }
        i++
      }, 1000)
    }).then(()=>{
      return basicWorkflow.resyncWithDb();
    })
  });

  it("should be a sucess", () => {
      expect(basicWorkflow.dbDoc.state).toEqual(ActionState.SUCCESS);
      //expect(basicWorkflow.dbDoc.nExecutions[ActionState.SUCCESS]).toEqual(1);
  });

  it("should have correct path", ()=>{
    expect(basicWorkflow.bag.stepsHistory).toEqual([0, 1, 3, 4])
  })

  it("should have launched sub-actions", ()=>{
    return basicWorkflow.app.ActionModel.find({workflowId : basicWorkflow.dbDoc._id}).then(actions=>{
      expect(actions.length).toEqual(4)
    })
  })

  afterAll(()=>{
    return basicWorkflow.app.ActionModel.remove({workflowId : basicWorkflow.dbDoc._id})
  })
});

let rollBack;
describe("testing rollBack -", () => {
  let t;
  beforeAll(() => {
    jasmine.setDefaultSpyStrategy((and) => and.callThrough())
    t = new TestRollBack();
    return t.resume().then(()=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('launching rollback')
          rollBack = new t.RollBackWorkflow();
          rollBack.setArgument({
            actionId : t.dbDoc._id.toString()
          })
          rollBack.resume();
          resolve(rollBack);
        }, 2000)
      })
    }).then(()=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(1);
        }, 5000)
      })
    });
  });

  it("should be a sucess", () => {
    return t.app.ActionModel.findById(rollBack.dbDoc._id).then((tr) => {
      expect(tr.state).toEqual(ActionState.SUCCESS);
    });
  });

  it("should have rollBacked ressource", ()=>{
    expect(x).toEqual(0)
  })

  afterAll(()=>{
    /* return t.dbDoc.remove().then(()=>{
      return rollBack.dbDoc.remove()
    }); */
  })
});


