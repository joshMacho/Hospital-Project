import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AdminPage />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
