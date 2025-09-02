import { create } from "zustand";
import Api from "../services/api";

export const useTodoListStore = create((set, get) => ({
  todoTitle: "Sally Ride 的 待办清单",
  loading: false,
  error: null,
  todos: [],
  pageTodos: [],
  isFilter: false,
  inputValue: "",
  defaultPage: 1,
  defaultPageSize: 5,
  page: 1,
  pageSize: 5,
  currentPageTodos: [],
  setTodos: (todos) => set({ todos }),
  setPageTodos: (pageTodos) => set({ pageTodos }),
  setIsFilter: (isFilter) => set({ isFilter }),
  setInputValue: (inputValue) => set({ inputValue }),
  addTodo: (todo) => set((state) => ({ todos: [ todo, ...state.todos] })),
  setTodoStatus: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  setPagination: () => {
    const { todos, page, pageSize } = get();
    const start = (page - 1) * pageSize;
    set({ currentPageTodos: todos.slice(start, start + pageSize) });
  },
  fetchTodos: async () => {
    const response = await Api.get("/todos");
    set({ todos: response.data });
  }
}));