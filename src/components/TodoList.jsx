import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { getTodos, deleteTodo } from '../services/todos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function TodoList() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => getTodos(page)
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isPending || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded p-4 shadow">
      <TodoForm />

      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      <ul id="todoList" className="list-disc pl-4">
        {data.map((todo) => (
          <li className="flex items-center justify-between mb-2" key={todo.id}>
            <span className="mr-2">{todo.content}</span>
            <button
              className="text-red-500"
              onClick={(e) => {
                e.preventDefault();
                deleteTodoMutation.mutate(todo);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} className='bg-yellow-500 text-white p-2 rounded-r' disabled={page <= 1}>Previous</button>
      <button onClick={() => setPage(page + 1)} className='bg-blue-500 text-white p-2 rounded-r'>Next</button>
    </div>
  );
}

export default TodoList;
