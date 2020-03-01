import {useContext} from 'react';
import {StoreContext} from './context';
import {State, MappedContextActions, ContextActions} from 'typings';

export function useStore<T extends State, A extends MappedContextActions<ContextActions>>() {
  const {state, actions, dispatch} = useContext(StoreContext);

  return {
    state: state as T,
    actions: actions as A,
    dispatch,
  };
}
