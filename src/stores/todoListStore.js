import { create } from "zustand";

export const useTodoListStore = create((set, get) => ({
  todos: [
    { id: 1, title: "宇航服", completed: false },
    { id: 2, title: "带金箔的头盔", completed: true },
    { id: 3, title: "Tam 的照片", completed: false },
  ],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
