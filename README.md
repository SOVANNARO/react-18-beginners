## 🟢 Managing Component State

### 🟢 Understanding the State Hook

#### State Hook

- React update state asynchronously
- State is stored outside of components
- Use hooks at the top level of your component.

### 🟢 Choosing the State Structure

#### Best Practices

- Avoid redundant state variable
- Group related variables inside an object.
- Avoid deeply nested structures.

### 🟢 Keeping Components Pure

#### Pure Function

Give the same input, always returns the same result.

```typeScript
const result = myFunc(1);
// result = a
```

#### To Keep Component pure

keep changes our of the render phase

```typeScript
const Message = () => {
    let count = 0;
    count++;
    return <div>Message {count}</div>
}

export default Message;
```

### 🟢 Understanding the Strict Mode

The React StrictMode can be viewed as a helper component that allows developers to code efficiently and brings to their attention any suspicious code that might have been accidentally added to the application. The StrictMode can be applied to any section of the application, not necessarily to the entire application. It is especially helpful to use while developing new codes or debugging the application.

### 🟢 Updating Objects

```typeScript
import { useState } from "react";

function App() {
  const [drink, setDrink] = useState({
    name: "Coca-Cola",
    price: 10000,
  });

  const handleClick = () => {
    const newDrink = {
      ...drink,
      price: 20000,
    };
    setDrink(newDrink);
  };

  return (
    <div>
      {drink.name}
      <br />
      <button onClick={handleClick}>Change Price</button>
    </div>
  );
}

export default App;

```

### 🟢 Update Nested Object

```typeScript
import { useState } from "react";

function App() {
  const [customer, setCustomer] = useState({
    name: "John",
    arg: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "12345",
    },
  });

  const handleClick = () => {
    setCustomer({
      ...customer,
      address: {
        ...customer.address,
        zip: "54321",
      },
    });
  };
  return (
    <div>
      <button onClick={handleClick}>Change zip</button>
    </div>
  );
}

export default App;

```

### 🟢 Updating Arrays

```typeScript
import { useState } from "react";

function App() {
  const [tags, setTags] = useState([
    "react",
    "javascript",
    "typescript",
    "nodejs",
    "express",
    "mongodb",
    "mysql",
    "postgresql",
  ]);

  const handleClick = () => {
    // add
    setTags([...tags, "new tag"]);
    // remove
    setTags(tags.filter((tag) => tag!== "new tag"));
    // update
    setTags(tags.map((tag) => (tag === "new tag"? "new tag updated" : tag)));
    // clear
    setTags([]);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

```

### 🟢 Updating Array of Objects

```typeScript
import { useState } from "react";

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: 'Bug 1', fixed: false },
    { id: 2, title: 'Bug 2', fixed: false },
  ]);

  const handleClick = () => {
    // add a new bug
    const newBug = {
      id: bugs.length + 1,
      title: 'New Bug',
      fixed: false,
    };
    setBugs([...bugs, newBug]);
    // update a bug
    const updatedBug = {
      id: 1,
      title: 'Bug 1',
      fixed: true,
    };
    setBugs(bugs.map((bug) => bug.id === updatedBug.id? updatedBug : bug));
    // remove a bug
    setBugs(bugs.filter((bug) => bug.id!== 2));
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

```

### 🟢 Simplifying Update Logic with Immer

#### Install

`npm i immer`

```typeScript
import { produce } from "immer";
import { useState } from "react";

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: 'Bug 1', fixed: false },
    { id: 2, title: 'Bug 2', fixed: false },
  ]);

  const handleClick = () => {
    setBugs(produce(draft => {
      const bug = draft.find(b => b.id === 1);
      if (bug) bug.fixed = true;
    });
  };

  return (
    <div>
      {bugs.map(bug => <div key={bug.id}>{bug.title}</div>)}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

```

### 🟢 Sharing State between Components

Card.tsx

```typeScript
interface Props {
  cardItems: string[];
  onClear: () => void;
}

function Card({ cardItems, onClear }: Props) {
  return (
    <div>
      {cardItems.map((cardItem) => (
        <div key={cardItem}>{cardItem}</div>
      ))}
      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default Card;

```

NavBar.tsx

```typeScript
interface Props {
  cardItemCount: number;
}

function NavBar({ cardItemCount }: Props) {
  return (
    <div>
      <h1>NavBar</h1>
      <h2>{cardItemCount}</h2>
    </div>
  );
}

export default NavBar;

```

App.tsx

```typeScript
import { useState } from "react";
import NavBar from "./components/NavBar";
import Card from "./components/Card";

function App() {
  const [cardItemCount, setCardItemCount] = useState([
    "product 1",
    "product 2",
    "product 3",
    "product 4",
  ]);

  return (
    <div>
      <NavBar cardItemCount={cardItemCount.length} />
      <Card cardItems={cardItemCount} onClear={() => setCardItemCount([])} />
    </div>
  );
}

export default App;

```

### 🟢 Exercise 1: Updating State

```typeScript
import { useState } from "react";

function App() {
  const [gameState, setGameState] = useState({
    id: 1,
    player: {
      name: "Player 1",
    },
  });

  const handleClick = () => {
    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        name: "Player 2",
      },
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Change Player</button>
    </div>
  );
}

export default App;
```

### 🟢 Exercise 2

