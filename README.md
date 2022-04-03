# React Native Use Persisted State

[![npm version](https://badge.fury.io/js/react-native-use-persisted-state.svg)](https://www.npmjs.com/package/react-native-use-persisted-state)
[![npm download](https://img.shields.io/npm/dt/react-native-use-persisted-state)](https://www.npmjs.com/package/react-native-use-persisted-state)
[![License MIT](https://img.shields.io/github/license/KoreanThinker/react-native-use-persisted-state?style=plat)](LICENSE)

![Stars](https://img.shields.io/github/stars/KoreanThinker/react-native-use-persisted-state?style=social)
![Twitter](https://img.shields.io/twitter/follow/koreanthinker?style=social)

## Preview

<img width="300" src="https://user-images.githubusercontent.com/48207131/160565345-826abe28-ea26-4162-a981-01a85bde4814.gif" />

## Introduce

💾 Simple persisted state in react-native

🌏 Globally accessable like redux, recoil...

🚀 No loading, Immediate synchronization

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

## API

### `usePersistedState`

#### Params

```ts
usePersistedState<T>(key, initialState);
```

| name         | type     | require | default     | description               |
| ------------ | -------- | ------- | ----------- | ------------------------- |
| key          | `string` | ✅      |             | key used to store storage |
| initialState | `T`      |         | `undefined` |                           |

#### Returns

```ts
const [state, setState, clear] = usePersistedState<T>(...);
```

| name     | type            | description                                                 |
| -------- | --------------- | ----------------------------------------------------------- |
| state    | `T`             | same as react state `const [state] = useState()`            |
| setState | `(v:T) => void` | same as react setState `const [..., setState] = useState()` |
| clear    | `() => void`    | clear storage and init state to `initialState`              |
