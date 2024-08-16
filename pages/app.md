# Application documentation

Applications are here to centralize the imports of Actions.

Application is a typescript class that extends the `ActionApp` class.


# Creating an Application

See this example:

```typescript
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}
```

When creating an `ActionApp` class, you can complete two properties.
The `declare` property should be filled with the `Action` class you created.
The `imports` property should be filled with `ActionApp` whom you plan to use the declared Actions.

> An Action whom its class constructor is not declared in an `ActionApp` cannot be used. This will immediately emit an error.


# Bootstrapping an Application

```typescript
@bootstrapApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/example'
        }
    }
})
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}
```

In order to bootstrap an Application, you have to use the `bootstrapApp` decorator. This method has to be called only once by process.

This is where you implement a mongo database connection and other parameters.

To wait for the end of the bootstrapping process, you can consume the `ActionApp.waitForActiveApp` promise. Then, you are ready to save your first Action !

```typescript
@bootstrapApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/example'
        }
    }
})
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}

ActionApp.waitForActiveApp.then(()=>{
    const action = new MyAction();
    action.save();
})
```

However, we may keep in mind that if a second process run this script, a second `MyAction` will be created. It's probably not what you want.
In general:
- you will set a new Action via an external api call
- or you can do something like this
```typescript

ActionApp.waitForActiveApp.then(()=>{
    ActionApp.activeApp.ActionModel.findOne({
        filter: {
            main: true
        }
    }).then((actionDb)=>{
        if(actionDb){
            //action already exists
            const action = Action.constructFromDb(actionDb);
            action.resume();
            return;
        }
        //create main action
        const myAction = new MyAction();
        myAction.setFilter({
            main: true
        })
        myAction.save();
    })
})

```

# In depth

## Why do we need Applications?

Applications solve two major issues:
- When we get an Action document from the database, we have to know how to build an Action object. This implies to map the `permanentName` property stored in the database with a constructor. An Application keep a map of declared and imported Actions.
- Executors can launch Actions in different contexts. As a consequence, their inputs may be different from the default context's inputs. Applications keep track of both their own path and the path of the bootstrapped Application passed to an executor. This way, an executor can import the Application and its different Actions.


## Why do we use a Decorator?

We could do something like:

```typescript
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}

const myApp = new MyApp();
myApp.bootstrap.then(....)
```

Unfortunately this could lead to the Application being dynamically bootstrapped by some api call, manual user call...
Nevertheless, other process, like executor, can be launched, which should have a simple way to bootstrap the Application.
A Decorator force the Application to be bootstrapped just after the process starts.

This also explains why we extend class everywhere in the framework. We wanted a way to be sure that all objects are defined at the beginning of a process and class can't be created dynamically.

Moreover, the decorator allows us to keep track of the code path and could permit a more complex Action dependency injector.
