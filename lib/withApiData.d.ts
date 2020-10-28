import React from 'react';
import { Binding, EndpointParams, Actions, EndpointConfig } from './types';
import { ConnectedComponent } from 'react-redux';
import { Action, State } from './reducer';
import { ThunkDispatch } from 'redux-thunk';
declare type GetParams<TPropName extends string> = (ownProps: any, state: any) => {
    [paramName in TPropName]?: EndpointParams | EndpointParams[];
};
interface WithApiDataParams {
    [paramName: string]: EndpointParams | EndpointParams[];
}
export interface WithApiDataProps {
    apiData: State;
    params: WithApiDataParams;
    dispatch: ThunkDispatch<{
        apiData: State;
    }, void, Action>;
    isSSR?: boolean;
}
export declare type WithApiDataBindingProps<TPropNames extends string> = {
    [k in TPropNames]: Binding<any, any> | Array<Binding<any, any>>;
};
export interface ActionProp {
    actions: Actions;
}
export declare type WithApiDataChildProps<TPropNames extends string> = WithApiDataBindingProps<TPropNames> & ActionProp;
export declare const shouldPerformRequest: (newProps: WithApiDataProps, oldProps: WithApiDataProps, bindings: {
    [x: string]: string;
}, bindingKey: string) => boolean;
export declare const shouldAutoTrigger: (apiData: State, endpointKey: string) => boolean;
/**
 * Binds api data to component props and automatically triggers loading of data if it hasn't been loaded yet. The wrapped
 * component will get an Binding added to each property key of the bindings param.
 * @param bindings - maps prop names to endpoint keys
 * @param [getParams] - optionally provide the params of the endpoint
 * @param configs - optionally provide configs for some endpoints that you want to override
 * @returns {Function} - Function to wrap your component
 * @example
 * withApiData({
 *    wishList: 'getWishLists',
 *    settings: 'getSettings'
 *  }, (ownProps, state) => ({
 *    wishList: {
 *      projectSlug: ownProps.match.params.projectSlug,
 *      env: ownProps.match.params.env
 *    },
 *    settings: {
 *      projectSlug: ownProps.match.params.projectSlug,
 *      env: ownProps.match.params.env
 *    }
 *  }), {
 *    settings: {
 *      autoTrigger: false
 *    }
 *  }
 * )
 */
export default function withApiData<TChildProps extends WithApiDataChildProps<TPropNames>, TPropNames extends string>(bindings: {
    [propName in TPropNames]: string;
}, getParams?: GetParams<TPropNames>, configs?: {
    [propName in TPropNames]: Partial<EndpointConfig>;
}): (WrappedComponent: React.ComponentType<any>) => ConnectedComponent<React.ComponentClass<any>, WithApiDataChildProps<TPropNames>>;
export {};
