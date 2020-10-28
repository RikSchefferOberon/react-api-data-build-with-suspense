"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheExpired = void 0;
exports.cacheExpired = function (endpointConfig, request) {
    return Date.now() - request.lastCall >
        (typeof endpointConfig.cacheDuration === 'number' ? endpointConfig.cacheDuration : Number.POSITIVE_INFINITY);
};
//# sourceMappingURL=cacheExpired.js.map