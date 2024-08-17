### 🟢 Global State Management

#### You'll Learn

- Consolidating state logic with a reducer
- Sharing data using React Context
- When to use React Context
- React Context vs Redux
- Managing application state using Zustand

### 🟢 Consolidating State Logic with a Reducer

#### Reducer

A function that allows us to centralize state updates in a component.

`src/state-management/reducers/counterReducer.ts`

```typeScript
interface Acton {
  type: "INCREMENT" | "DECREMENT" | "RESET";
}

const counterReducer = (state: number, action: Acton): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

export default counterReducer;

```

`src/state-management/Counter.tsx`

```typeScript
import { useReducer, useState } from "react";
import counterReducer from "./reducers/counterReducer";

const Counter = () => {
  // const [value, setValue] = useState(0);
  const [value, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      Counter ({value})
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};

export default Counter;

```

### 🟢 Sharing State Using React Context

#### Sharing State

Lift the state up to the closest parent and pass it down as props to child components.

#### React Content

Allows sharing data without passing it down through many components in the middle

### 🟢 When to use context

- Server State -> React Query
- Client Sate -> Local State + React Content (useState() useReducer())

#### State Management Libraries

- Redux
- MobX
- Recoil
- XState
- Zustand

### c Managing Application state with zustand

```typeScript
import { create } from "zustand";

interface CounterStore {
  counter: number;
  increase: () => void;
  reset: () => void;
}

create<CounterStore>((set) => ({
  counter: 0,
  increase: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set({ counter: 0 }),
}));

```

### 🟢 Exercise: Working with Zustand

```typeScript
import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

const userAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (username: string) => set((state) => ({ ...state, user: username })),
  logout: () => set((state) => ({ ...state, user: "" })),
}));

export default userAuthStore;

```

#### Call to use

```typeScript
const {user} =useAuthStore();
```

### 🟢 Preventing Unnecessary Renders
