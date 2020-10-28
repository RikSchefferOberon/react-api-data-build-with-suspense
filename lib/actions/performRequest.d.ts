import { State } from '../reducer';
import { Binding, EndpointConfig, GlobalConfig, EndpointParams } from '../types';
import { BindingsStore } from '../helpers/createBinding';
import { RequestHandler } from '../request';
import { Dispatch } from 'redux';
export declare const getRequestProperties: (endpointConfig: EndpointConfig, globalConfig: GlobalConfig, state: any, body?: any) => any;
declare type PerformRequest = (endpointKey: string, inputParams?: EndpointParams, body?: any, instanceId?: string, bindingsStore?: BindingsStore, customConfig?: Partial<EndpointConfig>) => (dispatch: Dispatch, getState: () => {
    apiData: State;
}) => Promise<Binding<any, any>>;
export declare const getLoadingPromise: (requestKey: string) => Promise<Binding<any, any>> | null;
/**
 * Manually trigger an request to an endpoint. Prefer to use {@link withApiData} instead of using this function directly.
 * This is an action creator, so make sure to dispatch the return value.
 */
export declare const performRequest: PerformRequest;
/**
 * Use your own request function that calls the api and reads the responseBody response. Make sure it implements the
 * {@link RequestHandler} interface.
 * @param requestHandler
 */
export declare const setRequestHandler: (requestHandler: RequestHandler) => void;
export {};
