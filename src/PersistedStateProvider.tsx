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
  updateValue: (key: string, value: any) => void;
  clearValue: (key: string) => void;
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
      const value = await AsyncStorage.getItem(RANDOM_KEY);
      if (value) {
        setStorage(JSON.parse(value));
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    // Storage state migrate to local storage
    AsyncStorage.setItem(RANDOM_KEY, JSON.stringify(storage));
  }, [storage]);

  const updateValue = useCallback((key: string, value: any) => {
    setStorage((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const clearValue = useCallback((key: string) => {
    setStorage((prev) => {
      const temp = {...prev};
      delete temp[key];
      return temp;
    });
  }, []);

  const value = useMemo<PersistedStateContextType>(
    () => ({
      storage,
      updateValue,
      clearValue,
    }),
    [storage, updateValue, clearValue],
  );

  return (
    <PersistedStateContext.Provider value={value}>
      {loading ? null : children}
    </PersistedStateContext.Provider>
  );
};

export default PersistedStateProvider;
