import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

// Read localStorage before first render
const getInitialTodos = () => {
  try {
    const stored = localStorage.getItem("todos");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getInitialTodos);

  // Add todo
  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), completed: false, ...todo },
      ...prev,
    ]);
  };

  // Update todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  // Persist todos safely
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Derived state
  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  // Clear All Todos for new day
  const clearAllTodos = () => {
    const confirmClear = window.confirm(
      "This will delete all todos for today. Are you sure?"
    );

    if (!confirmClear) return;

    setTodos([]);
    localStorage.removeItem("todos");
  };


  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        clearAllTodos,
      }}
    >
      <div className="min-h-screen bg-[#0f1b2d] flex justify-center items-start pt-20 pb-32">
        <div className="w-full max-w-xl px-4">
          <h1 className="text-3xl font-semibold text-white text-center mb-6">
            Manage Your Todos
          </h1>

          <TodoForm />

          {todos.length > 0 && (
            <div className="flex justify-end mb-3">
              <button
                onClick={clearAllTodos}
                className="text-sm px-4 py-1.5 rounded-lg bg-red-600 mt-4 hover:bg-red-700 text-white transition-all"
              >
                Clear All
              </button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {sortedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
