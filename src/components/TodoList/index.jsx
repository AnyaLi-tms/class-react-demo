import { useTodoListStore } from "../../stores/todoListStore";
import styles from "./index.module.css";
import Pagination from "./components/Pagination";
import TodoItem from "./components/TodoItem";
import AddItem from "./components/AddItem";
import Summary from "./components/Summary";
import { useEffect } from "react";

export default function TodoList() {
  const { todoTitle, todos, setTodos, isFilter, setIsFilter, setTodoStatus, clearCompleted } =
    useTodoListStore();
  const totalCount = todos.length;
  const uncompletedCount = todos.filter((item) => !item.completed).length;
  const completedCount = totalCount - uncompletedCount;
  const filterItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;
  const renderFilterDiv = () => {
    return (
      <div className={styles.filter}>
        <label style={{ padding: "0 12px" }}>
          <input
            type="checkbox"
            checked={isFilter}
            onChange={() => setIsFilter(!isFilter)}
          />
          过滤已打包的物品
        </label>
      </div>
    );
  };
  const renderTodoItems = () => {
    return (
      <ul>
        {filterItems.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onToggle={() => setTodoStatus(item.id)}
          />
        ))}
      </ul>
    );
  };
  const renderClearButton = () => {
    return (
      <button className={styles.clearButton} onClick={clearCompleted}>
        清除已完成的({completedCount})
      </button>
    );
  };

  useEffect(() => {
    const initTodos = [
    { id: 1, title: "宇航服", completed: false },
    { id: 2, title: "带金箔的头盔", completed: true },
    { id: 3, title: "Tam 的照片", completed: false },
    { id: 4, title: "氧气罐", completed: false },
    { id: 5, title: "水壶", completed: false },
    { id: 6, title: "能量棒", completed: true },
    { id: 7, title: "备用手套", completed: false },
    { id: 8, title: "通讯设备", completed: true },
    { id: 9, title: "航天日志本", completed: true },
    { id: 10, title: "太阳镜", completed: true },
    { id: 11, title: "备用电池", completed: false },
    { id: 12, title: "地球照片", completed: false },
    { id: 13, title: "科学实验包", completed: false },
    { id: 14, title: "导航仪", completed: false },
    { id: 15, title: "个人洗漱包", completed: false },
    { id: 16, title: "应急药品", completed: false },
    { id: 17, title: "多功能刀具", completed: false },
    { id: 18, title: "太空食品", completed: false },
    { id: 19, title: "备用靴子", completed: false },
    { id: 20, title: "太空笔", completed: false },
  ];
  setTodos(initTodos);
  }, [setTodos]);

  return (
    <section className={styles.todoList}>
      <h1>{todoTitle}</h1>
      <Summary
        totalCount={totalCount}
        completedCount={completedCount}
        uncompletedCount={uncompletedCount}
      />
      <Pagination />
      <AddItem />
      {renderFilterDiv()}
      {renderTodoItems()}
      {renderClearButton()}
    </section>
  );
}
