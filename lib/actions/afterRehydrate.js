"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterRehydrate = void 0;
/**
 * Call this after you've re-hydrated the store when using redux-persist or any other method of persisting and restoring
 * the entire apiData state. This is needed to reset loading statuses.
 */
exports.afterRehydrate = function () { return ({
    type: 'API_DATA_AFTER_REHYDRATE'
}); };
//# sourceMappingURL=afterRehydrate.js.map