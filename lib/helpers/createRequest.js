"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// factory function for creating an initial or fallback request
exports.default = (function (endpointKey) { return ({
    networkStatus: 'ready',
    lastCall: 0,
    duration: 0,
    endpointKey: endpointKey,
    url: '',
}); });
//# sourceMappingURL=createRequest.js.map