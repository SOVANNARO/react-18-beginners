## :tada: React 18 Tutorials

- Building components
- Rendering markup with jsx
- Managing state
- Passing input via props
- Debugging React app

### :pushpin: Create a ListGroup Component

```
npm install bootstrap
```

```typeScript
function ListGroup() {
    return (
        <ul className="list-group">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
        </ul>
    );
}

export default ListGroup;
```

### :pushpin: Fragments

```typescript
function ListGroup() {
  return (
    <>
      <h1>List Group</h1>
      <ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
    </>
  );
}

export default ListGroup;
```

### :pushpin: Rendering List

```typeScript
function ListGroup() {
    const items = ["New York", "San Francisco", "Tokyo", "London"]

    return (
        <>
            <h1>List Group</h1>
            <ul className="list-group">
                {items.map(item => <li key={item} className="list-group-item">{item}</li>)}
            </ul>
        </>
    );
}

export default ListGroup;
```

### :pushpin: Conditional Rendering

```typeScript
function ListGroup() {
    let items = ["New York", "San Francisco", "Tokyo", "London"];
    items = [];

    return (
        <>
            <h1>List Group</h1>
            {items.length === 0 && <p>There are no items in the list</p>}
            {items.length === 0 ? <p>There are no items in the list</p> : null}
            <ul className="list-group">
                {items.map(item => <li key={item} className="list-group-item">{item}</li>)}
            </ul>
        </>
    );
}

export default ListGroup;
```

### :pushpin: Handling Events

```typescript
import { MouseEvent } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London"];
  items = [];

  const handleClick = (e: MouseEvent) => console.log(e);

  return (
    <>
      <h1>List Group</h1>
      {items.length === 0 && <p>There are no items in the list</p>}
      {items.length === 0 ? <p>There are no items in the list</p> : null}
      <ul className="list-group">
        {items.map((item) => (
          <li onClick={handleClick} key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
```

### :pushpin: Managing State

```TypeScript
import { useState } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London"];
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <h1>List Group</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            onClick={() => {
              setSelected(index);
            }}
            key={item}
            className={
              selected === index ? "list-group-item active" : "list-group-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

```

### :pushpin: Passing Data via Props

```TypeScript
import { useState } from "react";

interface Props {
  title: string;
  items: string[];
}

function ListGroup(props: Props) {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <h1>{props.title}</h1>
      <ul className="list-group">
        {props.items.map((item, index) => (
          <li
            onClick={() => {
              setSelected(index);
            }}
            key={item}
            className={
              selected === index ? "list-group-item active" : "list-group-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

```

### :pushpin: Passing Function via Props

```TypeScript
import { useState } from "react";

interface Props {
  title: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ title, items, onSelectItem }: Props) {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <h1>{title}</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            onClick={() => {
              setSelected(index);
              onSelectItem(item);
            }}
            key={item}
            className={
              selected === index ? "list-group-item active" : "list-group-item"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

```

#### Use component

```TypeScript
import "./App.css";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London"];

  const onSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <ListGroup items={items} title="List Group" onSelectItem={onSelectItem} />
    </>
  );
}

export default App;

```

### :pushpin: Props VS State

#### Props

- Input passed to a component
- Similar to function args
- Immutable

#### State

- Data managed by a component
- Similar to local variable
- Mutable

#### :bulb: Note

> **mu-tate**: change <br>
> **mu-ta-ble**: changeable <br>
> **im-mu-ta-ble**: Unchangeable <br>

### :pushpin: Passing Children
```TypeScript
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Alert = ({ children }: Props) => {
  return <div className="alert alert-primary">{children}</div>;
};

```

#### Use Component
```typeScript
import "./App.css";
import { Alert } from "./components/Alert";

function App() {
  return (
    <>
      <Alert> Alert </Alert>
    </>
  );
}

export default App;

```

### :pushpin: Building a Button Component
```typeScript
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  onClick?: () => void;
}

function Button({ children, color, onClick }: Props) {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
    
```

