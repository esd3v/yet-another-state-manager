import {createAction} from 'createAction';
import {AppState} from 'tests/typings';

export const actionWithoutPayload =
  createAction<AppState, 'group1'>({
    group: 'group1',
    changer: ({state}) => ({
      subgroup: {
        subsubgroup: {
          value: state.subgroup.subsubgroup.value * state.subgroup.subsubgroup.value,
        },
      },
    }),
  });
