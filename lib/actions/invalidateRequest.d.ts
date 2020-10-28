import { EndpointParams } from '../types';
export interface InvalidateRequestAction {
    type: 'INVALIDATE_API_DATA_REQUEST';
    payload: {
        requestKey: string;
    };
}
/**
 * Invalidates the result of a request, settings it's status back to 'ready'. Use for example after a POST, to invalidate
 * a GET list request, which might need to include the newly created entity.
 */
export declare const invalidateRequest: (endpointKey: string, params?: EndpointParams | undefined, instanceId?: string) => InvalidateRequestAction;
