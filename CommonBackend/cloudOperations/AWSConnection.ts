import {injectable} from "tsyringe";

// @ts-ignore
import AWS from 'aws-sdk';

export interface IAWSClient {
    connect(accessKey: string, accessSecret: string, region: string): any;

    sesConnect(accessKey: string, accessSecret: string, region: string): any;
}

@injectable()
class AWSConnection implements IAWSClient {
    public s3Conn: any;
    public sesConn: any;

    connect(accessKey: string, accessSecret: string, region: string): Promise<AWSConnection> {
        return new Promise(async (resolve, reject) => {
            try {
                AWS.config.update({region: region});

                this.s3Conn = new AWS.S3({
                    accessKeyId: accessKey,
                    secretAccessKey: accessSecret
                });
                resolve(this.s3Conn)
            } catch (e) {
                reject(e);
            }
        })
    }

    sesConnect(accessKey: string, accessSecret: string, region: string): Promise<AWSConnection> {
        return new Promise(async (resolve, reject) => {
            try {
                this.sesConn = new AWS.SES({
                    accessKeyId: accessKey,
                    secretAccessKey: accessSecret,
                    region,
                })
                resolve(this.sesConn)
            } catch (e) {
                reject(e);
            }
        })
    }

    static init() {
        return new AWSConnection();
    }
}

export {AWSConnection}