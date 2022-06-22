import { Navigate, Route, Routes } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Approved from "./pages/Approved";
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
        <Route path="/home" element={<Home />} />
        <Route path="/approved-appointments" element={<Approved />} />
        <Route path="/users" element={<Users />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>
    </Routes>
  );
}

export default App;
