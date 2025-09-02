import styles from "./index.module.css";
import { useTodoListStore } from "../../../../stores/todoListStore";

const AddItem = () => {
  const { addTodo, inputValue, setInputValue } = useTodoListStore();
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
  };
  return (
    <form className={styles.addItem} onSubmit={handleAdd}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="请输入待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddItem;
