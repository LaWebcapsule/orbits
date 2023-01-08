# Action documentation

Actions are the finest granular level of Orbits.  
An action represents the eventual completion (or failure) of an operation.
It stores its state in a database to be able to retrieve it despite of process failures or network incidents.
Moreover, it has a lock management that guarantees the consistness of the flow.

# Concepts
See the [conceptual documentation](./action-in-depth.md) for understanding how actions work.

# Write your first action
Action is good to follow the state of an external process.
The following example is fictive ; you can see real world example in the example folder.
Assume we have a library ; let's write an action which launch a delivery command and success if the delivery go to its term, fail if not. 


Step 1 : extends the Action class

```typescript
import {Action} from '@orbits/core'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'
}
```
The actionRef is important. When an action document is stored on the database, the actionRef is also stored. When orbits retrieve the document from the database, it will use this property to know which constructor it should call.
As a consequence, you should not modifiy the permanentName. Think about it like an id you give to your action - it has no other utility. 
If you don't specify any name, the name of the class will be use but this is more susceptible to change.


Step 2: choose the form of your argument, bag and result

```typescript
import {Action} from '@orbits/core'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'

    IArgument : {
        bookName : string
    }

    IBag : {
        deliveryPerson : {
            name : string,
            phoneNumber : string
        }
    }

    IResult : {
        deliverytime : number
    }
}

```

Step 3: (optional) write the init method


```typescript
import {Action} from '@orbits/core'
import {LibraryApi, Book} from './my-library'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'

    IArgument : {
        bookName : string
    }

    IBag : {
        deliveryPerson : {
            name : string,
            phoneNumber : string
        }
    }

    IResult : {
        deliverytime : number
    }

    book : Book

    init(){
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book)=>{
            this.book = book;
        })
    }
}
```

Step 4: write the main method
The main method will be called only once during all the lifecycle of an action

```typescript
import {Action} from '@orbits/core'
import {LibraryApi, Book} from './my-library'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'

    IArgument : {
        bookName : string
    }

    IBag : {
        commandId : number
    }

    IResult : {
        deliverytime : number
    }

    book : Book

    init(){
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book)=>{
            this.book = book;
        })
    }

    main(){
        const libraryApi = new LibraryApi();
        return libraryApi.createCommand(this.book).then((commandInfo)=>{
            this.bag = commandInfo;
            return ActionState.IN_PROGRESS;
        }).catch((err)=>{
            this.result = err;
            return ActionState.ERROR
        })

    }
}
```


Step 5: write the watcher method
The watcher method can be called multiple times while the action is in IN_PROGRESS state.
To set the frequency of the call, see : 


```typescript
import {Action} from '@orbits/core'
import {LibraryApi, Book} from './my-library'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'

    IArgument : {
        bookName : string
    }

    IBag : {
        commandId : number
    }

    IResult : {
        deliverytime : number
    }

    book : Book

    init(){
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book)=>{
            this.book = book;
        })
    }

    main(){
        const libraryApi = new LibraryApi();
        return libraryApi.createCommand(this.book).then((commandInfo)=>{
            this.bag = commandInfo;
            return ActionState.IN_PROGRESS;
        }).catch((err)=>{
            this.result = err;
            return ActionState.ERROR
        })

    }

    watcher(){
       const libraryApi = new LibraryApi();
        return libraryApi.getCommandState(this.bag.commandId).then((commandState)=>{
            if(commandState === 0){
                return ActionState.IN_PROGRESS
            }
            else if(commandState === -1){
                return ActionState.ERROR
            }
            else if(commandState === 1){
                return ActionState.SUCCESS
            }
        })
    }
}
```

Step 5: 
What happens in case that the createCommand worked but, because of a failure, the commandId was not stored in our action database ?
You should write a specific case for this in the watcher.
Depending on the api consumes, there is two stategies.
Sometimes the api allows you to set an id on the resource you created. In this case, you already have the id and just need to retrieve it.
Example would be :
 ```typescript
    //set the id
    const libraryApi = new LibraryApi();
    libraryApi.createCommand(this.argument.bookName, this.argument.id || this.bag.id)

    //retrieve the command

 ```

 In most case, you have to write a custom logic. An example can be this :
```typescript
export class MyFirstAction extends Action{
    //....
    watcher(){
       const libraryApi = new LibraryApi();
       if(!this.bag.commandId){
            return libraryApi.listCommand({
                book : this.argument.bookName,
                after : this.dbDoc.createdAt,
                before : this.db.stateUpdatedAt
            }).then((commands)=>{
                if(commands.length === 0){
                    //no command was created
                    return ActionState.ERROR
                }
                else{
                    //here it depends on the logic of your service, because you can not be hundred per cent sure the command is the one you think it is whithout more market notions
                    //In general a command also have name, phoneNumber, which could allow to be sure the command is what you think
                    this.bag.commandId = commands[0].commandId;
                    return ActionState.IN_PROGRESS;
                }
            })
       }
        return libraryApi.getCommandState(this.bag.commandId).then((commandState)=>{
            if(commandState === 0){
                return ActionState.IN_PROGRESS
            }
            else if(commandState === -1){
                return ActionState.ERROR
            }
            else if(commandState === 1){
                return ActionState.SUCCESS
            }
        })
    }
}
```

Step 6
Register the action in an app (see the [app documentation](./app.md))

```typescript
export class MyFirstApp extends ActionApp{
    declare = [MyFirstAction]
}
```

# Other parameters to know about

## cronActivity

The `resume` method will be call at regular time.
The Orbits cron will call it when the current date is superior to `cronActivity.nextActivity`.
You can dinamically modify this property.
By default, each time `resume()` will be called, this date will be updated to the current time more the `cronActivity.frequency` number. You can dinamically modify this property.
By default, the `cronActivity` get its value from the `defaultCronActivity` property in the class.

## delays

Delays represents the amount of time an action can spend in a certain state.
You can set default delays via the `defaultDelays` property. It excepts an object of type
```typescript
{
    [ActionState.IN_PROGRESS] : 10*60*1000,
    [ActionState.EXECUTING_MAIN]: 30*1000
}
```


# Rolling back an action

You can rollback an action by passing :
- a `rollback` method to the class
- a `RollBackAction` to the class
See the [api documentation](./../docs/classes/Action.md) for more information.


# In depth 

See [this](./action-in-depth.md)



