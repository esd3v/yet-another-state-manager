import React, {createContext, useState, Context} from 'react';
import {Action, ActionWithPayload, State} from './typings';
import {getMergedState} from './getMergedState';

interface ContextValue {
  state: State;
  dispatch: (action: Action | ActionWithPayload) => void;
}

export const StoreContext: Context<ContextValue> = createContext<ContextValue>(undefined as any);

export function Provider<S extends State>({defaultState, children}: {
  defaultState: S;
  children: React.ReactNode;
}) {
  const [state, setState] = useState(defaultState);

  const dispatch = (action: Action | ActionWithPayload) => {
    const {payload, group, changer} = action as ActionWithPayload;
    const stateChanges = changer({
      state: state[group],
      payload,
    });
    const mergedState = getMergedState({state, group, stateChanges});
    setState(mergedState);
  };

  return (
    <StoreContext.Provider value={{
      state,
      dispatch,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const Consumer = StoreContext.Consumer;
