import "./App.css";
import Register from "./components/Register";
import Hello from "./components/Hello";
import Counter from "./components/Counter";
import { useState } from "react";

function App() {
  const [activeVersion, setActiveVersion] = useState("zustand");

  return (
    <div className="App">
      <div className="version-selector">
        <button
          className={`version-btn ${
            activeVersion === "zustand" ? "active" : ""
          }`}
          onClick={() => setActiveVersion("zustand")}
        >
          🚀 Zustand版本 (推荐)
        </button>
        <button
          className={`version-btn ${
            activeVersion === "useState" ? "active" : ""
          }`}
          onClick={() => setActiveVersion("useState")}
        >
          ⚠️ useState版本 (对比)
        </button>
      </div>

      <main className="app-main">
        <Register />
      </main>
    </div>
  );
}

export default App;
