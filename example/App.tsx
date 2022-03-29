import {Button, Text, View} from 'react-native';
import React from 'react';
import {
  usePersistedState,
  PersistedStateProvider,
} from 'react-native-use-persisted-state';

const Counter = () => {
  const [count, setCount] = usePersistedState('@count', 0);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>count : {count}</Text>
      <Button onPress={() => setCount(count + 1)} title="increment" />
      <Button onPress={() => setCount(count - 1)} title="decrement" />
    </View>
  );
};

const App = () => {
  return (
    <PersistedStateProvider>
      <Counter />
    </PersistedStateProvider>
  );
};

export default App;
