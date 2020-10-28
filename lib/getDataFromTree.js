"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDataFromTree = function (tree, store, renderFn) {
    if (renderFn === void 0) { renderFn = require('react-dom/server').renderToStaticMarkup; }
    renderFn(tree);
    var apiData = store.getState().apiData;
    return Promise.all(Object.values(apiData.requests).map(function (request) { return request.promise; }));
};
exports.default = getDataFromTree;
//# sourceMappingURL=getDataFromTree.js.map