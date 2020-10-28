import { State } from '../reducer';
import { EndpointParams } from '../types';
/**
 * Get the de-normalized result data of an endpoint, or undefined if not (yet) available. This value is automatically
 * bound when using {@link withApiData}.
 */
export declare const getResultData: (state: State, endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => any | any[] | void;
