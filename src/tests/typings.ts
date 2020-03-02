import {defaultState} from './defaultState';
import {internalActions} from './internalActions';
import {MappedContextActions} from 'typings';

export type Actions = MappedContextActions<typeof internalActions>;
export type AppState = typeof defaultState;
