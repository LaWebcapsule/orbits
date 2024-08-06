import { wbceAsyncStorage } from "@wbce/services";
import * as winston from "winston";
import type { ActionApp } from "./action-app";

const expendError = (obj : any)=>{
    if(obj instanceof Error){
      return {
        ...obj,
        code : (obj as any).code,
        message : obj.message,
        stack : obj.stack
      }
    }
    else if(obj instanceof Object){
      const result : any = {}
      for(const x in obj){
        result[x] = expendError(obj[x])
      }
      return result
    }
    return obj;
}

const filterError = winston.format((info : any)=>{
  const result = expendError(info);
  return result
});

  
  
const addLogZoneInfo = winston.format((info : any)=>{
    const otherInfo = wbceAsyncStorage.getStore()?.logInfo;
    return {
        ...otherInfo,
        ...info
    }
})

export const defaultLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format : winston.format.combine(
        addLogZoneInfo(),
        filterError(),
        winston.format.json()
      )
    })
  ]
})


export function setLogger(app : ActionApp){
    app.logger.format = winston.format.combine(
        addLogZoneInfo(),
        app.logger.format
    )
}