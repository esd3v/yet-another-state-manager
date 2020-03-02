import {createAction} from 'createAction';
import {AppState} from 'tests/typings';

export const actionWithDynamicPayload = (payload: number) =>
  createAction<AppState, 'group3', number>({
    group: 'group3',
    payload,
    changer: ({state, payload}) => ({
      subgroup3: {
        ...state.subgroup3,
        subsubgroup3: {
          value: state.subgroup3.subsubgroup3.value + payload,
        },
      },
    }),
  });
