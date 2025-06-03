---
title: Application
sidebar_position: 4
---
# Application documentation

Application manages connection to your database.

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
new ActionApp({
    db: {
        mongo: {
            url: 'mongodb://localhost:27017/example'
        }
    }
})
```

In order to bootstrap an Application, you have to instanciate  an ActionApp somewhere in your app.

This is where you implement a mongo database connection and other parameters.

To wait for the end of the bootstrapping process, you can consume the `ActionApp.waitForActiveApp` promise. Then, you are ready to save your first Action !

```typescript
ActionApp.waitForActiveApp.then(()=>{
    const action = new MyAction();
    action.save();
})
```

However, we may keep in mind that if a second process run this script, a second `MyAction` will be created. It's probably not what you want.
You should use a resource here, which will correctly manage its lifecycle hooks.

```typescript
ActionApp.waitForActiveApp.then(()=>{
    const resource = new MyResource();
    resource.save();
})
```

In general:

- you will set a new Action via an external api call
- you can set a new Resource after the app has been bootstrapped

## Where to bootstrap the application

You can bootstrap the application anywhere you want in your codebase.
However, we recomend this pattern : 
- create an `orbi.ts` file at the root of your orbit application folder
- instanciante the app in `orbit.ts`
- import your `orbi.ts` file from your `index.ts`
```typescript
    import './orbi.js'
    //...
```
See [In depth](./app.md#in-depth) section for more information.


# In depth

## ActionApp and actions catalog

ActionApp has two special property

## Why do we need Applications?

Applications help to solve a major issues:
- Executors can launch Actions in different contexts. As a consequence, their inputs may be different from the default context's inputs. When a worker in a new context is set, we need to be able to rebuild the s.

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
