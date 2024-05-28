import { inject, injectable } from "tsyringe";
import { IRecord, MongoBaseRecord } from "../../CommonBackend/BaseCode";
import { TYPES } from "../types";
import { IDbClient } from "../../CommonBackend/database";

export type IUserRecord=IRecord

@injectable()
export default class UserRecord extends MongoBaseRecord implements IUserRecord{
    constructor(@inject(TYPES.DBClient) public dbClient?:IDbClient){
        super();
        this.collection="users";
    }
}