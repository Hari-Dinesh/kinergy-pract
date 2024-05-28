import { inject, injectable } from "tsyringe";
import { IRecord, MongoBaseRecord } from "../../CommonBackend/BaseCode";
import { TYPES } from "../types";
import { IDbClient } from "../../CommonBackend/database";

export type ITokenRecord=IRecord

@injectable()
export default class TokenRecord extends MongoBaseRecord implements ITokenRecord{
    constructor(@inject(TYPES.DBClient) public dbClient?:IDbClient){
        super();
        this.collection="token";
    }
}