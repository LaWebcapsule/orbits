# App documentation

App are here to centralized the imports of Action.
App are typescript class that extends the `ActionApp` class.


# Creating an app

See this example.

```typescript
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}
```

When creating an `ActionApp` class, you can complete two properties.
The `declare` property should be filled with the `Action` class you created. 
The `imports` property should be filled with `ActionApp` whom you plan to use the declared actions.

> An action whom its class constructor is not declared in an `ActionApp` cannot be used. This will immediatly emit an error.


# Bootstraping an app

```typescript 
@bootstrapApp({
    db : {
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

In order to bootstapp an app, you have to use the `bootstrapApp` decorator (see ). This method has to be call once and only once by process.
It's here that you pass a mongo database connection and other parameters (see ).

To wait for the end of bootstrapping, you can consume the `ActionApp.waitForActiveApp` promise. Then, you are ready to save your first action !

```typescript
@bootstrapApp({
    db : {
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

However, doing like this is problematic, because if a second process run this script a second `MyAction` will be created. It's probably not what you want.
In general :
- you will set a new action via an external api call
- or you can do something like this 
```typescript

ActionApp.waitForActiveApp.then(()=>{
    ActionApp.activeApp.ActionModel.findOne({
        filter : {
            main : true
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
            main : true
        })
        myAction.save();
    })
})

```






# In depth

## Why we need apps ?

The problem that apps solve is double :
- when we get an action document from the database, we have to know how to build an action object. This implies to map the `permanentName` property stored in db with a constructor. An app keep a map of declared and imported Action.
- executor can launch action in different context. In consequence, their entrypoint is not the same as the entrypoint of the default context. App keeps trace of their path and the path of the bootstrapped app is passed to an executor. Such a way it can import the app and its differents action.

## Why we use a decorator ?

We could do something like :

```typescript 
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}

const myApp = new MyApp();
myApp.bootstrap.then(....)
```
The problem is that this could lead to the app being dynamically bootstrapped on some api call, manual user call... 
Nevertheless, other process, like executor, can be launched, which should have a simple way to bootstrap the app.
A decorator force the app to be bootstrapped just after the process start. 
This also explain why we extends class everywhere in the framework. We wanted a way to be sure that all objects are defined at the beginning of a process and class can't be created dynamically.
Moreover, the decorator allows us to keep trace of the code path and could permit a more complex Action dependency injector.