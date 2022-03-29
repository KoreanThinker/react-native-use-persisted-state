import {useCallback, useContext, useEffect, useMemo} from 'react';
import {PersistedStateContext} from './PersistedStateProvider';

function usePersistedState<T = undefined>(
  key: string,
): [T | undefined, (newState: T | undefined) => void, () => void];
function usePersistedState<T>(
  key: string,
  initialState: T,
): [T, (newState: T) => void, () => void];
function usePersistedState<T>(
  key: string,
  initialState?: T,
): [T, (newState: T) => void, () => void] {
  const {
    clearState: _clearState,
    storage,
    setState: _setState,
  } = useContext(PersistedStateContext);

  useEffect(() => {
    if (typeof key !== 'string') {
      console.error(`Key type must be "string", Can not be ${typeof key}`);
    }
  }, [key]);

  const state = useMemo<T>(() => {
    if (Object.keys(storage).includes(key)) {
      return storage[key];
    }
    return initialState;
  }, [storage, key, initialState]);

  const setState = useCallback(
    (newState) => _setState(key, newState),
    [_setState, key],
  );

  const clearState = useCallback(() => _clearState(key), [key, _clearState]);

  return [state, setState, clearState];
}

export default usePersistedState;
