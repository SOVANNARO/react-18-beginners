import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

function TodoForm() {
  const addTodo = useAddTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && <div>Error: {addTodo.error.message}</div>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const todoTitle = inputRef.current?.value;
          if (!todoTitle) return;
          addTodo.mutate({
            id: 0,
            title: inputRef.current?.value,
            completed: false,
            userId: 1,
          });
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter todo"
          className="form-control"
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  );
}

export default TodoForm;
