import { State } from '../reducer';
/**
 * Selector for getting a single entity from normalized data.
 */
export declare const getEntity: (state: State, schema: any, id: string | number) => any | void;
