import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express';
import { TYPES } from '../types';
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken';
import IUserRecord from '../records/UserRecords';
import { TokenModel } from "../models/Token";
import { ITokenRecord } from "../records/TokenRecord";
import { ObjectId } from "mongodb";
export interface userAuth{

    logout(req: Request, res: Response): Promise<void>;

    checkLogin(req: Request, res: Response): Promise<void>;

    login(req:Request,res:Response):Promise<void>;
}

const JWT_SECRET_CODE="xyzxyz"

@injectable()
export class AuthController implements userAuth{
    constructor(
        @inject(TYPES.UserRecord) private UserRecord:IUserRecord,
        @inject(TYPES.TokenRecord) private TokenRecord:ITokenRecord,
        @inject(TYPES.extendedValidator) private readonly validator?: any
        
    ){}
    
    login=async (req: any): Promise<void>=> {
        try {
            const body= req.getBody()
            let rules={
                "email": "required|email",
                "password": "min:3|max:20|required",
            }
            let validation=new this.validator(body,rules,{})
            validation.fails(()=>{
                return req.replyBack(400, {errors: validation.errors.errors});
            })
            validation.passes(async()=>{
                const data=await this.UserRecord.getById({email:body.email})
                console.log(data,"lod data")
                if(!data){
                    return req.replyBack(400, {error: "invalid email id or the email does not exist"});
                }
                console.log(body.password,"password from body");
                

                const passwordMatch =  bcrypt.compareSync( body.password , data.password);
                console.log(passwordMatch)
                if(!passwordMatch){
                    return req.replyBack(400, {error: "password does not match"});
                }
                delete data.password;
                
                let JWT_SECRET=JWT_SECRET_CODE;
                let token = jsonwebtoken.sign(data, JWT_SECRET, {
                    expiresIn: "2 days"
                });
                
                let generatedToken:TokenModel={
                    userId:data._id,
                    token:token
                }
                await this.TokenRecord.add(generatedToken)

                return req.replyBack(200,{
                    message: "User Logged In successfully",
                    data: generatedToken
                })
               

                

            })

        } catch (error) {
            return req.replyBack(500, {error: error.message});
        }
    }

    logout=async(req:any):Promise<void>=>{
        try {
            let tokenHeader=req.getHeaders().authorization
            if(!tokenHeader){
                return req.replyBack(400,{message:"User Already LoggedOut"})
            }

            const bearer_bits = tokenHeader.split(' ');
            
            if(bearer_bits.length<=1){
                return req.replyBack(400,{message:"invalid token"})

            }
            const barerToken=bearer_bits[1];
            if(!barerToken){
                return req.replyBack(400,{message:"Invalid Token"})
            }
            const jsonPayload = jsonwebtoken.verify(barerToken, JWT_SECRET_CODE);
            
            await this.TokenRecord?.delete({
                token:barerToken
            })
            return req.replyBack(200, { "message": "Logout successful" });


        } catch (error) {
            return req.replyBack(500, {error: error.message});
        }
    }

    checkLogin=async(req:any):Promise<void>=>{
        try {          
            const headers = req.getHeaders();
            const authHeader = headers["authorization"];

            if (!authHeader) {
                return req.replyBack(401, {
                    error: "User not logged in"
                });
            } else {
                const bearer_bits = authHeader.split(' ');
                if (bearer_bits.length <= 1) {
                    return req.replyBack(401, {
                        error: "Invalid token"
                    });
                } else {
                    let token = bearer_bits[1];
                    const jsonPayload: any = jsonwebtoken.verify(token, JWT_SECRET_CODE);
                    if (jsonPayload) {
                        let user_id = new ObjectId(jsonPayload._id)
                        const user = await this.UserRecord?.getById({ _id: user_id });
                        const tokenData = await this.TokenRecord?.getById({
                            token,
                            user_id: new ObjectId(user._id)
                        })
                        if (tokenData == null) {
                            return req.replyBack(401, { error: "User not logged in" });
                        }

                        if (user) {
                            delete user.password

                            return req.replyBack(200, { message: 'User logged in', data: { "user": user } });
                        } else {
                            return req.replyBack(401, { error: "User not logged in" });
                        }
                    } else {
                        return req.replyBack(401, { error: "Not logged in" });
                    }
                }
            }
        } catch (err: any) {
            req.replyBack(500, { error: "User not logged in" });
        }
    }

}