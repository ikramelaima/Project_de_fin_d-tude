import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Import the AuthProvider
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Project from "./pages/Project/Project";
import Documents from "./pages/Doc/Documents";
import Login from "./components/Login/Login";
import Userprofile from "./Userpages/Userprofile/Userprofile";
import Userhome from "./Userpages/Userhome/Userhome";
import Tasks from "./Userpages/Tasks/Tasks";
import Documentsuser from "./Userpages/Documents/Documentsuser";
import StepsTable from "./components/StepsTable/StepsTable"
import Notification from "./Userpages/Notification/Notification";
import Register from "./components/Register/Register";
import Noti from "./pages/Noti/Noti";
import Setting from "./pages/Setting/Setting";
import Profil from "./pages/Profil/Profil";
import AddStepForm from "./pages/Project/AddStepForm";
import Messagerie from "./pages/Messagerie/Messagerie";
import Newproject from "./pages/Newproject/Newproject";
import Tache from "./pages/Taches/tache";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider> 
        <Router>
          <Routes>
            {/* Public routes */}
          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin routes */}
            <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path="single/:id" element={<Single />} />
            </Route>
            <Route path="new" element={<New />} />
              <Route path="/projects">
                <Route index element={<Project />} />
                <Route path="addproject" element={<Newproject />} />
                <Route path=":projectId" element={<Project />} />
                <Route path=":projectId/:stepId" element={<AddStepForm />} />
                <Route path=":projectId/:stepId/Tache" element={<Tache />} />
              </Route>
              <Route path="documents" element={<Documents />} />
              <Route path="profil" element={<Profil />} />
              <Route path="settings" element={<Setting />} />
            </Route>

            {/* User routes */}
            <Route path="/user/:useId">
              <Route index element={<Userhome />} />
              <Route path="profil" element={<Userprofile />} />
              <Route path="Tasks" element={<Tasks />} />
              <Route path="Documents" element={<Documentsuser />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;