import { State } from '../reducer';
import { EndpointParams } from '../types';
export declare const getLoadingState: (apiDataState: State, endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => boolean;
