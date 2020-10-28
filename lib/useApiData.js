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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var createBinding_1 = require("./helpers/createBinding");
var withApiData_1 = require("./withApiData");
var shallowequal_1 = __importDefault(require("shallowequal"));
var getRequestKey_1 = require("./helpers/getRequestKey");
var performRequest_1 = require("./actions/performRequest");
var getIsSSR_1 = require("./helpers/getIsSSR");
// the hook should call perform when shouldAutoTrigger and:
// - the component gets mounted
// - the params have changed
// - the endpoint has changed
// - the call has been invalidated (networkStatus is ready)
var useApiData = function (endpointKey, params, options) {
    var _a;
    var _b = options !== null && options !== void 0 ? options : {}, instanceId = _b.instanceId, 
    // we auto detect a SSR environment. If we are on SSR, we will immediately execute the request during every render(!)
    _c = _b.isSSR, 
    // we auto detect a SSR environment. If we are on SSR, we will immediately execute the request during every render(!)
    isSSR = _c === void 0 ? getIsSSR_1.getIsSSR() : _c, config = __rest(_b, ["instanceId", "isSSR"]);
    var bindingsStore = react_1.useRef(new createBinding_1.BindingsStore());
    var prevParams = react_1.useRef();
    var prevEndpointKey = react_1.useRef();
    var apiData = react_redux_1.useSelector(function (state) { return state.apiData; });
    var autoTrigger = withApiData_1.shouldAutoTrigger(apiData, endpointKey);
    var dispatch = react_redux_1.useDispatch();
    var binding = bindingsStore.current.getBinding(endpointKey, params, dispatch, instanceId, apiData, undefined, config);
    var networkStatus = binding.request.networkStatus;
    var fetchDataIfNeeded = function () {
        if (autoTrigger &&
            ((prevParams.current && !shallowequal_1.default(prevParams.current, params)) ||
                (prevEndpointKey.current && prevEndpointKey.current !== endpointKey) ||
                networkStatus === 'ready')) {
            prevParams.current = params;
            prevEndpointKey.current = endpointKey;
            binding.perform(params, undefined);
        }
    };
    var enableSuspense = (_a = __assign(__assign(__assign({}, apiData.globalConfig), apiData.endpointConfig[binding.request.endpointKey]), (config)).enableSuspense) !== null && _a !== void 0 ? _a : false;
    if (isSSR) {
        // immediately invoke request on SSR
        fetchDataIfNeeded();
    }
    react_1.useEffect(function () {
        fetchDataIfNeeded();
    }, [autoTrigger, params, endpointKey, networkStatus]);
    if (enableSuspense && networkStatus === 'loading') {
        var requestKey = getRequestKey_1.getRequestKey(endpointKey, params || {}, instanceId);
        var promise = performRequest_1.getLoadingPromise(requestKey);
        if (promise) {
            throw promise;
        }
    }
    return binding;
};
exports.default = useApiData;
//# sourceMappingURL=useApiData.js.map