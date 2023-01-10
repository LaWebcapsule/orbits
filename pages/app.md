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

## Why we need Applications ?

Applications solve two major issues :
- When we get an Action document from the database, we have to know how to build an Action object. This implies to map the `permanentName` property stored in the database with a constructor. An Application keep a map of declared and imported Action.
- Executors can launch Actions in different context. As a consequence, their inputs may be different from the default context's inputs. Application keeps track of both their own path and the path of the bootstrapped Application passed to an executor. This way, an executor can import the Application and its different Action.

## Why we use a Decorator ?

We could do something like :

```typescript 
export class MyApp extends ActionApp{
    declare = [MyAction],
    imports = [AnotherApp]
}

const myApp = new MyApp();
myApp.bootstrap.then(....)
```
Unfortunatly this could lead to the Application being dynamically bootstrapped by some api call, manual user call... 
Nevertheless, other process, like executor, can be launched, which should have a simple way to bootstrap the Application.
A Decorator force the Application to be bootstrapped just after the process starts. 
This also explains why we extend class everywhere in the framework. We wanted a way to be sure that all objects are defined at the beginning of a process and class can't be created dynamically.
Moreover, the decorator allows us to keep trace of the code path and could permit a more complex Action dependency injector.
