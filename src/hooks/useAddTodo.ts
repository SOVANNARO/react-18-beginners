import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constands/queryKey";
import APIClient from "../services/apiClient";
import { Todo } from "../services/todoService";

const apiClient = new APIClient<Todo>("/todos");

interface AddTodoContext {
  previousTodos: Todo[];
}
const useAddTodo = () => {
  const useQueries = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,
    onMutate: (newTodo: Todo) => {
      const previousTodos =
        useQueries.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      useQueries.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);
      useQueries.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      useQueries.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      useQueries.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
