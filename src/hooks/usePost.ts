import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../services/todoService";

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
