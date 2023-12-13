import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import User from "./Components/User";

import ViewTasks from "./Components/ViewTasks";
import Addusers from "./Components/Addusers";
import Addtask from "./Components/Addtask";
import ProfilePage from "./Components/ProfilePage";
import CombinedDrawer from "./Components/CombinedDrawer";
import AccountProfile from "./Components/AccountProfile";
import Account from "./Components/Account/Account";
import NotFoundComponent from "./Components/NotFoundComponent";

function App() {
  const routes = [
    { path: "/admin", title: "View All Resource Tasks", element: <Admin /> },
    { path: "/user", title: "User", element: <User /> },
    { path: "/Viewtasks", title: "View Tasks", element: <ViewTasks /> },
    { path: "/addusers", title: "Add Users", element: <Addusers /> },
    { path: "/Addtask", title: "Add Task", element: <Addtask /> },
    { path: "/ProfilePage", title: "Profile Page", element: <ProfilePage /> },

    {
      path: "/AccountProfile",
      title: "Account Profile",
      element: <AccountProfile />,
    },
    { path: "/Account", title: "Account", element: <Account /> },
    { path: "*", title: "Account", element: <NotFoundComponent /> },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Render your CombinedDrawer with other routes */}
        <Route
          path="/*"
          element={<CombinedDrawer Tittle={routes.title} routes={routes} />}
        />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
