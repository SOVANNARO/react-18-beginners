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