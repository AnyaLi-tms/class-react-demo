import {useTodoListStore} from "../../stores/todoListStore";
import { useState } from "react";
import styles from "./index.module.css";

function TodoItem({ title, completed, onToggle }) {  
  const itemClassName = `${styles.item} ${completed ? styles.checked : ""}`;
  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {title} {completed && "✅"}
      </label>
    </li>
  );
}

export default function TodoList() {
  const { todos: todoItems, addTodo, toggleTodo } = useTodoListStore();
  const [todos, setTodos] = useState(todoItems);
  const [isFilter, setIsFilter] = useState(false);
  const filterItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;
  const handleToggle = (currentItem) => {
    setTodos(
      todos.map((item) =>
        item.id === currentItem.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };
  return (
    <section className={styles.todoList}>
      <h1>Sally Ride 的 行李清单 <br /> (Zustand 版本)</h1>
      <div className={styles.summary}>
        <span>总计: {todos.length}</span>
        <span>已打包: {todos.filter((item) => item.completed).length}</span>
        <span>未打包: {todos.filter((item) => !item.completed).length}</span>
      </div>
      <div className={styles.filterDiv}>          
        <label>
          <input
            type="checkbox"
            checked={isFilter}
            onChange={() => setIsFilter(!isFilter)}
          />
          过滤已打包的物品
        </label>
      </div>
      <div className={styles.addTodo}>
        <input type="text" />
        <button style={{ backgroundColor: "#027bfe", color: "#fff" }}>添加</button>
      </div>
      <ul>
        {filterItems.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleToggle(item)}
          />
        ))}
      </ul>
      <button className={styles.clearButton}>清除已完成的(2)</button>
    </section>
  );
}
