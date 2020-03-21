import React from 'react';
import {getMergedState} from './getMergedState';
import {mapObject} from './misc';
import {
  State,
  MappedContextActions,
  Action,
  ActionWithPayload,
  ContextActions,
  ActionWithDynamicPayload,
} from './typings';

interface ContextValue {
  state: State;
  actions?: MappedContextActions<ContextActions>;
  dispatch: (action: Action | ActionWithPayload) => void;
}

export const StoreContext: React.Context<ContextValue> =
  React.createContext<ContextValue>(undefined as any);

const reducer = (state: State, action: Action | ActionWithPayload) => {
  const {payload, group, changer} = action as ActionWithPayload;
    const stateChanges = changer({
      state: state[group],
      payload,
    });
    return getMergedState({state, group, stateChanges});
}

export function Provider<S extends State, A extends ContextActions>
({defaultState, actions, children}: {
  defaultState: S;
  actions?: A,
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const mapActions = <T extends ContextActions>
    (actions: T): MappedContextActions<T> => {
      return mapObject(actions, item => {
        if (item.hasOwnProperty('changer') || item instanceof Function) {
          return (payload?: any) => dispatch(
            (item instanceof Function) ? // with dynamic payload
            (item as ActionWithDynamicPayload)(payload) :
            (item as Action) // with fixed payload
          );
        } else {
          return mapActions(item as ContextActions);
        }
      });
    };

  const value = actions ? {
    state,
    actions: mapActions(actions),
    dispatch,
  } : {state, dispatch};

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const Consumer = StoreContext.Consumer;
