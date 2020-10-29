"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.shouldAutoTrigger = exports.shouldPerformRequest = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
var shallowequal_1 = __importDefault(require("shallowequal"));
var createBinding_1 = require("./helpers/createBinding");
var getActions_1 = require("./helpers/getActions");
var getRequest_1 = require("./selectors/getRequest");
var performRequest_1 = require("./actions/performRequest");
var getRequestKey_1 = require("./helpers/getRequestKey");
var getIsSSR_1 = require("./helpers/getIsSSR");
exports.shouldPerformRequest = function (newProps, oldProps, bindings, bindingKey) {
    var keyParamsHaveChanged = function (key) { return !shallowequal_1.default(newProps.params[key], oldProps.params[key]); };
    var getApiDataRequest = function (props, key) {
        return getRequest_1.getRequest(props.apiData, bindings[key], props.params[key]);
    };
    var hasBeenInvalidated = function (oldRequest, newRequest) {
        return !!oldRequest && oldRequest.networkStatus !== 'ready' && !!newRequest && newRequest.networkStatus === 'ready';
    };
    var apiDataChanged = newProps.apiData !== oldProps.apiData;
    return ((keyParamsHaveChanged(bindingKey) && exports.shouldAutoTrigger(newProps.apiData, bindings[bindingKey]) === true) ||
        (apiDataChanged &&
            hasBeenInvalidated(getApiDataRequest(oldProps, bindingKey), getApiDataRequest(newProps, bindingKey)) &&
            exports.shouldAutoTrigger(newProps.apiData, bindings[bindingKey]) === true) ||
        (apiDataChanged &&
            exports.shouldAutoTrigger(oldProps.apiData, bindings[bindingKey]) === false &&
            exports.shouldAutoTrigger(newProps.apiData, bindings[bindingKey]) === true));
};
exports.shouldAutoTrigger = function (apiData, endpointKey) {
    var _a, _b;
    var endpointConfig = apiData.endpointConfig[endpointKey];
    return ((_b = (_a = endpointConfig.autoTrigger) !== null && _a !== void 0 ? _a : apiData.globalConfig.autoTrigger) !== null && _b !== void 0 ? _b : (endpointConfig && endpointConfig.method === 'GET'));
};
/**
 * Binds api data to component props and automatically triggers loading of data if it hasn't been loaded yet. The wrapped
 * component will get an Binding added to each property key of the bindings param.
 * @param bindings - maps prop names to endpoint keys
 * @param [getParams] - optionally provide the params of the endpoint
 * @param configs - optionally provide configs for some endpoints that you want to override
 * @returns {Function} - Function to wrap your component
 * @example
 * withApiData({
 *    wishList: 'getWishLists',
 *    settings: 'getSettings'
 *  }, (ownProps, state) => ({
 *    wishList: {
 *      projectSlug: ownProps.match.params.projectSlug,
 *      env: ownProps.match.params.env
 *    },
 *    settings: {
 *      projectSlug: ownProps.match.params.projectSlug,
 *      env: ownProps.match.params.env
 *    }
 *  }), {
 *    settings: {
 *      autoTrigger: false
 *    }
 *  }
 * )
 */
