# React Native Use Persisted State

[![npm version](https://badge.fury.io/js/react-native-use-persisted-state.svg)](https://www.npmjs.com/package/react-native-use-persisted-state)
[![npm download](https://img.shields.io/npm/dt/react-native-use-persisted-state)](https://www.npmjs.com/package/react-native-use-persisted-state)
[![License MIT](https://img.shields.io/github/license/KoreanThinker/react-native-use-persisted-state?style=plat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Example](https://img.shields.io/badge/example-here!-blue)](https://github.com/krtk-dev/billboard-player)
![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKoreanThinker%2Freact-native-use-persisted-state&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)
![Stars](https://img.shields.io/github/stars/KoreanThinker/react-native-use-persisted-state?style=social)

## Introduce

💾 Cacheable & persistable state in react-native

🌏 Globally available

---

## Usage

```tsx
import {View, Text, Button} from 'react-native';
import {usePersistedState} from 'react-native-use-persisted-state';

const Counter = () => {
  const [count, setCount] = usePersistedState('@count', 0);

  return (
    <View>
      <Text>count : {count}</Text>
      <Button onPress={() => setCount(count + 1)} title="increment" />
      <Button onPress={() => setCount(count - 1)} title="decrement" />
    </View>
  );
};
```

---

## Getting started

#### First, Install `react-native-use-persisted-state` & [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)

```bash
yarn add react-native-use-persisted-state @react-native-async-storage/async-storage
```

#### Second, Pod intsall

```bash
cd ios && pod install
```

#### Third, Add provider

```tsx
// App.js
...
import {PersistedStateProvider} from 'react-native-use-persisted-state' // here

const App = () => {
  return (
    <PersistedStateProvider> // here
        <.../>
    </PersistedStateProvider> // here
  );
};
```

---

## Api
