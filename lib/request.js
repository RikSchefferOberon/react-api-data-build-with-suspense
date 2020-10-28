"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __DEV__ = process.env.NODE_ENV === 'development';
/*
 * Get the headers based on request properties, adds:
 * - Content Type json if a body is set
 * - Authorization if auth token is set
 * @param requestProperties
 * @returns {{}}
 */
var getHeaders = function (requestProperties) {
    var headers = requestProperties.headers || {};
    if ('body' in requestProperties &&
        (typeof FormData !== 'undefined' ? !(requestProperties.body instanceof FormData) : true)) {
        if (headers instanceof Headers) {
            if (!headers.has('Content-Type')) {
                headers.set('Content-Type', 'application/json');
            }
        }
        else if (Array.isArray(headers)) {
            if (!headers.some(function (header) { return header[0] === 'Content-Type'; })) {
                headers.push(['Content-Type', 'application/json']);
            }
        }
        else {
            if (typeof headers['Content-Type'] === 'undefined') {
                headers['Content-Type'] = 'application/json';
            }
        }
    }
    return headers;
};
/*
 * Execute a request. Body object will be converted to JSON.
 *
 * @param url
 * @param requestProperties
 * @returns {Promise<HandledResponse>} Resolves with response, response body (json parsed, if present). Rejects with an Error if
 * connection fails.
 */
var defaultRequestHandler = function (url, requestProperties) {
    if (requestProperties === void 0) { requestProperties = {}; }
    if (__DEV__) {
        console.log('Executing request: ' + url);
    }
    requestProperties.headers = getHeaders(requestProperties);
    if (typeof requestProperties.body !== 'string' &&
        (typeof FormData !== 'undefined' ? !(requestProperties.body instanceof FormData) : true)) {
        requestProperties.body = JSON.stringify(requestProperties.body);
    }
    return new Promise(function (resolve, reject) {
        var onRequestSuccess = function (response) {
            if (__DEV__) {
                console.log("Request successful (" + response.status + "): " + url);
            }
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                // 204: no content
                resolve({
                    response: response,
                    body: {},
                });
            }
            else {
                response.json().then(function (body) {
                    return resolve({
                        response: response,
                        body: body,
                    });
                }, function (err) {
                    if (__DEV__) {
                        console.warn("Could not parse JSON response of " + url);
                    }
                    resolve({
                        response: response,
                        body: err,
                    });
                });
            }
        };
        var onRequestError = function (error) {
            if (__DEV__) {
                console.log("Request failed: " + url);
            }
            reject(error);
        };
        fetch(url, requestProperties).then(onRequestSuccess, onRequestError);
    });
};
exports.default = defaultRequestHandler;
//# sourceMappingURL=request.js.map