function withApiData(bindings, getParams, configs) {
    // note: return type ComponentType<TChildProps> and ComponentClass<TChildProps> have been replaced with <any> because
    // these generics don't support the new feature of params array with array of Binding as a result
    return function (WrappedComponent) {
        var WithApiData = /** @class */ (function (_super) {
            __extends(WithApiData, _super);
            function WithApiData() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                // keep track of binding instances (each propName can have multiple bindings through getInstance)
                _this.bindingPropNameBindingsStore = {};
                return _this;
            }
            WithApiData.prototype.componentDidMount = function () {
                this.fetchDataIfNeeded();
            };
            WithApiData.prototype.componentDidUpdate = function (prevProps) {
                var _this = this;
                // automatically fetch when parameters change or re-fetch when a request gets invalidated
                Object.keys(bindings).forEach(function (bindingKey) {
                    var bindingConfig = configs === null || configs === void 0 ? void 0 : configs[bindingKey];
                    if (Array.isArray(prevProps.params[bindingKey])) {
                        var paramsArray = prevProps.params[bindingKey];
                        paramsArray.forEach(function (params, index) {
                            var _a, _b;
                            if (exports.shouldPerformRequest(__assign(__assign({}, _this.props), { params: (_a = {},
                                    _a[bindingKey] = _this.props.params[bindingKey][index],
                                    _a) }), __assign(__assign({}, prevProps), { params: (_b = {}, _b[bindingKey] = params, _b) }), bindings, bindingKey)) {
                                _this.props.dispatch(performRequest_1.performRequest(bindings[bindingKey], params, undefined, index.toString(), undefined, bindingConfig));
                            }
                        });
                    }
                    else {
                        if (exports.shouldPerformRequest(_this.props, prevProps, bindings, bindingKey)) {
                            _this.props.dispatch(performRequest_1.performRequest(bindings[bindingKey], _this.props.params[bindingKey], undefined, undefined, undefined, bindingConfig));
                        }
                    }
                });
            };
            WithApiData.prototype.getBinding = function (endpointKey, params, dispatch, propName, instanceId, apiData, config) {
                if (instanceId === void 0) { instanceId = ''; }
                if (config === void 0) { config = {}; }
                // check if we already have an instance of this bindingStore
                var propNameBindingsStore = this.bindingPropNameBindingsStore[propName];
                if (propNameBindingsStore === undefined) {
                    propNameBindingsStore = new createBinding_1.BindingsStore();
                    this.bindingPropNameBindingsStore[propName] = propNameBindingsStore;
                }
                return propNameBindingsStore.getBinding(endpointKey, params, dispatch, instanceId, apiData, undefined, config);
            };
            WithApiData.prototype.fetchDataIfNeeded = function () {
                var _this = this;
                var _a = this.props, params = _a.params, dispatch = _a.dispatch;
                Object.keys(bindings).forEach(function (propName) {
                    var endpointKey = bindings[propName];
                    var bindingConfig = configs === null || configs === void 0 ? void 0 : configs[propName];
                    if (exports.shouldAutoTrigger(_this.props.apiData, endpointKey)) {
                        // performRequest will check if fetch is needed
                        if (Array.isArray(params[propName])) {
                            var paramsArray = params[propName];
                            paramsArray.forEach(function (propNameParams, index) {
                                dispatch(performRequest_1.performRequest(endpointKey, propNameParams, undefined, index.toString(), _this.bindingPropNameBindingsStore[propName], bindingConfig));
                            });
                        }
                        else {
                            dispatch(performRequest_1.performRequest(endpointKey, params[propName], undefined, '', _this.bindingPropNameBindingsStore[propName], bindingConfig));
                        }
                    }
                });
            };
            WithApiData.prototype.render = function () {
                var _this = this;
                var _a = this.props, apiData = _a.apiData, params = _a.params, dispatch = _a.dispatch, _b = _a.isSSR, isSSR = _b === void 0 ? getIsSSR_1.getIsSSR() : _b, componentProps = __rest(_a, ["apiData", "params", "dispatch", "isSSR"]);
                if (isSSR) {
                    this.fetchDataIfNeeded();
                }
                var addProps = {};
                var responsePromises = [];
                var checkLoading = function (binding, instanceId) {
                    var _a, _b, _c, _d;
                    if (instanceId === void 0) { instanceId = ''; }
                    var enableSuspense = (_d = (_c = (_b = (_a = configs === null || configs === void 0 ? void 0 : configs[binding.request.endpointKey]) === null || _a === void 0 ? void 0 : _a.enableSuspense) !== null && _b !== void 0 ? _b : _this.props.apiData.endpointConfig[binding.request.endpointKey].enableSuspense) !== null && _c !== void 0 ? _c : _this.props.apiData.globalConfig.enableSuspense) !== null && _d !== void 0 ? _d : false;
                    if (binding.request.networkStatus === 'loading' && enableSuspense) {
                        var requestKey = getRequestKey_1.getRequestKey(binding.request.endpointKey, binding.request.params || {}, instanceId);
                        var promise = performRequest_1.getLoadingPromise(requestKey);
                        if (promise) {
                            responsePromises.push(promise);
                        }
                    }
                };
                Object.keys(bindings).forEach(function (propName) {
                    var endpointKey = bindings[propName];
                    var bindingConfig = configs === null || configs === void 0 ? void 0 : configs[propName];
                    if (Array.isArray(params[propName])) {
                        var paramsArray = params[propName];
                        addProps[propName] = paramsArray.map(function (propNameParams, index) {
                            var binding = _this.getBinding(endpointKey, propNameParams, dispatch, propName, index.toString(), apiData, bindingConfig);
                            checkLoading(binding, index.toString());
                            return binding;
                        });
                    }
                    else {
                        addProps[propName] = _this.getBinding(endpointKey, params[propName], dispatch, propName, '', apiData, bindingConfig);
                        checkLoading(addProps[propName]);
                    }
                });
                if (responsePromises.length > 0) {
                    throw Promise.all(responsePromises);
                }
                var actions = getActions_1.getActions(dispatch);
                return react_1.default.createElement(WrappedComponent, __assign({}, componentProps, addProps, { actions: actions }));
            };
            WithApiData.displayName = "WithApiData(" + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ")";
            return WithApiData;
        }(react_1.default.Component));
        hoist_non_react_statics_1.default(WithApiData, WrappedComponent); // move static methods to wrapper
        return react_redux_1.connect(function (state, ownProps) { return ({
            params: typeof getParams === 'function' ? getParams(ownProps, state) : {},
            apiData: state.apiData,
        }); })(WithApiData);
    };
}
exports.default = withApiData;
//# sourceMappingURL=withApiData.js.map