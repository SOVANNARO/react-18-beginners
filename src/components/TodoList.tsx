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
