import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';
import { TYPES } from '../types';
import IUserRecord from '../records/UserRecords';
import { promises } from 'dns';
import { ObjectId } from 'mongodb';
export interface IUserController {
  add(req: Request, res: Response): Promise<void>;

  getall(req:Request,res:Response):Promise<void>;

  update(req:Request,res:Response):Promise<void>;

  delete(req:Request,res:Response):Promise<void>;
  
}

@injectable()
export class UserController implements IUserController {
  constructor( @inject(TYPES.UserRecord) private UserRecord:IUserRecord) {}

  add = async (req:any): Promise<void> => {
    try {
      // console.log("req====", req)

      const body= req.getBody();
      console.log(body);
      
      
      
      let hashedPassword=bcrypt.hashSync("body.password",10);
      let user:UserModel={
        name:body.name,
        email:body.email,
        password:hashedPassword,
        DOB:new Date(),
      }
      console.log(user);

      
      await this.UserRecord.add(user)
      return req.replyBack(200,{
        message: "User added successfully",
        data: user,
    })
    } catch (error) {
      console.log(error);
      
      return req.replyBack(500, {error: error.message});
    }
  };

  getall=async (req:any):Promise<void>=>{
    try {
      const data= await this.UserRecord.getall()
      return req.replyBack(200,{data:data})
    } catch (error) {
      return req.replyBack(500,{error:error.message})
    }
  }

  delete=async(req:any):Promise<any>=>{
    try {
      const data=await this.UserRecord.delete({email:req.getBody().email})
      return req.replyBack(200,{message:"deleted sucessfullyu"},)
    } catch (error) {
      return req.replyBack(500,{error:error.message})
    }
  }

  update=async(req:any):Promise<any>=>{
    try {
      const data=await this.UserRecord.update({_id:new ObjectId(req.getBody()._id)},req.getBody())
      return req.replyBack(200,{data:data})
    } catch (error) {
      return req.replyBack(500,{error:error.message})
    }
  }

  view=async(req:any):Promise<any>=>{
    try {
      console.log("at the controller...........",req.getParams());
      
      const data=await this.UserRecord.getById({_id:new ObjectId(req.getParams().id)})
      return req.replyBack(200,{data:data})
    } catch (error) {
      return req.replyBack(500,{error:error.message})
    }
  }
}
