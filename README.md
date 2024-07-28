## React Query

### 🟢 What You'll learn

### React Query

- Caching
- Automatic retry
- Automatic refresh
- Paginated queries
- Infinite queries

### Global State Management

- Reducers
- Context
- Providers
- Zustand

### 🟢 Part 1: Querying Data

- Fetch Data
- Handle errors
- Implement pagination
- Implement Infinite queries
- Debug queries with React Query DevTools

### 🟢 Part 2: Mutation Data

- Handle CRUD Operations
- Implement optimistic update
- Create custom hooks
- Create Reduce Service

### 🟢 What is React Query?

A Powerful library for managing data fetching and caching is react application.

### Caching

The process of storing data in a place where it can be accessed more quickly and efficiently in the future.

### 🟢 Problem without React Query

- No request cancellation
- No separation of concerns
- No retries
- No automatic refresh
- No caching

### 🟢 Redux VS. React Query

#### Redux

- Difficult to learn
- So much boilerplate code

#### React Query

- A lot simpler
- More lightweight

Redux is no longer needed at least for caching

#### for fox sake

Do NOT use Redux for caching (and other reasons you think you need).

### 🟢 Setting Up React Query

- Install React Query
  > npm i @tanstack/react-query

src/main.tsx

```typeScript
  import React from "react";
  import ReactDOM from "react-dom/client";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import App from "./App.tsx";
  import "./index.css";

  const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );

```

### 🟢 Fetching Data

src/components/TodoList.tsx

```typeScript
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

function TodoList() {
  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      return response.data
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data?.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
```
