import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <Link to="/todos">Manage your tasks efficiently</Link>
    </div>
  );
};

export default Home;