```typeScript
import { useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState({
    name: "Margherita",
    toppings: ["cheese", "pepperoni"],
  });

  const handleClick = () => {
    setPizzas({
      ...pizzas,
      toppings: [...pizzas.toppings, "mushrooms"],
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Add Mushrooms to {pizzas.name}</button>
    </div>
  );
}

export default App;

```

### 🟢 Exercise 3

```typeScript
import { useState } from "react";

function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleClick = () => {
    // add a new bug
    setBugs([...bugs, { id: 3, title: "Bug 3", fixed: false }]);
    // remove a bug
    setBugs(bugs.filter((b) => b.id !== 1));
    // update a bug
    setBugs(
      bugs.map((b) => (b.id === 1 ? { id: 1, title: "Bug 1", fixed: true } : b))
    );
  };

  return (
    <div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default App;

```

### 🟢 Building an ExpandableText Component
ExpandableText.tsx
```typeScript
import React, { useState } from "react";

interface Props {
  children: string;
  maxChars: number;
}

const ExpandableText: React.FC<Props> = ({ children, maxChars }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedText = children.slice(0, maxChars);
  const remainingText = children.slice(maxChars);

  return (
    <div>
      {isExpanded ? (
        <span>{children}</span>
      ) : (
        <span>
          {truncatedText}
          {remainingText.length > 0 && (
            <span>
              ...
              <button onClick={toggleExpand}>Read More</button>
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default ExpandableText;

```
App.tsx
```typeScript
import ExpandableText from "./components/ExpandableText";

function App() {
  return (
    <div>
      <ExpandableText maxChars={20}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi saepe
        officiis voluptate sapiente laboriosam rerum assumenda. Sed vitae est
        quod voluptatibus veritatis qui nulla voluptas, culpa, similique nisi
        perferendis. Tenetur ab dolorum saepe? Ab accusantium impedit delectus
        nostrum ratione. Necessitatibus quos perferendis impedit quod illo
        rerum. Reiciendis quia nihil molestias excepturi. Doloribus, esse
        temporibus! Eius atque corrupti eum, incidunt iste quae repellendus? A
        nisi natus excepturi obcaecati sapiente aperiam quo, deserunt ipsam, ex
        deleniti adipisci aut, neque dolorum amet ad officiis! Fugit delectus
        aliquam sunt veritatis asperiores natus, error ex voluptatum modi
        ducimus vel molestias repellendus rerum enim voluptate dignissimos!
      </ExpandableText>
    </div>
  );
}

export default App;

```
### 🟢 Terms
- Asynchronous
- Lifting state
- Pure component
- Strict mode

### 🟢 Summary
- The state hook allows us to add state to function components.
- Hooks can only be called at the top level of components.
- State variables, unlike local variables in a function, stay in memory as long as the
component is visible on the screen. This is because state is tied to the component
instance, and React will destroy the component and its state when it is removed from
the screen.
- React updates state in an asynchronous manner, so updates are not applied
immediately. Instead, they’re batched and applied at once after all event handlers have
finished execution. Once the state is updated, React re-renders our component.
- Group related state variables into an object to keep them organized.
- Avoid deeply nested state objects as they can be hard to update and maintain.
- To keep state as minimal as possible, avoid redundant state variables that can be
computed from existing variables.
- A pure function is one that always returns the same result given the same input. Pure
functions should not modify objects outside of the function.
- React expects our function components to be pure. A pure component should always
return the same JSX given the same input.
- To keep our components pure, we should avoid making changes during the render
phase.
- Strict mode helps us catch potential problems such as impure components. Starting
from React 18, it is enabled by default. It renders our components twice in development
mode to detect any potential side effects.
- When updating objects or arrays, we should treat them as immutable objects. Instead of
mutating them, we should create new objects or arrays to update the state.
- Immer is a library that can help us update objects and arrays in a more concise and
mutable way.
- To share state between components, we should lift the state up to the closest parent
component and pass it down as props to child components.
- The component that holds some state should be the one that updates it. If a child
component needs to update some state, it should notify the parent component using a
callback function passed down as a prop.

✔️ UPDATING OBJECTS

```javascript
const [drink, setDrink] = useState({
  title: 'Americano',
  price: 5
});

setDrink({ ...drink, price: 2 });
```

✔️ UPDATING NESTED OBJECTS

```javascript
const [customer, setCustomer] = useState({
  name: 'John',
  address: {
    city: 'San Francisco',
    zipCode: 94111
  }
});

setCustomer({
  ...customer,
  address: { ...customer.address, zipCode: 94112 },
});
```

✔️ UPDATING ARRAYS

```javascript
const [tags, setTags] = useState(['a', 'b']);

// Adding
setTags([...tags, 'c']);

// Removing
setTags(tags.filter(tag => tag !== 'a'));

// Updating
setTags(tags.map(tag => tag === 'a' ? 'A' : tag));
```

✔️ UPDATING ARRAY OF OBJECTS

```javascript
const [bugs, setBugs] = useState([
  { id: 1, title: 'Bug 1', fixed: false },
  { id: 2, title: 'Bug 2', fixed: false },
]);

setBugs(bugs.map(bug =>
  bug.id === 1 ? { ...bug, fixed: true } : bug
));
```

✔️ UPDATING WITH IMMER

```javascript
import produce from 'immer';

setBugs(produce(draft => {
  const bug = draft.find(bug => bug.id === 1);
  if (bug) bug.fixed = true;
}));
```