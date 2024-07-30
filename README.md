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

### 🟢 Handling Errors

```typeScript
if (error) return <div>{error.message}</div>
```

### 🟢 Showing a loading Indicator

```typeScript
const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      return response.data
    }
  })

  if (isLoading) return <div>Loading...</div>
```

### 🟢 Create a Custom Query Hook

src/components/TodoList.tsx

```typeScript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.data;
    },
  });

  return { data, error, isLoading };
};

export default useTodos;

```

#### call to use in component

src/components/TodoList.tsx

```typeScript
const { data, error, isLoading } = useTodos();
```

### 🟢 Using React Query DevTools

#### install

`pnpm add @tanstack/react-query-devtools`

#### Config

src/main.tsx

```typeScript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
</QueryClientProvider>
```

### 🟢 Customizing Query Setting

#### Auto Refresh

- When the network is reconnected
- When a component is mounted
- When the window is refocused

src/main.tsx

```typeScript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      refetchOnBlur: false,
      refetchOnError: false,
      refetchOnIdle: false,
    },
  },
});
```

### 🟢 Parameterized Queries

scr/hooks/useTodo.ts

```typeScript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const useTodos = (userId: number | undefined) => {
  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: userId ? ["todos", userId, "todos"] : ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
        { params: { userId } }
      );
      return response.data;
    },
  });

  return { data, error, isLoading };
};

export default useTodos;

```

scr/components/TodoList.tsx

```typeScript
import { useState } from "react";
import useTodos, { Todo } from "../hooks/useTodo";

function TodoList() {
  const [userId, setUserId] = useState<number>();
  const { data, error, isLoading } = useTodos(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Todo List</h1>
      <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        className="form-select mb-3"
      >
        <option value="">Select a status...</option>
        <option value="1">Todo 1</option>
        <option value="2">Todo 2</option>
        <option value="3">Todo 3</option>
      </select>
      <ul>
        {data?.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

```

### 🟢 Pagination Query

src/hooks/usePost.tsx
```typeScript
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./useTodo";

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) =>
  useQuery<Todo[], Error>({
    queryKey: ["posts", query.page, query.pageSize],
    queryFn: async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${query.page}&_limit=${query.pageSize}`
      );
      return response.data;
    },
    refetchInterval: 60 * 1000, // refetch every minute
  });

export default usePosts;

```

src/components/PostList.tsx

```typeScript
import { useState } from "react";
import usePosts from "../hooks/usePost";
import { Todo } from "../hooks/useTodo";

function PostList() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {data?.map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}

export default PostList;

```

### 🟢 Infinite Queries
src/hooks/useInfiniteQuery.tsx
```typeScript
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./useTodo";

interface PostQuery {
  page: number;
  pageSize: number;
}

const useInfinitePosts = (query: PostQuery) =>
  useInfiniteQuery<Todo[], Error>({
    queryKey: ["posts", query.page, query.pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${query.pageSize}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === query.pageSize) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchInterval: 60 * 1000, // refetch every minute
    initialPageParam: 1, // Add this line to specify the initial page parameter
  });

export default useInfinitePosts;
```

src/components/infiniteQuery.tsx

```typeScript
import useInfinitePosts from "../hooks/useInfiniteQuery";
import { Todo } from "../hooks/useTodo";

function InfiniteQuery() {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfinitePosts({ page: 1, pageSize });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Infinite Query</h1>
      {data?.pages.map((page, index) => (
        <ul key={index}>
          {page.map((todo: Todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ))}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load More
      </button>
    </div>
  );
}

export default InfiniteQuery;

```

### 🟢 Next Steps
- Create mutation
- Handling mutation errors
- Implementing optimistic update
- Creating custom mutation hooks
- Building services for querying/mutating data