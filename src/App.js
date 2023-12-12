import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import User from "./Components/User";

import ViewTasks from "./Components/ViewTasks";
import Addusers from "./Components/Addusers";
import Addtask from "./Components/Addtask";
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {" "}
        {/* Wrap Routes around Route components */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/Viewtasks" element={<ViewTasks />} />
        <Route path="/Addusers" element={<Addusers />} />
        <Route path="/Addtask" element={<Addtask />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
