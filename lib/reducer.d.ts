import { DataRequest, EndpointConfig, EndpointParams, GlobalConfig, NetworkStatus } from './types';
import { ConfigureAction } from './actions/configure';
import { SuccessAction } from './actions/success';
import { FailAction } from './actions/fail';
import { InvalidateRequestAction } from './actions/invalidateRequest';
import { AfterRehydrateAction } from './actions/afterRehydrate';
import { PurgeAllAction } from './actions/purgeAll';
import { PurgeRequestAction } from './actions/purgeRequest';
interface Entities {
    [type: string]: {
        [id: string]: any;
    };
}
export interface State {
    globalConfig: GlobalConfig;
    endpointConfig: {
        [endpointKey: string]: EndpointConfig;
    };
    requests: {
        [requestKey: string]: DataRequest;
    };
    entities: Entities;
}
export declare const defaultState: {
    globalConfig: {};
    endpointConfig: {};
    requests: {};
    entities: {};
};
export interface ClearAction {
    type: 'CLEAR_API_DATA';
}
export interface FetchAction {
    type: 'FETCH_API_DATA';
    payload: {
        requestKey: string;
        endpointKey: string;
        params?: EndpointParams;
        url: string;
    };
}
export declare type Action = ConfigureAction | FetchAction | SuccessAction | FailAction | InvalidateRequestAction | ClearAction | AfterRehydrateAction | PurgeRequestAction | PurgeAllAction;
declare const _default: (state: State | undefined, action: Action) => State;
export default _default;
export declare const addEntities: (entities: Entities, newEntities: Entities) => Entities;
export declare const recoverNetworkStatus: (networkStatus: NetworkStatus) => NetworkStatus;
export declare const recoverNetworkStatuses: (requests: {
    [requestKey: string]: DataRequest;
}) => {
    [requestKey: string]: DataRequest;
};
