import useCounterStore from "../../stores/counterStore";

export default function Counter() {
  const {count, increment, decrement} = useCounterStore();
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment +</button>
      <p>count: {count}</p>
      <button onClick={decrement}>Decrement -</button>
    </div>
  );
}