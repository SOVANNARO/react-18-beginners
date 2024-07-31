import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constands/queryKey";
import todoService, { Todo } from "../services/todoService";

const useTodos = (userId: number | undefined) => {
  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: userId ? ["todos", userId, "todos"] : CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
  });

  return { data, error, isLoading };
};

export default useTodos;
