const mailcomposer = require("mailcomposer");

class AWSOperations {

    static init() {
        return new AWSOperations();
    }

    s3Upload(s3Conn, fileKey, fileContent, ext): any {

        return new Promise((resolve, reject) => {
            let params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileKey,
                Body: fileContent,
            };
            if (ext === "pdf") {
                params["ContentType"] = "application/pdf"
            } else if (ext === "jpg" || ext === "jpeg") {
                params["ContentType"] = "image/jpeg"
                params["ContentDisposition"] = 'attachment'
            } else if (ext === "png") {
                params["ContentType"] = "image/png"
                params["ContentDisposition"] = 'attachment'
            }

            s3Conn.upload(params, function (err, data) {
                if (err) {
                    console.log("Error in uploading to s3", err)
                    reject(err)
                }
                resolve(`${data.Location}`)
            })
        })

    }

    gens3URL(s3Conn, fileKey): any {
        return new Promise(async (resolve, reject) => {

            const signedUrlExpireSeconds = 60 * 15 // your expiry time in seconds.

            const url = s3Conn.getSignedUrl('getObject', {
                Bucket: process.env.BUCKET_NAME,
                Key: fileKey,
                Expires: signedUrlExpireSeconds
            })

            if (url) {
                resolve(url)
            } else {
                reject("error in generation pre-signed url")
            }

        })
    }

    s3listObjects(s3Conn, prefix): any {
        return new Promise(async (resolve, reject) => {
            s3Conn.listObjectsV2({
                Bucket: process.env.BUCKET_NAME,
                Prefix: prefix
            }, function (err: any, data: any) {
                if (err) {
                    console.log("Error in s3listObjects", err)
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

    s3Download(s3Conn, fileKey): any {
        return new Promise(async (resolve, reject) => {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileKey,
                ResponseContentDisposition: 'attachment'
            };
            const fileContent = s3Conn.getObject(params).createReadStream()
            if (fileContent) {
                resolve(fileContent)
            } else {
                reject("error in reading the file content from s3")
            }

        })
    }

    s3Delete(s3Conn, fileKey): any {
        return new Promise(async (resolve, reject) => {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileKey,
            };
            const fileContent = s3Conn.deleteObject(params, function (err, data) {
                if (err) {
                    console.log("Error in s3Delete", err)
                    reject(err)
                }
                resolve(`${data.Location}`)
            })
        })
    }

    s3MultiDelete(s3Conn, objects): any {
        return new Promise(async (resolve, reject) => {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Delete: {
                    Objects: objects,
                    Quiet: false
                }
            };
            const fileContent = s3Conn.deleteObjects(params, function (err, data) {
                if (err) {
                    console.log("Error in s3MultiDelete", err)
                    reject(err)
                }
                resolve(`${data.Location}`)
            })
        })
    }

    sendMail(sesConn, subject: string, body: string, recipient: string): any {
        return new Promise(async (resolve, reject) => {

            const params = {
                Source: "ZOELLA Team <tech@zoella.health>",
                Destination: {
                    ToAddresses: [
                        recipient,
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: body
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: subject
                    }
                },
            };

            try {
                const result = await sesConn.sendEmail(params).promise();
                resolve(result);
            } catch (error) {
                console.error("Error in sendMail", error);
                reject(error);
            }
        });
    }

    sendTextMail(sesConn, subject: string, body: string, recipient: string): any {
        return new Promise(async (resolve, reject) => {

            const params = {
                Source: "ZOELLA Team <tech@zoella.health>",
                Destination: {
                    ToAddresses: [
                        recipient,
                    ]
                },
                Message: {
                    Body: {
                        Text: {
                            Charset: "UTF-8",
                            Data: body
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: subject
                    }
                },
            };

            try {
                const result = await sesConn.sendEmail(params).promise();
                resolve(result);
            } catch (error) {
                console.error("Error in sendTextMail", error);
                reject(error);
            }
        });
    }

    sendRawEmail(sesConn, subject: string, body: string, recipient: string, attachments: Array<object>): any {
        return new Promise(async (resolve, reject) => {
            console.log("recipient ==>", recipient);
            try {
                mailcomposer({
                    to: [recipient],
                    from: "ZOELLA Team <tech@zoella.health>",
                    html: body,
                    subject,
                    attachments: attachments,
                }).build(async (err, message) => {
                    if (err) {
                        console.log("Error in mailcomposer:", err);
                        reject(err);
                        return; // Stop execution if there's an error with mailcomposer
                    }
    
                    const params = {
                        RawMessage: { Data: message },
                    };
    
                    try {
                        const result = await sesConn.sendRawEmail(params).promise();
                        resolve(result);
                    } catch (sendError) {
                        console.log("Error sending raw email:", sendError);
                        reject(sendError);
                    }
                });
            } catch (error) {
                console.log("Error in try-catch block:", error);
                reject(error);
            }
        });
    }
    
}

export {
    AWSOperations
}