import {useContext} from 'react';
import {State} from './typings';
import {StoreContext} from './context';

export function useStore<T extends State>(defaultAppState: T) {
  const {dispatch, state} = useContext(StoreContext);

  return {
    dispatch,
    state: state as typeof defaultAppState,
  };
}
