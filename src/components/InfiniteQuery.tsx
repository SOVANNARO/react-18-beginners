import useInfinitePosts from "../hooks/useInfiniteQuery";
import { Todo } from "../services/todoService";

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
