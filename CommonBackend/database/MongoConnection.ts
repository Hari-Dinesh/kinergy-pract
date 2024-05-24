import {injectable} from "tsyringe";

import {MongoClient, ObjectId} from "mongodb"
import {IDbClient} from "./IDbClient";

@injectable()
class MongoConnection implements IDbClient {

    private client: any;
    private dbName: any;
    public db: any;

    connect(connectionString: string = "", dbName: string = ""): Promise<MongoConnection> {
        return new Promise(async (resolve, reject) => {
                try {
                    MongoClient.connect(
                        connectionString,
                        (err, client) => {
                            if (client) {
                                // console.log(client);
                                
                                this.client = client;
                                this.db = client.db(dbName);
                                this.dbName = dbName;
                                resolve(this.db);
                            } else {
                                console.log("Error connecting to DB .. ")
                                reject(err)
                            }
                        });
                } catch (e) {
                    reject(e);
                }
            }
        );
    }

    static init() {
        return new MongoConnection();
    }

    getModel(tableName: string): any {
        return this.db.collection(tableName);
    }

}

export {MongoConnection, ObjectId};