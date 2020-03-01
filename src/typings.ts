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

export type ContextActions = {
  [key: string]: ActionWithDynamicPayload | Action | ActionWithPayload | ContextActions;
};

export type MappedContextActions<T> = {
  [key in keyof T]:
    T[key] extends Action | ActionWithPayload ? () => T[key] :
      T[key] extends ActionWithDynamicPayload ? T[key] :
        MappedContextActions<T[key]>;
};
