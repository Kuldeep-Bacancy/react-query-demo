import React, { useState } from 'react'
import { createTodos } from '../services/todos'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function TodoForm() {
  const [text, setText] = useState('')
  const queryClient = useQueryClient()

  const createTodoMutation = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
    onError: (error) => {
      console.log(error);
    },
  })

  const handleSubmit = event => {
    event.preventDefault();
    createTodoMutation.mutate({"content": text});
    setText('');
  };

  return (
    <>
      <form id="todoForm" className="flex mt-4" onSubmit={handleSubmit}>
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Add a new Todo' value={text} onChange={(e) => { setText(e.target.value)}}/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r" disabled={createTodoMutation.isLoading}>Add</button>
      </form>
    </>
  )
}

export default TodoForm