import {StateChanges, State} from './typings';

export const getMergedState = <S extends State, G extends keyof S>({state, group, stateChanges}: {
  state: S;
  group: G;
  stateChanges: StateChanges<S, G>;
}): S => ({
  ...state,
  [group]: {
    ...state[group],
    ...stateChanges,
  },
});
