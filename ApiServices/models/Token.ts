import { ObjectId } from "mongodb";

export interface TokenModel{
    userId:ObjectId,
    token:string
}