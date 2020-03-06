import {createAction} from 'createAction';
import {AppState} from 'tests/typings';

export const actionWithFixedPayload =
  createAction<AppState, 'group2', number>({
    group: 'group2',
    payload: 20,
    changer: ({state, payload}) => ({
      subgroup: {
        subsubgroup: {
          value: state.subgroup.subsubgroup.value + payload,
        },
      },
    }),
  });
