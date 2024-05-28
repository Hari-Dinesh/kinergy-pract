import async from "async";
import {ObjectId} from "../database/MongoConnection"

import { closeIfOpen, serializeError } from "../Helper";
import AWSXRay from 'aws-xray-sdk';
import { resolve } from "path";
import { rejects } from "assert";
import { response } from "express";


// AWSXRay.captureAWS(require('aws-sdk'));
// AWSXRay.captureHTTPsGlobal(require('http'));
// AWSXRay.captureHTTPsGlobal(require('https'));

interface IRecord {
    add(payload: any): Promise<any>;

    getall():Promise<any>;

    update(conditions:any,dataToUpdate:any):Promise<any>;

    delete(conditions: any): Promise<any>;

    getById(conditions:any):Promise<any>;
    // edit(conditions: any, dataToUpdate: any): Promise<any>;

    // update(conditions: any, dataToUpdate: any): Promise<any>;

    // updateArray(conditions: any, dataToUpdate: any): Promise<any>;

    // updateMany(conditions: any, dataToUpdate: any): Promise<any>;

    // updateWithInc(conditions: any, dataToUpdate: any, incrementData: any);

    // incrementField(conditions: any, incrementData: any): Promise<any>;

    // bulkWrite(dataToUpdate: any): Promise<any>;

    // distinct(field: string, conditions: any): Promise<any>;

    // view(conditions: any, attributes?: any): Promise<any>;

    // viewById(id: any): Promise<any>;

    // list(conditions: any, attributes?: any, order?: any): Promise<any>;

    // latestRecord(conditions: any, order: any): Promise<any>;

    // bulkAdd(dataToAdd: any): Promise<any>;

    // aggregate(conditions: any): Promise<any>;

    // delete(conditions: any): Promise<any>;

    // deleteMany(conditions: any): Promise<any>;

    // exists(conditions: any): Promise<Boolean>;

    // paginatedList(
    //     page: number,
    //     limit: number,
    //     conditions: {},
    //     order: any,
    //     attributes: any
    // ): Promise<any>;

    // countDocuments(conditions: any): Promise<any>;
}

class MongoBaseRecord {

    public dbClient?: any;
    public collection: any;

    // bulkAdd(dataToAdd: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //          await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-bulkAdd`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('dataToAdd', dataToAdd);

    //                 await this.dbClient.collection(this.collection)
    //                     .insertMany(dataToAdd)
    //                     .then((token: any) => {
    //                         resolve(token);
    //                     })
    //                     .catch((e: any) => {
    //                         subsegment?.addError(e)
    //                         subsegment?.addMetadata('error1', serializeError(e));

    //                         reject(e);
    //                     });
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error2', serializeError(e));
    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //          });
    //     });
    // }

    // aggregate(conditions: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-aggregate`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);

    //                 const response = await this.dbClient.collection(this.collection).aggregate(conditions).toArray();

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                closeIfOpen(subsegment);
    //             }
    //         });

    //     });
       
    // }

    // distinct(field: string, conditions: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-distinct`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('field', field);
    //                 subsegment?.addMetadata('conditions', conditions);

    //                 const response = await this.dbClient.collection(this.collection).distinct(field, conditions);

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
    //     });
        
    // }

