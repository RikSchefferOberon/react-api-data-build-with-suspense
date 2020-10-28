import { EndpointParams } from '../types';
export interface PurgeRequestAction {
    type: 'PURGE_API_DATA_REQUEST';
    payload: {
        requestKey: string;
    };
}
/**
 * Invalidates the result of a request, settings it's status back to 'ready'. Use for example after a POST, to invalidate
 * a GET list request, which might need to include the newly created entity.
 */
export declare const purgeRequest: (endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => PurgeRequestAction;
