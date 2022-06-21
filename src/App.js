import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      {/* Login  */}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
