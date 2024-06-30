## Prerequisites

### What You Should Know

- HTML
- CSS
- JavaScript

### What is React?

React is a popular JavaScript library for building user interfaces, particularly single-page applications, by creating reusable UI components.

### Setting Up the Development Environment

- Node
- IDEs: VScode or WebStorm

### Creating A React App

- Create React App (CRA)

```
npm create vite@latest
```

- Vite

### React Convert to JavaScript

[https://babeljs.io/repl](https://babeljs.io/repl)

### React Ecosystem

React is a javaScript library for building user interfaces

#### Library

- React

#### Framework

- Angular
- Vue

### Library VS Framework

- **Library**: A tool that provides specific functionality
- **Framework**: A set of tools and guidelines for building apps

#### React:

- UI
- Routing
- Managing app state
- Internationalization
- Form validation
- Animations

### Summary

#### Terms

- **Components**: JSX, TSX
- **JavaScript Framework**: DOM
- **JavaScript Library**: Virtual DOM

#### Summary

- React is a JavaScript library for building dynamic and interactive user interfaces.
- In React applications, we don’t query and update the DOM. Instead, we describe our
  application using small, reusable components. React will take care of efficiently creating
  and updating DOM elements.
- React components can be created using a function or a class. Function-based
  components are the preferred approach as they’re more concise and easier to work
  with.
- JSX stands for JavaScript XML. It is a syntax that allows us to write components that
  combine HTML and JavaScript in a readable and expressive way, making it easier to
  create complex user interfaces.
- When our application starts, React takes a tree of components and builds a JavaScript
  data structure called the virtual DOM. This virtual DOM is different from the actual
  DOM in the browser. It’s a lightweight, in-memory representation of our component
  tree.
- When the state or the data of a component changes, React updates the
  corresponding node in the virtual DOM to reflect the new state. Then, it compares
  the current version of virtual DOM with the previous version to identify the nodes
  that should be updated. It’ll then update those nodes in the actual DOM.
- In browser-based apps, updating the DOM is done by a companion library called
  ReactDOM. In mobile apps, React Native uses native components to render the
  user interface.
- Since React is just a library and not a framework like Angular or Vue, we often
  need other tools for concerns such as routing, state management,
  internationalization, form validation, etc.
