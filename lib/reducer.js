"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverNetworkStatuses = exports.recoverNetworkStatus = exports.addEntities = exports.defaultState = void 0;
exports.defaultState = {
    globalConfig: {},
    endpointConfig: {},
    requests: {},
    entities: {},
};
// reducer
exports.default = (function (state, action) {
    var _a, _b, _c, _d;
    if (state === void 0) { state = exports.defaultState; }
    switch (action.type) {
        case 'CONFIGURE_API_DATA':
            return __assign(__assign({}, state), action.payload);
        case 'FETCH_API_DATA':
            return __assign(__assign({}, state), { requests: __assign(__assign({}, state.requests), (_a = {}, _a[action.payload.requestKey] = __assign(__assign({}, state.requests[action.payload.requestKey]), { networkStatus: 'loading', lastCall: Date.now(), duration: 0, endpointKey: action.payload.endpointKey, params: action.payload.params, url: action.payload.url }), _a)) });
        case 'API_DATA_SUCCESS': {
            var request = state.requests[action.payload.requestKey];
            if (!request) {
                // for security reasons reject the response if the request has been removed since the call was initiated.
                // this might be due to a logout between start and end of call
                return state;
            }
            return __assign(__assign({}, state), { requests: __assign(__assign({}, state.requests), (_b = {}, _b[action.payload.requestKey] = __assign(__assign({}, request), { networkStatus: 'success', duration: Date.now() - request.lastCall, result: action.payload.normalizedData
                        ? action.payload.normalizedData.result
                        : action.payload.responseBody, response: action.payload.response, errorBody: undefined }), _b)), entities: __assign({}, (action.payload.normalizedData
                    ? exports.addEntities(state.entities, action.payload.normalizedData.entities)
                    : state.entities)) });
        }
        case 'API_DATA_FAIL': {
            var request = state.requests[action.payload.requestKey];
            if (!request) {
                return state;
            }
            return __assign(__assign({}, state), { requests: __assign(__assign({}, state.requests), (_c = {}, _c[action.payload.requestKey] = __assign(__assign({}, request), { networkStatus: 'failed', duration: Date.now() - request.lastCall, response: action.payload.response, errorBody: action.payload.errorBody, result: undefined }), _c)) });
        }
        case 'INVALIDATE_API_DATA_REQUEST': {
            var request = state.requests[action.payload.requestKey];
            return request
                ? __assign(__assign({}, state), { requests: __assign(__assign({}, state.requests), (_d = {}, _d[action.payload.requestKey] = __assign(__assign({}, request), { networkStatus: 'ready' }), _d)) }) : state;
        }
        case 'PURGE_API_DATA_REQUEST': {
            var requests = __assign({}, state.requests);
            delete requests[action.payload.requestKey];
            return requests
                ? __assign(__assign({}, state), { requests: requests }) : state;
        }
        case 'CLEAR_API_DATA': {
            return exports.defaultState;
        }
        case 'PURGE_ALL_API_DATA': {
            return __assign(__assign({}, exports.defaultState), { endpointConfig: state.endpointConfig, globalConfig: state.globalConfig });
        }
        case 'API_DATA_AFTER_REHYDRATE':
            return __assign(__assign({}, state), { requests: exports.recoverNetworkStatuses(state.requests) });
        default:
            return state;
    }
});
// merges newEntities into entities
exports.addEntities = function (entities, newEntities) {
    return Object.keys(newEntities).reduce(function (result, entityType) {
        var _a;
        return (__assign(__assign({}, result), (_a = {}, _a[entityType] = __assign(__assign({}, (entities[entityType] || {})), newEntities[entityType]), _a)));
    }, __assign({}, entities));
};
// resets a networkStatus to ready if it was loading. Use when recovering state from storage to prevent loading states
// when no calls are running.
exports.recoverNetworkStatus = function (networkStatus) {
    return networkStatus === 'loading' ? 'ready' : networkStatus;
};
exports.recoverNetworkStatuses = function (requests) { return (__assign({}, Object.keys(requests).reduce(function (result, key) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[key] = __assign(__assign({}, requests[key]), { networkStatus: exports.recoverNetworkStatus(requests[key].networkStatus) }), _a)));
}, {}))); };
//# sourceMappingURL=reducer.js.map