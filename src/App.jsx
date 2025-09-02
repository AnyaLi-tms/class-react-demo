import "./App.css";
import Register from "./components/Register";
import Hello from "./components/Hello";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import { Route, Routes } from "react-router";
//import TodoList from "./TodoListNew";

function App() {
  return (
    //<TodoList/>
    <Routes>
      <Route path="/" element={<TodoList/>} />
      <Route path="/todos" element={<TodoList/>} />
    </Routes>
  );
}

export default App;
