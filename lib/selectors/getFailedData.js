"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFailedData = void 0;
var getApiDataRequest_1 = require("./getApiDataRequest");
/**
 * Get the result data of a failed endpoint, or undefined if the request did not fail. This value is automatically
 * bound when using {@link withApiData}.
 */
exports.getFailedData = function (apiDataState, endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    var config = apiDataState.endpointConfig[endpointKey];
    if (!config) {
        if (process.env.NODE_ENV === 'development') {
            console.warn("apiData.getResult: configuration of endpoint " + endpointKey + " not found.");
        }
        return;
    }
    var request = getApiDataRequest_1.getApiDataRequest(apiDataState, endpointKey, params, instanceId);
    if (!request) {
        return;
    }
    return request.networkStatus === 'failed'
        ? request.errorBody
        : undefined;
};
//# sourceMappingURL=getFailedData.js.map