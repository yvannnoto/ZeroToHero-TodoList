import { useEffect } from "react";
import { useState } from "react";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

function TodoItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [todo, setTodo] = useState({ ...props.todo });

  useEffect(() => {
    props.updateTodo(todo);
  }, [todo]);

  const handleToggleComplete = () => {
    setTodo({
      ...todo,
      completed: todo.completed ? !todo.completed : true,
    });
  };

  const handleTextChange = (e, title) => {
    e.preventDefault();
    setTodo({
      ...todo,
      text: capitalizeFirstLetter(title),
    });
  };

  return (
    <div className="bg-white mb-4">
      <input type="checkbox" onChange={(e) => handleToggleComplete()} />
      {editMode ? (
        <form>
          <input
            type="text"
            defaultValue={todo.text}
            onChange={(e) => handleTextChange(e, e.target.value)}
          />
          <button onClick={(e) => setEditMode(false)}>Valider</button>
        </form>
      ) : (
        <p
          onClick={() => setEditMode(true)}
          className={`${todo.completed ? "completed" : ""}`}
        >
          {todo.text}
        </p>
      )}
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
}

export default TodoItem;
