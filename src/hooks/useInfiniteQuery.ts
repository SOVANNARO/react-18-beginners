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