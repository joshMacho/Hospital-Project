import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import Enterance from "./components/Enterance";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Enterance />
    </div>
  );
}

export default App;
