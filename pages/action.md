# Action documentation

Actions are the finest granular level of Orbits.
An Action represents the potential completion (or failure) of an operation.
It stores the state of an operation in a database to be able to retrieve it despite of process failures or network incidents.
Moreover, it has a lock management that guarantees the consistency of the flow.

# Concepts
See the [conceptual documentation](./action-in-depth.md) for a better understanding on how Actions work.

# Write your first Action

As stated, Actions allow you to follow the state of an external process.
The following example is fictive; you can see real world example in the [example folder](./../src/examples/).
Let's assume we have a library; let's write an Action that launches a delivery order and succeeds if the delivery go to its term, fails if not.

- Step 1: extend the Action class

```typescript
import {Action} from '@orbits/core'

export class MyFirstAction extends Action{
    static permanentName: 'my-first-action'
}
```

The actionRef is important. When an Action document is stored in the database, the actionRef is also stored. When orbits retrieve the document from the database, it will use this property to know which constructor it should call.

As a consequence, you may not want to change the `permanentName`. Think about it as an id you give to your Action - it is its only purpose.
If you don't specify any name, the name of the class will be used as default but this is more likely to change.


- Step 2: choose the format of your argument, bag and result

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
        deliveryTime : number
    }
}
```

- Step 3: (optional) write the init method

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
        deliveryTime : number
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

- Step 4: write the main method

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
        deliveryTime : number
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

- Step 5: write the watcher method

The watcher method can be called multiple times while the action is in `IN_PROGRESS` state.

To set the frequency of the call:

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
        deliveryTime : number
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

- Step 5:

What happens if a `createOrder` worked but, because of a failure, the orderId was not stored in our action database?

You should write a specific case for this in the watcher.

Depending on the api consumes, there are two strategies.

Sometimes api allow you to set an id on the resource you created. In this case, you already have the id and just need to retrieve it.

Example would be:
```typescript
// set the id
const libraryApi = new LibraryApi();
libraryApi.createOrder(this.argument.bookName, this.argument.id || this.bag.id)

// retrieve the order
```

In most cases, you have to write custom logic.

For example:
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
                    // no order was created
                    return ActionState.ERROR
                }
                else{
                    // here it depends on the logic of your service,
                    // because  you cannot be 100% sure the order is the one
                    // you think it is without more market notions
                    // In general an order also has a name and phoneNumber,
                    // which would make sure the order is the right one
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

- Step 6

Register the action in an app (see the [app documentation](./app.md))

```typescript
export class MyFirstApp extends ActionApp{
    declare = [MyFirstAction]
}
```

# Database interaction

The db document is accessible via the `dbDoc` property. Most properties are internal settings for the framework.

You can modify these properties (if you know what you are doing); it's a mongoose document.

You can also store in these three stores:

## Argument

The `argument` property should be set via the `setArgument()` method and should not be modified once the action leaves the `ActionState.SLEEPING`.
The interface of the `argument` is set via the `IArgument` property of the class.

If you want to set a default argument, you should override the `setArgument()` property.

If you want to modify an argument, you should instead see the [bag](./action.md#bag) property

## Bag

Bag is an object stored in database where you can set everything you need during the process (ids, caches...).

The interface of the `bag` is set via the `IBag` property of the class.

You can see an example of how to use it in the [write your first action](./action.md#write-your-first-action) section.

## Result

The `result` property is an object stored in database where you set the result of your action.

The interface of the `result` is set via the `IResult` property of the class.

If your Action belongs to a Workflow, the result object will then be available in the Workflow.

# Behavior on error

The best way to set an Action in `ActionState.ERROR` state, is to return that state.

However, there are cases where an error can be implicitly set:
- if an error is thrown in the `main` or in the `init` function
- if one of the delays expired (see [delays](#delays))

# Other parameters to be aware of

## cronActivity

The `resume` method will be regularly called.

The Orbits cron will call it when the current date is superior to `cronActivity.nextActivity`.

You can dynamically modify this property.

By default, each time `resume()` will be called, this date will be updated to the current time plus the `cronActivity.frequency` value. You can dynamically modify this property.

By default, the `cronActivity` get its value from the `defaultCronActivity` property in the class.

## Delays

Delays represents the amount of time an action can spend in a certain state.

You can set default delays via the `defaultDelays` property. It expects an object of type:
```typescript
{
    [ActionState.IN_PROGRESS] : 10*60*1000,
    [ActionState.EXECUTING_MAIN]: 30*1000
}
```

# Rolling back an Action

You can rollback an Action by passing:
- a `rollback` method to the class
- a `RollBackAction` to the class
See the [api documentation](./../docs/classes/Action.md) for further information.

# In depth

See [this](./action-in-depth.md).
