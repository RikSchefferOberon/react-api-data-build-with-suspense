export interface HandledResponse {
    response: Response;
    body: any;
}
export declare type RequestHandler = (url: string, requestProperties?: RequestInit) => Promise<HandledResponse>;
declare const defaultRequestHandler: RequestHandler;
export default defaultRequestHandler;
