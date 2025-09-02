import styles from "./index.module.css";

function TodoItem({ title, status, onToggle }) {
  const completed = status === "DONE";
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
export default TodoItem;