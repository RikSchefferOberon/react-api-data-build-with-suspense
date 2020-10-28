import { State } from '../reducer';
import { EndpointParams, DataRequest } from '../types';
/**
 * Selector to manually get a {@link Request}. This value is automatically bind when using {@link withApiData}.
 * This selector can be useful for tracking request status when a request is triggered manually, like a POST after a
 * button click.
 */
export declare const getRequest: (state: State, endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => DataRequest | undefined;
