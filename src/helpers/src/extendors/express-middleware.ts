import { Action, ActionApp } from "@wbce/actions";
import * as express from "express"
import { ActionApi } from "./rest-skeleton";


export class ExpressRouterGenerator{

    router = express.Router()

    constructor(public mainDomain : string, public subDomain: string, public actionApi : ActionApi = new ActionApi()){
        this.registerMiddlewares()
    }

    preHook(req, res, next){
        next()
    }

    formatAction(action : Action){
        return action.dbDoc.toObject();
    }

    postHook(req, res, next, actions){
        return res.send(res.locals.actions || res.local.action || {ok : true});
    }

    registerMiddlewares(){
        this.router.use(this.preHook.bind(this));
        this.setActionMiddlewares();
        this.router.use(this.postHook.bind(this))
    }

    setActionMiddlewares(){
        this.router.get('/?', (req, res, next)=>{
            return this.actionApi.list(req.query).then((actions)=>{
                res.locals.actions = actions.map(this.formatAction.bind(this))
                next();
            })
        })

        this.router.get('/:id', (req, res, next)=>{
            const query = {
                _id : req.params.id,
                ...req.query
            }
            return this.actionApi.getOne(query).then((action)=>{
                res.locals.action = this.formatAction(action) ;
                next()
            })
        })

        this.router.get('/:id/resume', (req, res, next)=>{
            const query = {
                _id : req.params.id,
                ...req.query
            }
            return this.actionApi.resumeOne(query)
        })

        this.router.post('/:ctrName', (req, res, next)=>{
            return this.actionApi.createOne(req.params.ctrName, req.body, req.query.filter).then(action=>{
                res.locals.action = this.formatAction(action);
            })
        })
    }

    getResumeUrl(action : Action){
        return `${this.mainDomain}`
    }


}
