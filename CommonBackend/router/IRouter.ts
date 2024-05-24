export interface IRouter {
  getBody(): any;

  getFile(): any;

  getFiles(): any;

  replyBack(code: number, payload: any): any;

  getHeaders(): any;

  getParams(): any;

  getQueryArgs(): any;

  next(): any;

  getTokenInfo(): any;

  setTokenInfo(data: any): any;
}
