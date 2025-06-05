---
title: Action
sidebar_position: 1
---

# Action

Actions are the finest granular level of Orbits.
An Action represents the potential completion (or failure) of an operation.
It stores the state of an operation in a database to be able to retrieve it despite of process failures or network incidents.
Moreover, it has a lock management that guarantees the consistency of the flow.

# Concepts

See the [conceptual documentation](./action-in-depth.md) for a better understanding on how Actions work.

# Write your first Action

Actions allow you to track the state of external processes.

The following example is fictitious — real-world examples can be found in the [examples folder](./../guides/intro.md).

Let’s imagine a library system: we’ll write an Action that launches a delivery order, succeeds if the delivery completes, and fails otherwise.


- Step 1: extend the Action class

```typescript
import { Action } from '@orbits/core';

export class MyFirstAction extends Action {
    static permanentName: 'my-first-action';
}
```

The actionRef is important. When an Action document is stored in the database, the actionRef is also stored. When orbits retrieve the document from the database, it will use this property to know which constructor it should call.

As a consequence, you may not want to change the `permanentName`. Think about it as an id you give to your Action constructor - it is its only purpose.
If you don't specify any name, the name of the class will be used as default — which is more likely to change.

- Step 2: choose the format of your argument, bag and result

```typescript
import { Action } from '@orbits/core';

export class MyFirstAction extends Action {
    static permanentName: 'my-first-action';

    IArgument: {
        bookName: string;
    };

    IBag: {
        deliveryPerson: {
            name: string;
            phoneNumber: string;
        };
    };

    IResult: {
        deliveryTime: number;
    };
}
```

- Step 3: (optional) write the init method

```typescript
import { Action } from '@orbits/core';
import { LibraryApi, Book } from './my-library';

export class MyFirstAction extends Action {
    static permanentName: 'my-first-action';

    IArgument: {
        bookName: string;
    };

    IBag: {
        deliveryPerson: {
            name: string;
            phoneNumber: string;
        };
    };

    IResult: {
        deliveryTime: number;
    };

    book: Book;

    init() {
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book) => {
            this.book = book;
        });
    }
}
```

- Step 4: write the main method

The main method will be called only once during the whole lifecycle of an Action

```typescript
import { Action } from '@orbits/core';
import { LibraryApi, Book } from './my-library';

export class MyFirstAction extends Action {
    static permanentName: 'my-first-action';

    IArgument: {
        bookName: string;
    };

    IBag: {
        orderId: number;
    };

    IResult: {
        deliveryTime: number;
    };

    book: Book;

    init() {
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book) => {
            this.book = book;
        });
    }

    main() {
        const libraryApi = new LibraryApi();
        return libraryApi
            .createOrder(this.book)
            .then((orderInfo) => {
                this.bag = orderInfo;
                return ActionState.IN_PROGRESS;
            })
            .catch((err) => {
                this.result = err;
                return ActionState.ERROR;
            });
    }
}
```

- Step 5: write the watcher method

The watcher method can be called multiple times while the action is in `IN_PROGRESS` state.

To set the frequency of the call:

```typescript
import { Action } from '@orbits/core';
import { LibraryApi, Book } from './my-library';

export class MyFirstAction extends Action {
    static permanentName: 'my-first-action';

    IArgument: {
        bookName: string;
    };

    IBag: {
        orderId: number;
    };

    IResult: {
        deliveryTime: number;
    };

    book: Book;

    init() {
        const libraryApi = new LibraryApi();
        return libraryApi.getBook(this.argument.bookName).then((book) => {
            this.book = book;
        });
    }

    main() {
        const libraryApi = new LibraryApi();
        return libraryApi
            .createOrder(this.book)
            .then((orderInfo) => {
                this.bag = orderInfo;
                return ActionState.IN_PROGRESS;
            })
            .catch((err) => {
                this.result = err;
                return ActionState.ERROR;
            });
    }

    watcher() {
        const libraryApi = new LibraryApi();
        return libraryApi.getOrderState(this.bag.orderId).then((orderState) => {
            if (orderState === 0) {
                return ActionState.IN_PROGRESS;
            } else if (orderState === -1) {
                return ActionState.ERROR;
            } else if (orderState === 1) {
                return ActionState.SUCCESS;
            }
        });
    }
}
```

- Step 5:

What happens if a `createOrder` worked but, because of a failure, the orderId was not stored in our action database?
Then, your action would still be in the state `ActionState.EXECUTING_MAIN`.
After a period of time, your action will be in timeout.
You can manage this case using the `onMainTimeout` hook.

Depending on the api implementation the library would consume, there are two strategies.

Sometimes api allow you to set an id on the resource you created. In this case, you already have the id and just need to retrieve it.
So `onMainTimeout` can just call the already written watcher method.
Example would be:

```typescript
// set the id
const libraryApi = new LibraryApi();
libraryApi.createOrder(this.argument.bookName, this.argument.id || this.bag.id);

// retrieve the order
export class MyFirstAction extends Action {
    //...
    onMainTimeout(){
        return this.watcher();//just call the watcher
    }
}
```

In most cases, you have to write custom logic.

For example:

```typescript
export class MyFirstAction extends Action {
    //....

    onMainTimeout(){
        return libraryApi
                .listOrder({
                    book: this.argument.bookName,
                    after: this.dbDoc.createdAt,
                    before: this.db.stateUpdatedAt,
                })
                .then((orders) => {
                    if (orders.length === 0) {
                        // no order was created
                        return ActionState.ERROR;
                    } else {
                        // here it depends on the logic of your service,
                        // because  you cannot be 100% sure the order is the one
                        // you think it is without more market notions
                        // In general an order also has a name and phoneNumber,
                        // which would make sure the order is the right one
                        this.bag.orderId = orders[0].orderId;
                        return ActionState.IN_PROGRESS;//as it's IN_PROGRESS, watcher will be called.
                    }
                });
    }

    watcher() {
        const libraryApi = new LibraryApi();
        return libraryApi.getOrderState(this.bag.orderId).then((orderState) => {
            if (orderState === 0) {
                return ActionState.IN_PROGRESS;
            } else if (orderState === -1) {
                return ActionState.ERROR;
            } else if (orderState === 1) {
                return ActionState.SUCCESS;
            }
        });
    }
}
```

# Persistent storage

Each action has a db document assiociated with it.
The db document is accessible via the `dbDoc` property. Most properties are internal settings for the framework.

You can modify these properties (if you know what you are doing).

You can also store in these three stores:

## Argument


The `argument` property should be set via the `setArgument()` method and must not be changed after the action leaves the `ActionState.SLEEPING`state.
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

# Setting an Action to Error

You can explicitly return `ActionState.ERROR`, and optionally set an error object:
```ts
export class MyAction extends Action{
    watcher() {
        const libraryApi = new LibraryApi();
        return libraryApi.getOrderState(this.bag.orderId).then((orderState) => {
            if (orderState === 0) {
                return ActionState.IN_PROGRESS;
            } else if (orderState === -1) {
                this.setResult(orderState)
                return ActionState.ERROR;
            } else if (orderState === 1) {
                return ActionState.SUCCESS;
            }
        });
    }
}
```

However, there are cases where an error can be implicitly set:

- if an error is thrown in the `main` or in the `init` function
- if one of the delays expired (see [delays](#delays))

```ts
export class MyAction extends Action{
    main(){
        throw new Error("this is a test error");//the action will be in ActionState.ERROR and the result of the action will be the thrown error.
    }
}
```


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

# In depth

See [this](./action-in-depth.md).
