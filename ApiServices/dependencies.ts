import dotenv from 'dotenv'
import {MongoConnection} from '../CommonBackend/database/MongoConnection'
import { DependencyContainer } from 'tsyringe';
import { TYPES } from './types';
import { ExtendedValidator } from '../CommonBackend/validator/MongoExtendedValidator';
import UserRecord from './records/UserRecords';
import TokenRecord from './records/TokenRecord';
dotenv.config() 
const RegisterDependencies=(container:DependencyContainer)=>{
    
    return new Promise(async(resolve,reject)=>{
        try {
         let db_url=process.env.db_url
         let dbClient=await MongoConnection.init().connect(db_url,"kinergy");
         container.register(TYPES.DBClient,{useValue:dbClient})
         container.register(TYPES.extendedValidator, {
            useValue: ExtendedValidator(dbClient),
        });
         container.register(TYPES.UserRecord,{useClass:UserRecord})
         container.register(TYPES.TokenRecord,{useClass:TokenRecord})
         resolve(container)
        } catch (error:any) {
            reject (new Error(error))
        }
    })
}
export {RegisterDependencies}