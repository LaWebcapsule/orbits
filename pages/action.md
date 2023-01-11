# Action documentation

Actions are the finest granular level of Orbits.  
An Action represents the potential completion (or failure) of an operation.
It stores the state of an operation in a database to be able to retrieve it despite of process failures or network incidents.
Moreover, it has a lock management that guarantees the consistency of the flow.

# Concepts
See the [conceptual documentation](./action-in-depth.md) for a better understanding on how Actions work.

# Write your first Action
As stated, Action allows you to follow the state of an external process.
The following example is fictive ; you can see real world example in the [example folder](./../src/examples/).
We assume we have a library ; let's write an Action that launches a delivery order and succeeds if the delivery go to its term, fails if not. 


Step 1 : extends the Action class

```typescript
import {Action} from '@orbits/core'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'
}
```
The actionRef is important. When an Action document is stored in the database, the actionRef is also stored. When orbits retrieve the document from the database, it will use this property to know which constructor it should call.
As a consequence, you may not want to modifiy the permanentName. Think about it as an id you give to your Action - it is its only purpose. 
If you don't specify any name, the name of the class will be use as default but this is more likely to change.


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
The main method will be called only once during the whole lifecycle of an Action

```typescript
import {Action} from '@orbits/core'
import {LibraryApi, Book} from './my-library'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'

    IArgument : {
        bookName : string
    }

    IBag : {
        orderId : number
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
        return libraryApi.createOrder(this.book).then((orderInfo)=>{
            this.bag = orderInfo;
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
        orderId : number
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
        return libraryApi.createOrder(this.book).then((orderInfo)=>{
            this.bag = orderInfo;
            return ActionState.IN_PROGRESS;
        }).catch((err)=>{
            this.result = err;
            return ActionState.ERROR
        })

    }

    watcher(){
       const libraryApi = new LibraryApi();
        return libraryApi.getOrderState(this.bag.orderId).then((orderState)=>{
            if(orderState === 0){
                return ActionState.IN_PROGRESS
            }
            else if(orderState === -1){
                return ActionState.ERROR
            }
            else if(orderState === 1){
                return ActionState.SUCCESS
            }
        })
    }
}
```

Step 5: 
What happens if a createOrder worked but, because of a failure, the orderId was not stored in our action database ?
You should write a specific case for this in the watcher.
Depending on the api consumes, there are two stategies.
Sometimes api allows you to set an id on the resource you created. In this case, you already have the id and just need to retrieve it.
Example would be :
 ```typescript
    //set the id
    const libraryApi = new LibraryApi();
    libraryApi.createOrder(this.argument.bookName, this.argument.id || this.bag.id)

    //retrieve the order

 ```

 In most case, you have to write a custom logic. As an example :
```typescript
export class MyFirstAction extends Action{
    //....
    watcher(){
       const libraryApi = new LibraryApi();
       if(!this.bag.orderId){
            return libraryApi.listOrder({
                book : this.argument.bookName,
                after : this.dbDoc.createdAt,
                before : this.db.stateUpdatedAt
            }).then((orders)=>{
                if(orders.length === 0){
                    //no order was created
                    return ActionState.ERROR
                }
                else{
                    //here it depends on the logic of your service, because you can not be hundred per cent sure the order is the one you think it is whithout more market notions
                    //In general a order also have name, phoneNumber, which could allow to be sure the order is what you think
                    this.bag.orderId = orders[0].orderId;
                    return ActionState.IN_PROGRESS;
                }
            })
       }
        return libraryApi.getOrderState(this.bag.orderId).then((orderState)=>{
            if(orderState === 0){
                return ActionState.IN_PROGRESS
            }
            else if(orderState === -1){
                return ActionState.ERROR
            }
            else if(orderState === 1){
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

# Other parameters to be aware of

## cronActivity

The `resume` method will be regularly called.
The Orbits cron will call it when the current date is superior to `cronActivity.nextActivity`.
You can dynamically modify this property.
By default, each time `resume()` will be called, this date will be updated to the current time plus the `cronActivity.frequency` value. You can dynamically modify this property.
By default, the `cronActivity` get its value from the `defaultCronActivity` property in the class.

## delays

Delays represents the amount of time an action can spend in a certain state.
You can set default delays via the `defaultDelays` property. It expects an object of type
```typescript
{
    [ActionState.IN_PROGRESS] : 10*60*1000,
    [ActionState.EXECUTING_MAIN]: 30*1000
}
```


# Rolling back an Action

You can rollback an Action by passing :
- a `rollback` method to the class
- a `RollBackAction` to the class
See the [api documentation](./../docs/classes/Action.md) for further information.


# In depth 

See [this](./action-in-depth.md)



