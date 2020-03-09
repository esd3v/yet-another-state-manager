import {MappedContextActions} from 'typings';
import {defaultState} from './defaultState';
import * as actions from './actions';

export type Actions = MappedContextActions<typeof actions>;
export type AppState = typeof defaultState;
