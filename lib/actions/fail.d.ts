export interface FailAction {
    type: 'API_DATA_FAIL';
    payload: {
        requestKey: string;
        response?: Response;
        errorBody: any;
    };
}
export declare const fail: (requestKey: string, errorBody: any, response?: Response | undefined) => FailAction;
