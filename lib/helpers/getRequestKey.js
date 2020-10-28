"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestKey = void 0;
exports.getRequestKey = function (endpointKey, params, instanceId) {
    if (params === void 0) { params = {}; }
    if (instanceId === void 0) { instanceId = ''; }
    return endpointKey + "/" + Object.keys(params)
        .sort()
        .map(function (param) { return param + "=" + params[param]; })
        .join('&') + (instanceId !== '' ? '#' + instanceId : '');
};
//# sourceMappingURL=getRequestKey.js.map