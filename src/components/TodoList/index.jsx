import { useTodoListStore } from "../../stores/todoListStore";
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
  const { todos, addTodo, setTodos, clearCompleted } = useTodoListStore();
  const totalCount = todos.length,
    uncompletedCount = todos.filter((item) => !item.completed).length,
    completedCount = totalCount - uncompletedCount;
  const [isFilter, setIsFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const filterItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;
  const handleToggle = (item) => {
    setTodos(item.id);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;
    addTodo({
      id: Date.now(), // 如需用nanoid: nanoid(),
      title: value,
      completed: false,
    });
    setInputValue("");
    console.log(todos);
  };
  const handleClear = () => {
    clearCompleted();
  };
  return (
    <section className={styles.todoList}>
      <h1>
        Sally Ride 的 行李清单 <br /> (Zustand 版本)
      </h1>
      <div className={styles.summary}>
        <span>总计: {totalCount}</span>
        <span>已打包: {completedCount}</span>
        <span>未打包: {uncompletedCount}</span>
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
      <form className={styles.addTodo} onSubmit={handleAdd}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入待办事项"
        />
        <button type="submit">添加</button>
      </form>
      <ul>
        {filterItems.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => handleToggle(item)}
          />
        ))}
      </ul>
      <button className={styles.clearButton} onClick={handleClear}>
        清除已完成的({completedCount})
      </button>
    </section>
  );
}
