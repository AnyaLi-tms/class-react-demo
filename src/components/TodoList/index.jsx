import { useTodoListStore } from "../../stores/todoListStore";
import styles from "./index.module.css";
import TodoItem from "./components/TodoItem";
import AddItem from "./components/AddItem";
import Summary from "./components/Summary";
import { Pagination } from "antd";
import { useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router";

export default function TodoList() {
  const {
    todoTitle,
    todos,
    fetchTodos,
    isFilter,
    setIsFilter,
    setTodoStatus,
    deleteTodos,
    page,
    pageSize,
    fetchTodosByPagination,
  } = useTodoListStore();
  const totalCount = todos.length;
  const completedCount = todos.filter((item) => item.status==="DONE").length;
  const uncompletedCount = totalCount - completedCount;
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePagination = useCallback(
    (page, pageSize) => {
      setSearchParams({ page, pageSize });
      fetchTodosByPagination(page, pageSize);
    },
    []
  );
  const filterItems = isFilter
    ? todos.filter((item) => item.status!=="DONE")
    : todos;
  const handleDelete = () => {
    const idList = todos.filter(item => item.status === "DONE").map(item => item.id);
    deleteTodos(idList);
  }
  const renderFilterDiv = () => {
    return (
      <div className={styles.filter}>
        <label style={{ padding: "0 12px" }}>
          <input
            type="checkbox"
            checked={isFilter}
            onChange={() => setIsFilter(!isFilter)}
          />
          过滤已完成的事项
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
      <button className={styles.clearButton} onClick={handleDelete}>
        清除已完成的({completedCount})
      </button>
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className={styles.todoList}>
      <h1>{todoTitle}</h1>
      <Summary
        totalCount={totalCount}
        completedCount={completedCount}
        uncompletedCount={uncompletedCount}
      />
      <Pagination
        className={styles.pagination}
        align="end"
        defaultPage={page}
        defaultPageSize={pageSize}
        hideOnSinglePage={false}
        onChange={(page, pageSize) => handlePagination(page, pageSize)}
        showSizeChanger
        showQuickJumper
      />
      <AddItem />
      {renderFilterDiv()}
      {renderTodoItems()}
      {renderClearButton()}
    </section>
  );
}
