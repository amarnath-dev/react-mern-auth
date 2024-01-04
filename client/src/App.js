import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import AdminHomePage from "./Components/AdminHome/AdminHomePage";
import AdminEditPage from "./Components/AdminEdit/AdminEditPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register role={"user"} />} />
          <Route path="/admin/new-user" element={<Register role={"admin"} />} />
          <Route path="/login" element={<Login role={"user"} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<Login role={"admin"} />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/edit" element={<AdminEditPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
