import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodo";
import axios from "axios";

function TodoForm() {
  const useQueries = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (data) => {
      // APPROACH: Invalidate the cache
      // useQueries.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // APPROACH 2: updating the data in the cache
      useQueries.setQueryData<Todo[]>(["posts"], (todos) => [
        data,
        ...(todos || []),
      ]);
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
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
  );
}

export default TodoForm;
