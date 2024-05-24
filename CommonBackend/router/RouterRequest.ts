import {injectable} from "tsyringe";
import express from "express";
import {IRouter} from "./IRouter";
import {CleanResponse} from "../Helper";

@injectable()
class ExpressRouterRequest implements IRouter {
    [x: string]: any;
    public request: express.Request | undefined;
    public response: express.Response | undefined;
    public queues: {};
  
    getBody(): any {
        let bodyData = this.request?.body;
        let params = this.request?.params;
        let args = this.request?.query;
        return {...bodyData, ...params, ...args};
    }

    getFile(): any {
        // @ts-ignore
        return this.request?.file;
    }

    getFiles(): any {
        // @ts-ignore
        return this.request?.files;
    }

    replyBack(code: number, payload: any): any {
        let response = {
            message: "",
            data: "",
            error: "",
            errors: "",
            success: "",
            ...payload,
        };
        response = CleanResponse(response);
        response["success"] = code < 400;
        this.response?.status(code).send(response);
    }

    getHeaders(): any {
        return this.request?.headers;
    }

    getParams(): any {
        return this.request?.params;
    }

    getQueryArgs(): any {
        return this.request?.query;
    }

    next(): any {
        return this.request?.next();
    }

    getTokenInfo(): any {
        // @ts-ignore
        return this.request?.decoded;
    }

    setTokenInfo(token: any): any {
        // @ts-ignore
        return this.request?.decoded = token
    }

}

const wrapExpressRequest = (handler: any,) => {
    return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const expressRequest = new ExpressRouterRequest();
        expressRequest.request = req;
        expressRequest.response = res;

        // expressRequest.segment = awsXRaySegment;

        handler(expressRequest);
    };
};

export {ExpressRouterRequest, wrapExpressRequest};
