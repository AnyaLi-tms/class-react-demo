import "./App.css";
import Register from "./components/Register";
import Hello from "./components/Hello";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
//import TodoList from "./TodoListNew";

function App() {
  return (
    <>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoList/>} />
      </Routes>
    </>
  );
}

export default App;
