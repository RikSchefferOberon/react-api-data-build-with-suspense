import { ReactNode } from 'react';
import { Store } from 'redux';
import { State } from './reducer';
declare type RenderFn = (tree: ReactNode) => string;
declare const getDataFromTree: (tree: ReactNode, store: Store<{
    apiData: State;
}, import("redux").AnyAction>, renderFn?: RenderFn) => Promise<(import("./types").Binding<any, any> | null)[]>;
export default getDataFromTree;
