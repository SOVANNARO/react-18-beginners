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
