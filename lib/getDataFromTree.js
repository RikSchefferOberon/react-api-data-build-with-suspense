"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var performRequest_1 = require("./actions/performRequest");
var getDataFromTree = function (tree, store, renderFn) {
    if (renderFn === void 0) { renderFn = require('react-dom/server').renderToStaticMarkup; }
    renderFn(tree);
    var apiData = store.getState().apiData;
    return Promise.all(Object.keys(apiData.requests).map(function (requestKey) {
        var promise = performRequest_1.getLoadingPromise(requestKey);
        return promise;
    }));
};
exports.default = getDataFromTree;
//# sourceMappingURL=getDataFromTree.js.map