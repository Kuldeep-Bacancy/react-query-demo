import axios from "axios";

const BASE_URL = "http://localhost:8000"

export const getTodos = async (page=1) => {
  const res = await axios.get(`${BASE_URL}/todos?_limit=2&_page=${page}`)
  if (res.status !== 200) {
    throw new Error('Something went wrong!')
  }
  return res.data
}

export const createTodos = async (data) => {
  const res = await axios.post(`${BASE_URL}/todos`, data)
  if (res.status !== 201) {
    throw new Error('Something went wrong!')
  }
  return res.data
}

export const deleteTodo = async (todo) => {
  const { id } = todo;
  const res = await axios.delete(`${BASE_URL}/todos/${id}`)
  if(res.status != 200 ){
    throw new Error('Something went wrong!')
  }
  return todo
}