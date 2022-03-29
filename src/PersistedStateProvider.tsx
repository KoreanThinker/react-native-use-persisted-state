import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RANDOM_KEY = '@react-native-use-persisted-state';

interface PersistedStateContextType {
  storage: Record<string, any>;
  setState: (key: string, state: any) => void;
  clearState: (key: string) => void;
}

export const PersistedStateContext = createContext<PersistedStateContextType>(
  {} as any,
);

const PersistedStateProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [storage, setStorage] = useState<Record<string, any>>({});

  useEffect(() => {
    // First init
    (async () => {
      const state = await AsyncStorage.getItem(RANDOM_KEY);
      if (state) {
        setStorage(JSON.parse(state));
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    // Storage state migrate to local storage
    AsyncStorage.setItem(RANDOM_KEY, JSON.stringify(storage));
  }, [storage]);

  const setState = useCallback((key: string, state: any) => {
    setStorage((prev) => {
      return {
        ...prev,
        [key]: state,
      };
    });
  }, []);

  const clearState = useCallback((key: string) => {
    setStorage((prev) => {
      const temp = {...prev};
      delete temp[key];
      return temp;
    });
  }, []);

  const state = useMemo<PersistedStateContextType>(
    () => ({
      storage,
      setState: setState,
      clearState: clearState,
    }),
    [storage, setState, clearState],
  );

  return (
    <PersistedStateContext.Provider value={state}>
      {loading ? null : children}
    </PersistedStateContext.Provider>
  );
};

export default PersistedStateProvider;
