export interface GroupState {
  [key: string]: any;
}

export interface State {
  [key: string]: GroupState;
}

export type StateChanges<S, G extends keyof S> = Partial<S[G]>;

export type Changer<S, G extends keyof S> = (params: {state: S[G]}) => StateChanges<S, G>;

export type ChangerWithPayload<S, G extends keyof S, P> = (params: {
  state: S[G];
  payload: P;
}) => StateChanges<S, G>;

export interface Action {
  group: string;
  changer: Changer<State, any>;
}

export interface ActionWithPayload {
  group: string;
  payload: any;
  changer: ChangerWithPayload<State, any, any>
}

export type ActionWithDynamicPayload = (payload: any) =>
  ActionWithPayload;
