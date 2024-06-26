import "reflect-metadata"
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { container } from 'tsyringe'
import {UserController as _UserController} from './controllers/UserController'
import { RegisterDependencies } from "./dependencies"
import { wrapExpressRequest } from "./router"
dotenv.config()
const app=express()
app.use(express.json())
try {
    RegisterDependencies(container).then(()=>{

        const UserController=container.resolve(_UserController);
        app.post('/', wrapExpressRequest(UserController.add))
        app.get('/',wrapExpressRequest(UserController.getall))
        app.put('/',wrapExpressRequest(UserController.update))
        app.delete('/',wrapExpressRequest(UserController.delete))
        app.get('/:id',wrapExpressRequest(UserController.view))
        app.listen(3000,()=>{
            console.log('running on port 3000')
        })
    }).catch((e)=>{
        console.log(e)
    })
    
} catch (error) {
    
}

   