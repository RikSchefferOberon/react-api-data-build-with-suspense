"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadingState = void 0;
var getApiDataRequest_1 = require("./getApiDataRequest");
exports.getLoadingState = function (apiDataState, endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    var config = apiDataState.endpointConfig[endpointKey];
    if (!config) {
        if (process.env.NODE_ENV === 'development') {
            console.warn("apiData.getResult: configuration of endpoint " + endpointKey + " not found.");
        }
        return false;
    }
    var request = getApiDataRequest_1.getApiDataRequest(apiDataState, endpointKey, params, instanceId);
    if (!request) {
        return false;
    }
    return request.networkStatus === 'loading';
};
//# sourceMappingURL=getLoadingState.js.map