#### Use Component
```TypeScript
import "./App.css";
import Button from "./components/Button";

function App() {
  const onClickBtn = () => {
    console.log("Button Clicked");
  };

  return (
    <>
      <Button color="primary" onClick={onClickBtn}>
        Primary
      </Button>
    </>
  );
}

export default App;

```

### :pushpin: Showing an Alert
```TypeScript
interface Props {
  title: string;
  isAlert: boolean;
  onClose: () => void;
}

function AlertDismissible({ title, isAlert, onClose }: Props) {
  return (
    <>
      {isAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <h4 className="alert-heading">{title}</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      )}
    </>
  );
}

export default AlertDismissible;

```

#### Use Component
```TypeScript
import { useState } from "react";
import "./App.css";
import AlertDismissible from "./components/AlertDismissible";

function App() {
  const [isAlert, setIsAlert] = useState(false);

  const onClickDismiss = () => {
    setIsAlert(false);
  };

  return (
    <>
      <AlertDismissible
        title="Alert Dismissible"
        isAlert={isAlert}
        onClose={onClickDismiss}
      />
      <div className="pt-2">
        <Button color="primary" onClick={() => setIsAlert(true)}>
          Alert Dismissible
        </Button>
      </div>
    </>
  );
}

export default App;

```

### Building Components
#### Terms
- Fragment
- Immutable
- Props
- State hook

#### Summary
- In React apps, a component can only return a single element. To return multiple
elements, we wrap them in a fragment, which is represented by empty angle brackets.
- To render a list in JSX, we use the ‘array.map()’ method. When mapping items, each
item must have a unique key, which can be a string or a number.
- To conditionally render content, we can use an ‘if’ statement or a ternary operator.
- We use the state hook to define state (data that can change over time) in a component. A
hook is a function that allows us to tap into built-in features in React.
- Components can optionally have props (short for properties) to accept input.
- We can pass data and functions to a component using props. Functions are used to
notify the parent (consumer) of a component about certain events that occur in the
component, such as an item being clicked or selected.
- We should treat props as immutable (read-only) and not modify them.
- When the state or props of a component change, React will re-render the component
and update the DOM accordingly.
- In React apps, a component can only return a single element. To return multiple
elements, we wrap them in a fragment, which is represented by empty angle brackets.
- To render a list in JSX, we use the ‘array.map()’ method. When mapping items, each
item must have a unique key, which can be a string or a number.
- To conditionally render content, we can use an ‘if’ statement or a ternary operator.
- We use the state hook to define state (data that can change over time) in a component. A
hook is a function that allows us to tap into built-in features in React.
- Components can optionally have props (short for properties) to accept input.
- We can pass data and functions to a component using props. Functions are used to
notify the parent (consumer) of a component about certain events that occur in the
component, such as an item being clicked or selected.
- We should treat props as immutable (read-only) and not modify them.
- When the state or props of a component change, React will re-render the component
and update the DOM accordingly.

#### :white_check_mark: CREATING A COMPONENT
```typescript
const Message = () => {
  return <h1>Hello World</h1>;
};

```
#### :white_check_mark: RENDERING A LIST

```typescript
const Component = () => {
  const items = ['a', 'b', 'c'];
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
```


#### :white_check_mark: CONDITIONAL RENDERING
```typescript
{items.length === 0 ? 'a' : 'b'}
{items.length == 0 && 'a'}
```

Certainly! Let's format the code snippets you provided:

#### :white_check_mark: **Handling Events**:
```jsx
<button onClick={() => console.log('clicked')}></button>;
```

#### :white_check_mark: **Defining State**:
```jsx
const [name, setName] = useState('');
```

#### :white_check_mark: **Props**:
```jsx
interface Props {
  name: string;
}

const Component = ({ name }: Props) => {
  return <p>{name}</p>;
};
```

#### :white_check_mark: **Passing Children**:
```jsx
interface Props {
  children: ReactNode;
}

const Component = ({ children }: Props) => {
  return <div>{children}</div>;
};
```