import {Action, ActionApp, registerActionApp} from './../index'



export class TestAction extends Action{

}

@registerActionApp({
    permanentName : 'ImportedApp'
})
export class ImportedApp extends ActionApp{
    declare = [TestAction]
}

@registerActionApp({
    permanentName : 'ImportingApp'
})
export class ImportingApp extends ActionApp{
    imports: (typeof ActionApp)[] = [ImportedApp];
}

describe('action app', ()=>{
    it('bootstrap should import', ()=>{
        const app = new ImportingApp();
        app.bootstrap().catch(()=>{});
        //we don't wait end of bootstrap, because we don't care about the connection db here.
        expect(app.declare).toEqual([TestAction]);
    })

})