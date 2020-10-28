"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActions = void 0;
var __1 = require("..");
var __2 = require("..");
var __3 = require("..");
var purgeRequest_1 = require("../actions/purgeRequest");
exports.getActions = function (dispatch) {
    return {
        invalidateCache: function (endpointKey, params, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch(__1.invalidateRequest(endpointKey, params, instanceId));
        },
        perform: function (endpointKey, params, body, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch(__3.performRequest(endpointKey, params, body, instanceId));
        },
        purgeRequest: function (endpointKey, params, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch(purgeRequest_1.purgeRequest(endpointKey, params, instanceId));
        },
        purgeAll: function () { return dispatch(__2.purgeAll()); }
    };
};
//# sourceMappingURL=getActions.js.map