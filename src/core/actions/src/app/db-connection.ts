import mongoose from "mongoose"
import { actionSchema, ActionSchemaInterface } from "../models/action";
import type { ActionApp } from "./action-app";


export interface AppDb{
    mongo : {
        url? : string,
        conn? : mongoose.Connection
    }
}

export function setDbConnection(app : ActionApp){
    return mongoose.createConnection(app.db.mongo.url!).asPromise().then((conn)=>{
        app.db.mongo.conn = conn;
        app.ActionModel = conn.model<ActionSchemaInterface>('Action', actionSchema)
    })
}