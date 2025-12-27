import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const handleEdit = () => {
    if (todo.completed) return;

    if (isEditable) {
      updateTodo(todo.id, { ...todo, todo: text });
    }
    setIsEditable((prev) => !prev);
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
        todo.completed ? "bg-green-200" : "bg-[#d9cce3]"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="w-4 h-4 accent-green-600 cursor-pointer"
      />

      <input
        type="text"
        value={text}
        readOnly={!isEditable}
        onChange={(e) => setText(e.target.value)}
        className={`flex-1 bg-transparent outline-none transition-all ${
          todo.completed ? "line-through text-gray-500" : "text-black"
        } ${isEditable ? "border border-black/20 px-2 rounded" : ""}`}
      />

      <button
        onClick={handleEdit}
        disabled={todo.completed}
        className="w-9 h-9 flex items-center justify-center rounded-md bg-white hover:bg-gray-100"
      >
        {isEditable ? "📂" : "✏️"}
      </button>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="w-9 h-9 flex items-center justify-center rounded-md bg-white hover:bg-red-100 text-red-600"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
