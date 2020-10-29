import { ActionCreator, Dispatch } from 'redux';
import { State } from './reducer';
import { BindingsStore } from './helpers/createBinding';
import { StringifyOptions } from 'query-string';
export declare type NetworkStatus = 'ready' | 'loading' | 'failed' | 'success';
export declare type NormalizeResult = string | number | Array<string | number>;
export interface NormalizedData {
    entities: {
        [type: string]: {
            [id: string]: any;
        };
    };
    result: NormalizeResult;
}
/**
 * Map parameter names to values.
 */
export interface EndpointParams {
    [paramName: string]: string | number | string[] | number[];
}
/**
 * Information about a request made to an endpoint.
 */
export interface DataRequest {
    result?: any;
    networkStatus: NetworkStatus;
    lastCall: number;
    duration: number;
    response?: Response;
    errorBody?: any;
    endpointKey: string;
    params?: EndpointParams;
    url: string;
}
export interface GlobalConfig {
    setHeaders?: (defaultHeaders: any, state: any) => any;
    setRequestProperties?: (defaultProperties: object, state: object) => object;
    beforeSuccess?: (handledResponse: {
        response: Response;
        body: any;
    }, beforeProps: ConfigBeforeProps) => {
        response: Response;
        body: any;
    };
    afterSuccess?: (afterProps: ConfigAfterProps) => void;
    beforeFailed?: (handledResponse: {
        response: Response;
        body: any;
    }, beforeProps: ConfigBeforeProps) => {
        response: Response;
        body: any;
    };
    afterFailed?: (afterProps: ConfigAfterProps) => void;
    timeout?: number;
    autoTrigger?: boolean;
    enableSuspense?: boolean;
}
/**
 * Specification and configuration of an endpoint.
 */
export declare type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface EndpointConfig {
    url: string;
    method: Method;
    cacheDuration?: number;
    responseSchema?: any;
    queryStringOpts?: StringifyOptions;
    transformResponseBody?: (responseBody: any) => NormalizedData;
    handleErrorResponse?: (responseBody: any, params: EndpointParams, requestBody: any, dispatch: ActionCreator<any>, getState: () => {
        apiData: State;
    }, response?: Response) => boolean | void;
    beforeFailed?: (handledResponse: {
        response: Response;
        body: any;
    }, beforeProps: ConfigBeforeProps) => {
        response: Response;
        body: any;
    };
    afterFailed?: (afterProps: ConfigAfterProps) => boolean | void;
    beforeSuccess?: (handledResponse: {
        response: Response;
        body: any;
    }, beforeProps: ConfigBeforeProps) => {
        response: Response;
        body: any;
    };
    afterSuccess?: (afterProps: ConfigAfterProps) => boolean | void;
    setHeaders?: (defaultHeaders: object, state: object) => object;
    setRequestProperties?: (defaultProperties: object, state: object) => object;
    defaultParams?: {
        [paramName: string]: string | number;
    };
    timeout?: number;
    autoTrigger?: boolean;
    enableSuspense?: boolean;
}
export interface ConfigBeforeProps {
    endpointKey: string;
    request: DataRequest;
    requestBody?: any;
}
export interface ConfigAfterProps {
    endpointKey: string;
    request: DataRequest;
    requestBody?: any;
    resultData: any;
    actions: Actions;
    dispatch: Dispatch;
    getState: () => any;
}
/**
 * The value that withApiData binds to the property of your component.
 * @example
 * type Props = {
 *   users: Binding<Array<User>>
 * }
 */
export interface Binding<T, F = unknown> {
    data?: T;
    dataFailed?: F;
    loading: boolean;
    request: DataRequest;
    perform: (params?: EndpointParams, body?: any) => Promise<Binding<T, F>>;
    invalidateCache: () => void;
    purge: () => void;
    getInstance: (instanceId: string) => Binding<T, F>;
}
export interface Actions {
    perform: (endpointKey: string, params?: EndpointParams, body?: any, instanceId?: string, bindingsStore?: BindingsStore) => Promise<Binding<any, any>>;
    invalidateCache: (endpointKey: string, params?: EndpointParams, instanceId?: string) => void;
    purgeRequest: (endpointKey: string, params?: EndpointParams, instanceId?: string) => void;
    purgeAll: () => void;
}
export interface Options {
    instanceId?: string;
    isSSR?: boolean;
}
export interface HookOptions extends Partial<EndpointConfig>, Options {
}
