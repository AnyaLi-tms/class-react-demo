import todoItems from "../todoItems.json";
import { useState } from "react";
import styles from './TodoList.module.css';

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
  const [todos, setTodos] = useState(todoItems);
  const [isFilter, setIsFilter] = useState(false);
  const filterItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;
  const handleToggle = (currentItem) => {
    setTodos(
      todos.map((item) =>
        item.id === currentItem.id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input
          type="checkbox"
          checked={isFilter}
          onChange={() => setIsFilter(!isFilter)}
        />
        只显示未完成的任务
      </label>
      <ul>
        {filterItems.map((item) => (
          <TodoItem key={item.id} {...item} onToggle={() => handleToggle(item)} />
        ))}
      </ul>
    </section>
  );
}
