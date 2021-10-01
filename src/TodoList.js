import { useEffect } from "react";
import { useState } from "react";
import capitalizeFirstLetter from "./capitalizeFirstLetter";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log(todos);

  }, [todos]);

  const createItem = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: capitalizeFirstLetter(input),
        date: new Date(),
      }
    ]);
    setInput('');
  }

  const handleOnDelete = (todo) => {
    const newTodos = todos.filter((item) => item !== todo);
    setTodos(newTodos);
  }

  const handleUpdateTodo = (todo, index) => {
    const todosCopy = [...todos];
    todosCopy.splice(index, 1, todo);
    setTodos(todosCopy);
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem updateTodo={(todoItem) => handleUpdateTodo(todoItem, index)} onDelete={(e) => handleOnDelete(todo)} key={`${todo.date}-${todo.text}`} todo={todo}></TodoItem>
      ))}
      <form className="bg-white mt-12 rounded-md p-2 flex shadow-xl">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} className="appearance-none bg-transparent w-full outline-none pl-4" placeholder="Your new task" />
        <button type="submit" onClick={createItem} className="text-white bg-blue-400 rounded-md px-4 py-2">Create</button>
      </form>
    </div>
  )
}

export default TodoList;
