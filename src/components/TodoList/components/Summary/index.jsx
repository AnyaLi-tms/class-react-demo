import styles from "./index.module.css";

const Summary = ({ totalCount, completedCount, uncompletedCount }) => {
  return (
    <div className={styles.summary}>
      <span>总计: {totalCount}</span>
      <span>已打包: {completedCount}</span>
      <span>未打包: {uncompletedCount}</span>
    </div>
  );
};
export default Summary;