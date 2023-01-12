import React, { useEffect, useState } from 'react'
import { useContract, useSigner } from 'wagmi'

import './TodoTask.css'

function TodoTaskSC(props) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Todo Smart contract handling
  const { data: signer } = useSigner()
  const contract = useContract({
    ...props.todoContract,
    signerOrProvider: signer,
  })

  // Create a new task
  const addTodo = async (taskName) => {
    await contract.addTask(taskName)
    setTodos([...todos, taskName])
  }

  // Remove the given task
  const removeTodo = async (index) => {
    await contract.deleteTask(index)
    setTodos(todos.filter((todo, i) => i !== index))
  }

  /*
    TODO Exercise: Call the "completeTask" function from Todo.sol smart contract
    Complete the given task
  */

  /*
    TODO Exercise: Call the "editTask" function from Todo.sol smart contract
    Edit the given task
  */

  return (
    <div>
      <h1>Todo List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          addTodo(event.target.elements.todo.value)
          event.target.elements.todo.value = ''
        }}
      >
        <input type='text' name='todo' />
        <button type='submit'>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            Task name: {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoTaskSC
