import {createAction} from 'createAction';
import {AppState} from 'tests/typings';

export const actionWithDynamicPayload = (payload: number) =>
  createAction<AppState, 'group3', number>({
    group: 'group3',
    payload,
    changer: ({state, payload}) => ({
      subgroup: {
        subsubgroup: {
          value: state.subgroup.subsubgroup.value + payload,
        },
      },
    }),
  });
