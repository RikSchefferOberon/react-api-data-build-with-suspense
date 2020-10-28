import { State } from '../reducer';
import { EndpointParams } from '../types';
/**
 * Get the result data of a failed endpoint, or undefined if the request did not fail. This value is automatically
 * bound when using {@link withApiData}.
 */
export declare const getFailedData: (apiDataState: State, endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => any | any[] | void;
