import { useEffect } from "react";
import { useState } from "react";
import capitalizeFirstLetter from "./capitalizeFirstLetter";
import TodoItem from "./TodoItem";

import FlipMove from "react-flip-move";

function TodoList() {
  const [todos, setTodos] = useState(
    window.localStorage.getItem("todos")
      ? JSON.parse(window.localStorage.getItem("todos"))
      : []
  );
  const [input, setInput] = useState("");

  const setLocalStorage = (elName, el) => {
    window.localStorage.setItem(elName, JSON.stringify(el));
  };

  useEffect(() => {
    setLocalStorage("todos", todos);
  }, [todos]);

  const createItem = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: capitalizeFirstLetter(input),
        date: new Date(),
      },
    ]);
    setInput("");
  };

  const handleOnDelete = (todo) => {
    const newTodos = todos.filter((item) => item !== todo);
    setTodos(newTodos);
  };

  const handleUpdateTodo = (todo, index) => {
    const todosCopy = [...todos];
    todosCopy.splice(index, 1, todo);
    setTodos(todosCopy);
  };

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <FlipMove>
        <>
          {todos.map((todo, index) => (
            <TodoItem
              updateTodo={(todoItem) => handleUpdateTodo(todoItem, index)}
              onDelete={(e) => handleOnDelete(todo)}
              key={`${todo.date}-${todo.text}`}
              todo={todo}
            ></TodoItem>
          ))}
        </>
      </FlipMove>
      <form className="mt-12 rounded-md p-2 flex bg-white">
        <input
          type="text"
          value={input}
          id="input"
          onChange={(e) => handleOnChange(e)}
          className="appearance-none bg-transparent w-full outline-none pl-4"
          placeholder="Your new task"
        />
        <button
          type="submit"
          onClick={createItem}
          className="text-white bg-blue-400 rounded-md px-4 py-2"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default TodoList;
