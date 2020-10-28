"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
exports.fail = function (requestKey, errorBody, response) { return ({
    type: 'API_DATA_FAIL',
    payload: {
        requestKey: requestKey,
        response: response,
        errorBody: errorBody,
    },
}); };
//# sourceMappingURL=fail.js.map