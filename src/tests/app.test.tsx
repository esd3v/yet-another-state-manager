import React, {FunctionComponent, useEffect, useState} from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'context';
import {useStore} from 'useStore';
import {getMergedState} from 'getMergedState';

import * as externalActions from './actions';
import {defaultState} from './defaultState';
import {AppState, Actions} from './typings';

const accessTypes = ['external','internal'] as const;
const payloadTypes = ['none', 'fixed', 'dynamic'] as const;

const Controller: FunctionComponent = () => {
  const {state, actions: internalActions, dispatch} = useStore<AppState, Actions>();
  const [newState, setNewState] = useState<AppState>();

  useEffect(() => {
    setNewState(state);
  }, [state]);

  const handleSeqClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    internalActions.group1.actionWithoutPayload();
    internalActions.group2.actionWithFixedPayload();
  };

  const handleActionClick = ({accessType, payloadType}: {
    accessType: typeof accessTypes[number];
    payloadType: typeof payloadTypes[number];
  }) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (accessType === 'external') {
      switch(payloadType) {
        case 'none': dispatch(externalActions.group1.actionWithoutPayload); break;
        case 'fixed': dispatch(externalActions.group2.actionWithFixedPayload); break;
        case 'dynamic': dispatch(externalActions.group3.actionWithDynamicPayload(10)); break;
      }
    } else if (accessType === 'internal' && internalActions) {
      switch(payloadType) {
        case 'none': internalActions.group1.actionWithoutPayload(); break;
        case 'fixed': internalActions.group2.actionWithFixedPayload(); break;
        case 'dynamic': internalActions.group3.actionWithDynamicPayload(10); break;
      }
    }
  };

  return (
    <>
      {newState && <div data-testid="newState" data-newstate={JSON.stringify(newState)}></div>}
      <button onClick={handleSeqClick}>Check sequence</button>
      {accessTypes.map((accessType =>
        payloadTypes.map(payloadType =>
          <button onClick={handleActionClick({accessType, payloadType})} key={payloadType}>
            {`${accessType}/${payloadType}`}
          </button>)))}
    </>
  );
}

const App: FunctionComponent = () => (
  <Provider
    defaultState={defaultState}
    actions={externalActions}
  >
    <Controller/>
  </Provider>
);

const getNewState = async (label: string): Promise<AppState> => {
  const {getByText, findByTestId} = render(<App/>);
  const intButton = getByText(label);

  if (intButton) {
    intButton.click();
  }

  const newStateEl = await findByTestId('newState');
  const newStateJSON = newStateEl.getAttribute('data-newstate') as string;
  const newState = JSON.parse(newStateJSON);
  return newState;
};

describe('Misc', () => {
  test('Merged state equals to default state', () => {
    const changes = {
      subgroup: {
        subsubgroup: {
          value: 2,
        },
      },
    };

    const mergedState = getMergedState({
      state: defaultState,
      group: 'group1',
      stateChanges: changes,
    });

    expect(mergedState).toEqual(defaultState);
  });

  test('Change state in sequence', async () => {
    const newState = await getNewState(`Check sequence`);
    expect(newState.group1.subgroup.subsubgroup.value).toBe(4);
    expect(newState.group2.subgroup.subsubgroup.value).toBe(22);
  });
});

describe('Change state by external action', () => {
  test('Without payload', async () => {
    const newState = await getNewState(`${accessTypes[0]}/${payloadTypes[0]}`);
    expect(newState.group1.subgroup.subsubgroup.value).toBe(4);
  });

  test('With fixed payload', async () => {
    const newState = await getNewState(`${accessTypes[0]}/${payloadTypes[1]}`);
    expect(newState.group2.subgroup.subsubgroup.value).toBe(22);
  });

  test('With dynamic payload', async () => {
    const newState = await getNewState(`${accessTypes[0]}/${payloadTypes[2]}`);
    expect(newState.group3.subgroup.subsubgroup.value).toBe(12);
  });
});

describe('Change state by internal action', () => {
  test('Without payload', async () => {
    const newState = await getNewState(`${accessTypes[1]}/${payloadTypes[0]}`);
    expect(newState.group1.subgroup.subsubgroup.value).toBe(4);
  });

  test('With fixed payload', async () => {
    const newState = await getNewState(`${accessTypes[1]}/${payloadTypes[1]}`);
    expect(newState.group2.subgroup.subsubgroup.value).toBe(22);
  });

  test('With dynamic payload', async () => {
    const newState = await getNewState(`${accessTypes[1]}/${payloadTypes[2]}`);
    expect(newState.group3.subgroup.subsubgroup.value).toBe(12);
  });
});
