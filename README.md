### 🔴 Styling Components

- Vanilla CSS
- CSS modules
- CSS-in-JS
- Using CSS libraries

### 🔴 Vanilla CSS

```css
.list-group {
  list-style: none;
  padding: 0;
}
```

### 🔴 CSS Modules

```tsx
import "./ListGroup.css";

interface Props {
  title: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ title, items, onSelectItem }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      <ul className={[styles.listGroup, styles.container].join(" ")}>
        {items.map((item, index) => (
          <li
            onClick={() => {
              onSelectItem(item);
            }}
            key={item}
            className="list-group-item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
```

### 🔴 CSS-IN-JS

- Scoped Style
- All the CSS & JS/TS code in on place
- Easier to delete a component
- Easier to style based on props/state

### 🔴 Libraries

- Styled components
- Emotion
- Polished

### 🔴 Install

`npm i styled-components`

`npm i @types/styled-components`

### Example Code

```typescript
import { useState } from "react";
import "./ListGroup.css";
import styled from "styled-components";

interface ListItemProps {
  active: boolean;
}

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background-color: ${(props) => (props.active ? "blue" : "none")};
`;

interface Props {
  title: string;
  items: string[];
  onSelectItem: (item: string) => void;
}

function ListGroup({ title, items, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <h1>{title}</h1>
      <List>
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            style={{
              backgroundColor: index === selectedIndex ? "lightgray" : "white",
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ListGroup;
```

### 🔴 Separation of Concerns

Divide a program into distinct sections where each section handles a specific functionality,
rather then having everything in one place.

### 🔴 Our Apps Will Be...

- Modular
- Easier to understand
- Easier to maintain
- Easier to modify

### 🔴 Inline Style

```typescript
<ListItem style={{ backgroundColor: index === selectedIndex ? "lightgray" : "white" }}>
  {item}
<ListItem>
```

### 🔴 Popular Ui Libraries

- Bootstrap
- Material UI
- Tailwind CSS
- Daisy UI
- chakra UI

### 🔴 Adding Icons

`npm install react-icons --save`

```typeScript
import { BiAddToQueue } from "react-icons/bi";

function App() {
  return (
    <div>
      <BiAddToQueue color="red" size="40" />
    </div>
  )
}

export default App;
```

### 🔴 Using CSS Modules

button.module.css

```typeScript
.btn {
  padding: 8px 12px;
  border-radius: 3px;
  border: 0;
}

.btn-primary {
  background-color: rgba(0, 0, 255, 0.543);
  color: white;
}

```

Button.tsx

```typeScript
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  onClick?: () => void;
}

function Button({ children, color, onClick }: Props) {
  return (
    <button
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

```

### 🔴 Building a Like Component

Like.tsx

```typeScript
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

function Like({ onClick }: Props) {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
    onClick();
  };

  if (like) return <FaHeart onClick={toggleLike} />;
  return <FaRegHeart onClick={toggleLike} />;
}

export default Like;

```

App.tsx

```typeScript
function App() {
  return (
    <div>
      <Like onClick={() => console.log('clicked')} />
    </div>
  )
}

export default App;
```

### 🔴 Terms

- CSS-in-JS
- CSS modules
- Implementation details
- Interface
- Inline styles
- Modular
- Separation of concerns
- Vanilla CSS

### 🔴 Summary
- We have several options for styling React components, including vanilla CSS, CSS
modules, CSS-in-JS, and inline styles.
- With vanilla CSS, we write our component styles in a separate CSS file and import it
into the component file. However, we may encounter conflicts if the same CSS classes
are defined in multiple files.
- CSS modules resolve this issue by generating unique class names during the build
process.
- With CSS-in-JS, we define all the styles for a component alongside its code. Like CSS
modules, this provides scoping for CSS classes and eliminates conflicts. It also makes it
easier for us to change or delete a component without affecting other components.
- The separation of concerns principle suggests that we divide a program into distinct
sections or modules where each section handles a specific functionality. It helps us build
modular and maintainable applications.
- With this principle, the complexity and implementation details of a module are hidden
behind a well-defined interface.
- Separation of concerns is not just about organizing code into files, but rather dividing
areas of functionality. Therefore, CSS-in-JS does not violate the separation of concerns
principle as all the complexity for a component remains hidden behind its interface.
- Although inline styles are easy to apply, they can make our code difficult to maintain
over time and should only be used as a last resort.
- We can add icons to our applications using the react-icons library.
- There are several UI libraries available that can assist us in quickly building beautiful
and modern applications. Some popular options include Bootstrap, Material UI,
TailwindCSS, DaisyUI, ChakraUI, and more.

### VANILLA CSS
```javascript
import './ListGroup.css';

function ListGroup() {
  return <ul className="list-group"></ul>;
}
```

### CSS MODULES
```javascript
import styles from './ListGroup.module.css';

function ListGroup() {
  return <ul className={styles.listGroup}></ul>;
}
```

### CSS-IN-JS
```javascript
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
`;

function ListGroup() {
  return <List></List>;
}
```