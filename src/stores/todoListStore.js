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
  addTodo: async (todo) => {
    const response = await Api.post("/todos", todo);
    set({ todos: [response.data, ...get().todos] });
    // get().fetchTodos();
  },
  deleteTodos: async (idList) => {
    await Promise.all(
      idList.map((id) => Api.delete(`/todos/${id}`))
    );
    get().fetchTodos();
  },
  setTodoStatus: async (id) => {
    set(async (state) => {
      const target = state.todos.find((t) => t.id === id)
      if (!target) return state;
      console.log(target.status);
      const newStatus = target.status === "DONE" ? "TODO" : "DONE"
      console.log(newStatus);
      const updatedTodo = { ...target, status: newStatus }
      console.log(updatedTodo);
      await Api.put(`/todos/${id}`, updatedTodo);      
      get().fetchTodos();
    })
  },
  fetchTodos: async () => {
    const response = await Api.get("/todos");
    set({ todos: response.data });
  },
  fetchTodosByPagination: async (page, pageSize) => {
    const response = await Api.get("/todos", {
      params: {
        page,
        pageSize
      }
    });
    set({ todos: response.data });
  },
  fetchTodosByStatus: async (status) => {
    const {page, pageSize} = get();
    const response = await Api.get("/todos", {
      params: {
        page,
        pageSize,
        status
      }
    });
    set({ todos: response.data });
  },
}))