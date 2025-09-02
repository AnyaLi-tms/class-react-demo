import React, { useState, useEffect } from "react";
import Api from "./services/api";
const TodoListNew = () => {
  const [todos, setTodos] = useState([]);
  async function fetchTodos() {
    const { data } = await Api.get("/todos");
    setTodos(data);
  }
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};
export default TodoListNew;
