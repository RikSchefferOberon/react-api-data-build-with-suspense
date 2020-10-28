import { EndpointParams, Binding, DataRequest, EndpointConfig } from '../types';
import { State, Action } from '../reducer';
import { ThunkDispatch } from 'redux-thunk';
declare type BindingInstances = {
    [requestKey in string]: (apiData: State, newRequest?: DataRequest) => Binding<any, any>;
};
export declare class BindingsStore {
    bindingInstances: BindingInstances;
    getBinding(endpointKey: string, params: EndpointParams | undefined, dispatch: ThunkDispatch<{
        apiData: State;
    }, void, Action>, instanceId: string | undefined, apiData: State, request?: DataRequest, config?: Partial<EndpointConfig>): Binding<any, any>;
}
export {};
