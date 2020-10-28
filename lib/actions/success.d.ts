import { EndpointConfig, NormalizedData } from '../types';
export interface SuccessAction {
    type: 'API_DATA_SUCCESS';
    payload: {
        requestKey: string;
        response: Response;
        normalizedData?: NormalizedData;
        responseBody?: any;
    };
}
export declare const success: (requestKey: string, endpointConfig: EndpointConfig, response: Response, body: any) => SuccessAction;
