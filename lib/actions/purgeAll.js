"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeAll = void 0;
/**
 * Remove all the requests and entities but keep the configurations. This can be usefull when creating a log out feature.
 * @example
 * dispatch(purgeAll());
 */
exports.purgeAll = function () { return ({
    type: 'PURGE_ALL_API_DATA',
}); };
//# sourceMappingURL=purgeAll.js.map