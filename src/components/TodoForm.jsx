import { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ todo });
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-[#2a3446] rounded-lg overflow-hidden"
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 outline-none"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-6 py-2 text-white font-medium"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