    add(payload: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
                try {

                    const response = await this.dbClient.collection(this.collection).insertOne(payload);

                    resolve(response);
                } catch (e) {

                    reject(e);
                }finally{
                    // closeIfOpen(subsegment);
                }
            })

        
        // });
        
    }
    getall():Promise<any>{
        return new Promise(async(resolve,reject)=>{
            try {
                const response = await this.dbClient.collection(this.collection).find({}).toArray()
                resolve(response)
                
            } catch (error) {
                reject(error);
            }
        })
    }

    getById(conditions:any):Promise<any>{
        return new Promise(async(resolve,rejects)=>{
            try {
                
                const data=await this.dbClient.collection(this.collection).findOne(conditions)
                resolve(data)
            } catch (error) {
                rejects(error)
            }
        })
    }
    update(conditions:any,dataToUpdate:any):Promise<any>{
        return new Promise(async(resolve,rejects)=>{
        try {
            delete dataToUpdate._id
            delete dataToUpdate.password
            const response=await this.dbClient.collection(this.collection).updateOne(
                conditions,
                {$set:dataToUpdate}
            )
            
            resolve(response)
          
        } catch (error) {
            rejects(error)
        }
    })
    }

     delete(payload:any):Promise<any>{
        return new Promise(async(resolve,rejects)=>{
            try {
                let x=await this.getById(payload)
                if(!x){
                    return rejects("There is No Email")
                }
                
                const response=await this.dbClient.collection(this.collection).deleteOne(payload);
                resolve(response)
                
            } catch (error) {
                rejects(error)
            }
        })
     }
    // update(payload:any):Promise<any>{
    //     try {
    //         resolve(response)
    //     } catch (error) {
    //         reject(error)
    //     }
    // }

    // view(conditions: any, attributes: any = {}): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-view`, async (subsegment) => {
    //             try {
    //                 if(!subsegment){
    //                     console.log("base record view subsegment====>", subsegment);
    //                 }
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('attributes', attributes);

    //                 const record = await this.dbClient.collection(this.collection).findOne(conditions, {projection: attributes});
    //                 subsegment?.addMetadata('dbResponse', record);
    //                 resolve(record);
    //             } catch (e: any) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
    //     });

    
    // }
    // exists(conditions: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
            
    //         try {
                
    //             const record = await this.dbClient.collection(this.collection).findOne(conditions);
    //             // subsegment?.addMetadata('dbResponse', record);
    //             if (record) {
    //                 resolve(true);
    //             } else {
    //                 resolve(false);
    //             }
    //         } catch (err: any) {
                
    //             reject(err);
                
    //         }
            
    //     });
    // }

    // viewById(id: ObjectId): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-viewById`, async (subsegment) => {
    //             subsegment?.addMetadata('id', id);
    //             try {
    //                 const record = await this.dbClient.collection(this.collection).findOne({"_id": id});
    //                 subsegment?.addMetadata('dbResponse', record);
    //                 resolve(record);
    //             } catch (e: any) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
    //     })
    // }

    // edit(conditions: any, dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-edit`, async (subsegment) => {
    //             try {
    //                 delete dataToUpdate._id

    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('dataToUpdate', dataToUpdate);

    //                 const response = await this.dbClient.collection(this.collection).replaceOne(conditions, dataToUpdate);
    //                 subsegment?.addMetadata('dbResponse', response);

    //                 resolve(response);

    //             } catch (e: any) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    //                 reject(e);
    //             }
    //             finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
    //     });
    // }

    // update(conditions: any, dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-update`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('dataToUpdate', dataToUpdate);

    //                 const response = await this.dbClient.collection(this.collection).updateOne(conditions, {$set: dataToUpdate});

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment)
    //             }
    //         })
    //     });
    // }

    // updateMany(conditions: any, dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-updateMany`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('dataToUpdate', dataToUpdate);

    //                 const response = await this.dbClient.collection(this.collection).updateMany(conditions, {$set: dataToUpdate});

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment)
    //             }
    //         })
            
    //     });
    // }

    // updateArray(conditions: any, dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-updateArray`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('dataToUpdate', dataToUpdate);

    //                 const response = await this.dbClient.collection(this.collection).updateOne(conditions, dataToUpdate);

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                closeIfOpen(subsegment);
    //             }
    //         })
            
    //     });
    // }
    // updateManyArray(conditions: any, dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-updateManyArray`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('dataToUpdate', dataToUpdate);

    //                 const response = await this.dbClient.collection(this.collection).updateMany(conditions, dataToUpdate);

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         });
    //     });
    // }

    // updateWithInc(conditions: any, dataToUpdate: any, incrementData: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {

    //     await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-updateWithInc`, async (subsegment) => {
    //         try {
    //             subsegment?.addMetadata('conditions', conditions);
    //             subsegment?.addMetadata('dataToUpdate', dataToUpdate);
    //             subsegment?.addMetadata('incrementData', incrementData);

    //             const response = await this.dbClient.collection(this.collection).updateOne(conditions, {$set: dataToUpdate, $inc: incrementData});

    //             subsegment?.addMetadata('dbResponse', response);
    //             resolve(response);
    //         } catch (e) {
    //             subsegment?.addError(e);
    //             subsegment?.addMetadata('error', serializeError(e));

    //             reject(e);

    //         }finally{
    //             closeIfOpen(subsegment);
    //         }
    //     })
            
    //     });
    // }

    // incrementField(conditions: any, incrementData: any) {
    //     return new Promise(async (resolve, reject) => {

    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-incrementField`, async (subsegment) => {
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('incrementData', incrementData);
    
    //                 const response = await this.dbClient.collection(this.collection).updateOne(conditions, {$inc: incrementData});
    
    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);
    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    
    //                 reject(e);
    
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
                
    //         });
    // }

    // bulkWrite(dataToUpdate: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //      await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-bulkWrite`, async (subsegment) => {
    //         try {
    //             subsegment?.addMetadata('update filter and data', dataToUpdate);

    //             await this.dbClient.collection(this.collection)
    //                 .bulkWrite(dataToUpdate.map((data: any) =>
    //                     ({
    //                         updateOne: {
    //                             filter: {_id: data._id},
    //                             update: {$set: data}
    //                         }
    //                     })
    //                 )).then((data: any) => {
    //                     subsegment?.addMetadata('dbResponse', data);
    //                     resolve(data);
    //                 })
    //                 .catch((e: any) => {
    //                     subsegment?.addError(e);
    //                     subsegment?.addMetadata('error1', serializeError(e));
    //                     reject(e);
    //                 });
    //         } catch (e) {
    //             subsegment?.addError(e);
    //             subsegment?.addMetadata('error2', serializeError(e));
    //             reject(e);
    //         }finally{
    //             closeIfOpen(subsegment);
    //         }
    //      });
            
    //     });
    // }

    // delete(payload: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {

    //     await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-delete`, async (subsegment) => {
    //         try {
    //             subsegment?.addMetadata('conditions', payload);

    //             const response =  await this.dbClient.collection(this.collection).deleteOne(payload);

    //             subsegment?.addMetadata('dbResponse', response);

    //             resolve(response);
                
    //         } catch (e) {
    //             subsegment?.addError(e);
    //             subsegment?.addMetadata('error', serializeError(e));
    //             reject(e);
    //         }finally{
    //             closeIfOpen(subsegment);
    //         }
    //     })

    //     });
    // }

    // deleteMany(payload: any): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-deleteMany`, async (subsegment) => {
    //             try {

    //                 subsegment?.addMetadata('conditions', payload);

    //                 const response = await this.dbClient.collection(this.collection).deleteMany(payload)

    //                 subsegment?.addMetadata('dbResponse', response); 
    //                 resolve(response);

    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 reject(e);
    //             }
    //             finally{
    //                 closeIfOpen(subsegment);
    //             }  
    //         });
            
    //     });
    // }

    // list(conditions: any, attributes: any = {}, order: any = {}): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-list`, async (subsegment) => {
    //            if(!subsegment){
                
    //            }
            
    //             try {
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('attributes', attributes);
    //                 subsegment?.addMetadata('order', order);

    //                 let response = await this.dbClient.collection(this.collection).find(conditions, {projection: attributes}).sort(order).toArray();

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response);

    //             } catch (e) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    //                 reject(e);
                    
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         });

    //     });

       
    // }

    // latestRecord(conditions: any, order: any = {}): Promise<any> {

    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-latestRecord`, async (subsegment) => {
    //             try {
                 
    //                 subsegment?.addMetadata('conditions', conditions);
    //                 subsegment?.addMetadata('order', order);

    //                 const response = await this.dbClient.collection(this.collection).find(conditions).sort(order).limit(1).toArray();

    //                 subsegment?.addMetadata('dbResponse', response);
    //                 resolve(response); 
                
    //             } catch (e: any) {
    //                 subsegment?.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));

    //                 console.log("error in latestRecord", e)
    //                 reject("can not get all data -->" + e.message);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }   

    //         });
    //      });

        
    // }

    // paginatedList2(
    //     page: number,
    //     limit: number,
    //     conditions: {},
    //     order: any,
    //     attributes: any
    // ): Promise<any> {

    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let response_data = {
    //                 docs: [],
    //                 page: page,
    //                 limit: limit,
    //                 pages: 1,
    //                 total: 1
    //             };
    //             let async_tasks = [{
    //                 task: this.dbClient.collection(this.collection)?.countDocuments(conditions),
    //                 key: 'stats'
    //             }, {
    //                 task: this.dbClient.collection(this.collection)?.find(conditions).limit(limit).skip((page - 1) * limit).sort(order).project(attributes).toArray(),
    //                 key: 'docs'
    //             }];
    //             async.each(async_tasks, (item: any, cb: any) => {
    //                 item.task.then((data: any) => {
    //                     if (data !== undefined) {
    //                         if (item.key === 'stats') {
    //                             response_data['total'] = data;
    //                             response_data['pages'] = Math.ceil(data / limit)
    //                         } else if (item.key === 'docs') {
    //                             response_data['docs'] = data
    //                         }
    //                     }
    //                     cb();
    //                 })
    //             }, (err2: any) => {
    //                 if (err2) {
    //                     reject(err2);
    //                 }
    //                 resolve(response_data);
    //             });
    //         } catch (e: any) {
    //             reject("can not get all data -->" + e.message);
    //         }
    //     });
    // }

    // paginatedList(
    //     page: number,
    //     limit: number,
    //     conditions: {},
    //     order: any,
    //     attributes: any
    // ): Promise<any> {

    //     return new Promise(async (resolve, reject) => {

    //        await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-paginatedList`, async (subsegment) => {
    //         if(!subsegment){
    //             console.log("base record paginatedList subsegment====>", subsegment);
    //         }
    //         try {
    //             let response_data = {
    //                 docs: [],
    //                 page: page,
    //                 limit: limit,
    //                 pages: 1,
    //                 total: 1
    //             };
    //         let result = await this.dbClient.collection(this.collection).find(conditions).limit(limit).skip((page - 1) * limit).sort(order).project(attributes).toArray();
    //         if(result.length === 0){
    //             result = await this.dbClient.collection(this.collection).find(conditions).limit(limit).skip(0).sort(order).project(attributes).toArray();
    //             response_data['page'] = 1;
    //         }
    //         response_data['docs'] = result;
    //         let count = await this.dbClient.collection(this.collection).countDocuments(conditions);
    //         response_data['total'] = count;
    //         response_data['pages'] = Math.ceil(count / limit)

           
    //         subsegment?.addMetadata('dbResponse', response_data); 
    //         resolve(response_data);
            
    //         } catch (e: any) {
    //             subsegment?.addError(e);
    //             subsegment?.addMetadata('error', serializeError(e));

    //             console.log("error in paginatedList2", e)
    //             reject("can not get all data -->" + e.message);
    //         }
    //         finally{
    //             closeIfOpen(subsegment);
    //         }
    //        });
            
    //     });
    // }


    // countDocuments(conditions: any): Promise<any> {

    //     return new Promise(async (resolve, reject) => {
    //         await AWSXRay?.captureAsyncFunc(`MongoDB-${this.collection}-countDocuments`, async (subsegment) => {
    //             try {
    //                 subsegment.addMetadata("conditions", conditions);
    //                 const result = await this.dbClient.collection(this.collection).countDocuments(conditions);
    //                 subsegment.addMetadata("dbResponse", result);

    //                 resolve(result)
    //             }catch (e) {
    //                 subsegment.addError(e);
    //                 subsegment?.addMetadata('error', serializeError(e));
    //                 reject(e);
    //             }finally{
    //                 closeIfOpen(subsegment);
    //             }
    //         })
    //     })

       
    // }


}

export {
    IRecord,
    MongoBaseRecord
}
