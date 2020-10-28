"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getActions_1 = require("./helpers/getActions");
var react_redux_1 = require("react-redux");
var useActions = function () {
    var dispatch = react_redux_1.useDispatch();
    return getActions_1.getActions(dispatch);
};
exports.default = useActions;
//# sourceMappingURL=useActions.js.map