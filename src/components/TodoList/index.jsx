import { useTodoListStore } from "../../stores/todoListStore";
import styles from "./index.module.css";
import TodoItem from "./components/TodoItem";
import AddItem from "./components/AddItem";
import Summary from "./components/Summary";
import { Pagination } from 'antd';
import { useCallback, useEffect } from "react";
import { Link, useSearchParams } from 'react-router';

export default function TodoList() {
  const { todoTitle, todos, fetchTodos, pageTodos, setPageTodos, setTodos, isFilter, setIsFilter, setTodoStatus, clearCompleted, defaultPage, defaultPageSize, page, pageSize, setPagination } =
    useTodoListStore();
  const totalCount = todos.length;
  const uncompletedCount = todos.filter((item) => !item.completed).length;
  const completedCount = totalCount - uncompletedCount;
  const filterItems = isFilter
    ? todos.filter((item) => !item.completed)
    : todos;
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePagination = useCallback((page, pageSize) => {
    setSearchParams({ page, pageSize });
    const currentPageTodos = setPagination(searchParams.get('page') || defaultPage, searchParams.get('pageSize') || defaultPageSize);
    setPageTodos(currentPageTodos);
  }, [defaultPage, defaultPageSize, searchParams, setPagination, setSearchParams]);

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
      <button className={styles.clearButton} onClick={clearCompleted}>
        清除已完成的({completedCount})
      </button>
    );
  };

  useEffect(() => {
    fetchTodos();
    //handlePagination(defaultPage, defaultPageSize);
  }, []);

  return (
    <section className={styles.todoList}>
      <h1>{todoTitle}</h1>
      <Summary
        totalCount={totalCount}
        completedCount={completedCount}
        uncompletedCount={uncompletedCount}
      />
      {/*<Pagination
        className={styles.pagination}
        align="end"
        page={page}
        pageSize={pageSize}
        hideOnSinglePage={false}
        onChange={(page, pageSize) => handlePagination(page, pageSize)}
        showSizeChanger
        showQuickJumper
      />*/}
      <AddItem />
      {renderFilterDiv()}
      {renderTodoItems()}
      {renderClearButton()}
    </section>
  );
}
