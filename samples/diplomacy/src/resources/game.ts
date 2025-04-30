import { Action, ActionError, Digestor, Generator, Resource, ScopeOfChanges, Workflow } from "@wbce/orbits-core/index.js";

export class Game extends Resource{
    IArgument: { commandName: string; emails : string[]; name: string; };

    identity(){
        //make this more safe and avoid using this.dbDoc.id here
        return this.argument.name;
    }

    defineInstall(): void {
        const playerPromises = [];
        for(const email of this.argument.emails){
            playerPromises.push(
                this.do("xyz", new Player().setArgument({
                    email
                }))
            )
        }
        await Promise.all(playerPromises);  
    }

    defineTurn(){
        const players = [new Player()];
        const positions = await this.do("calculatePosition", ()=>{
            await players.getResourceDoc();
        })
        for(const p of players){
            await this.do("move", p.move());
        }
        Promise.all(players.map(()=>{
            return this.do("play", players.play())
        }))
    }

    defineUpdate(){
        const orders = await this.defineTurn();
        await this.defineEndTurn();

        let orders = [];
        for(const email of this.argument.emails){
            const order = await this.do("playTurn", new Player().setCommand('BeginTurn')).then((result)=>{
                return {
                    email: result,
                    order: order
                }
            });
        }

        await Promise.all(orders);
    }

    definePositionPlayer(){
        const players = new Player();
        for(const player of players){
            await player.getResourceDoc()
        }

    }

    define(){
        const user = this.user;
        try{
            await this.do("")
        }
        catch(err){
            if(err){
                await this.defineUninstall()
            }
        }
    }
}

export class Player extends Resource{

    IArgument: { email: string; game: string };

    identity() {
        return this.argument;
    }

    sendEmail(){

    }

    defineInstall(){
        //better set repeat
        await this.once("sendEmail", this.sendEmail.bind(this));
    }

    definePosition(){
        const order = await this.do("waitFor", ()=>{

        })
    }

    defineBeginTurn(){
        await this.do("sendEmail", this.sendEmail.bind(this) );
        await this.do("waitForInput", ()=>{

        })
    }

    definePlay(){
        await this.do("waitFor", ()=>{

        })
    }

    defineFinalEmail(){

    }

    defineUpdate(){
        await this.waitForAction("turn", ...);
        await this.sendNotification("...", ...);
    }

    definePlay(){
        await this.do("waitForInput", ()=>{

        })
    }

}

export class GameWorkflow extends Generator{

    IArgument: { commandName: string; nPlayers : number; userId: string };

    identity(){
        return "userId";
    }

    substitute(otherPendingActionsWithSameIdentity: this["dbDoc"][]): this["dbDoc"] | undefined {
        if(!(otherPendingActionsWithSameIdentity.length < this.user.credits)){
            throw new ActionError("you have exhausted your credits.");
        }
    }

    define(){
        const user = this.user;
        try{
            await this.do("")
        }
        catch(err){
            if(err){
                await this.defineUninstall()
            }
        }
    }


}