import { createContext, useContext } from "react";

export const TodoContext = createContext(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside TodoProvider");
  }
  return context;
};

export const TodoProvider = TodoContext.Provider;
