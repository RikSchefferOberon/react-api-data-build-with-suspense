"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeRequest = void 0;
var getRequestKey_1 = require("../helpers/getRequestKey");
/**
 * Invalidates the result of a request, settings it's status back to 'ready'. Use for example after a POST, to invalidate
 * a GET list request, which might need to include the newly created entity.
 */
exports.purgeRequest = function (endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    return ({
        type: 'PURGE_API_DATA_REQUEST',
        payload: {
            requestKey: getRequestKey_1.getRequestKey(endpointKey, params, instanceId),
        },
    });
};
//# sourceMappingURL=purgeRequest.js.map