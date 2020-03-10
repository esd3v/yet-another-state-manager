import {ChangerWithPayload, ActionWithPayload, Action, Changer} from './typings';

export function createAction<S, G extends keyof S, P>({group, payload, changer}: {
  group: G;
  payload: P;
  changer: ChangerWithPayload<S, G, P>;
}): ActionWithPayload;

export function createAction<S, G extends keyof S>({group, changer}: {
  group: G;
  changer: Changer<S, G>;
}): Action;

export function createAction<S, G extends keyof S, P>({group, payload, changer}: {
  group: G;
  payload?: P;
  changer: Changer<S, G> | ChangerWithPayload<S, G, P>;
}) {
  return (payload === undefined) ? {group, changer} : {group, payload, changer};
}
