import {useCallback, useContext, useEffect, useMemo} from 'react';
import {PersistedStateContext} from './PersistedStateProvider';

const usePersistedState = <T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void, () => void] => {
  const {clearValue, storage, updateValue} = useContext(PersistedStateContext);

  useEffect(() => {
    if (typeof key !== 'string') {
      console.error(`Key type must be "string", Can not be ${typeof key}`);
    }
  }, [key]);

  const value = useMemo<T>(() => {
    if (Object.keys(storage).includes(key)) {
      return storage[key];
    }
    return defaultValue;
  }, [storage, key, defaultValue]);

  const update = useCallback(
    (newValue: T) => updateValue(key, newValue),
    [updateValue, key],
  );

  const clear = useCallback(() => clearValue(key), [key, clearValue]);

  return [value, update, clear];
};

export default usePersistedState;
