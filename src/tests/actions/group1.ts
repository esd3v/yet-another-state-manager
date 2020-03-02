import {createAction} from 'createAction';
import {AppState} from 'tests/typings';

export const actionWithoutPayload =
  createAction<AppState, 'group1'>({
    group: 'group1',
    changer: ({state}) => ({
      subgroup1: {
        ...state.subgroup1,
        subsubgroup1: {
          value: state.subgroup1.subsubgroup1.value * state.subgroup1.subsubgroup1.value,
        },
      },
    }),
  });
