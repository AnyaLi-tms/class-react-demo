import { create } from "zustand";

export const useTodoListStore = create((set) => ({
  todoTitle: "Sally Ride 的 行李清单",
  todos: [],
  setTodos: (todos) => set({ todos }),
  isFilter: false,
  setIsFilter: (isFilter) => set({ isFilter }),
  inputValue: "",
  setInputValue: (inputValue) => set({ inputValue }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
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
}));
