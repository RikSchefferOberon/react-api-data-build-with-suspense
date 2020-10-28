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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingsStore = void 0;
var createRequest_1 = __importDefault(require("./createRequest"));
var getRequestKey_1 = require("./getRequestKey");
var getRequest_1 = require("../selectors/getRequest");
var getResultData_1 = require("../selectors/getResultData");
var performRequest_1 = require("../actions/performRequest");
var invalidateRequest_1 = require("../actions/invalidateRequest");
var getFailedData_1 = require("../selectors/getFailedData");
var getLoadingState_1 = require("../selectors/getLoadingState");
var purgeRequest_1 = require("../actions/purgeRequest");
var BindingsStore = /** @class */ (function () {
    function BindingsStore() {
        this.bindingInstances = {};
    }
    BindingsStore.prototype.getBinding = function (endpointKey, params, dispatch, instanceId, apiData, request, config) {
        if (params === void 0) { params = {}; }
        if (instanceId === void 0) { instanceId = ''; }
        var requestKey = getRequestKey_1.getRequestKey(endpointKey, params, instanceId);
        if (!this.bindingInstances[requestKey]) {
            this.bindingInstances[requestKey] = createBinding(endpointKey, params, dispatch, this, instanceId, config);
        }
        return this.bindingInstances[requestKey](apiData, request);
    };
    return BindingsStore;
}());
exports.BindingsStore = BindingsStore;
var createBinding = function (endpointKey, bindingParams, dispatch, bindingsStore, instanceId, config) {
    if (bindingParams === void 0) { bindingParams = {}; }
    if (instanceId === void 0) { instanceId = ''; }
    var params = bindingParams;
    return function (apiData, request) { return ({
        data: getResultData_1.getResultData(apiData, endpointKey, params, instanceId),
        dataFailed: getFailedData_1.getFailedData(apiData, endpointKey, params, instanceId),
        loading: getLoadingState_1.getLoadingState(apiData, endpointKey, params, instanceId),
        request: request || getRequest_1.getRequest(apiData, endpointKey, params, instanceId) || createRequest_1.default(endpointKey),
        perform: function (performParams, body) {
            params = __assign(__assign({}, bindingParams), performParams);
            return dispatch(performRequest_1.performRequest(endpointKey, params, body, instanceId, bindingsStore, config));
        },
        invalidateCache: function () { return dispatch(invalidateRequest_1.invalidateRequest(endpointKey, params, instanceId)); },
        purge: function () { return dispatch(purgeRequest_1.purgeRequest(endpointKey, params, instanceId)); },
        getInstance: function (newInstanceId) {
            return bindingsStore.getBinding(endpointKey, params, dispatch, newInstanceId, apiData);
        },
    }); };
};
//# sourceMappingURL=createBinding.js.map