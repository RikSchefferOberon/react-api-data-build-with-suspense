import { Actions } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { Action, State } from '../reducer';
declare type GetActions = (dispatch: ThunkDispatch<{
    apiData: State;
}, void, Action>) => Actions;
export declare const getActions: GetActions;
export {};
