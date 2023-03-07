import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPass from "./pages/auth/ForgetPass";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPass />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
