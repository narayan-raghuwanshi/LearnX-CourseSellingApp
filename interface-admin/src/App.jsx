import AdminSignup from "./components/admin/AdminSignup";
import AdminSignin from "./components/admin/AdminSignin";
import AdminAppbar from "./components/admin/AdminAppbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEditcourse from "./components/admin/AdminEditcourse";
import AdminAddcourse from "./components/admin/AdminAddcourse";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { createContext, useEffect, useState } from 'react';
export const AdminAppbarContext = createContext()
function App() {
  const [isAdminAppbarVisible, setIsAdminAppbarVisible] = useState(true);
  return (
    <AdminAppbarContext.Provider value={{ isAdminAppbarVisible, setIsAdminAppbarVisible }}>
        <Router>
          {isAdminAppbarVisible && <AdminAppbar />}
          <Routes>
            <Route path="/addcourse" element={<AdminAddcourse />} />
            <Route path="/courses" element={<AdminDashboard />} />
            <Route path="/courses/editcourse/:courseId" element={<AdminEditcourse />} />
            <Route path="/signin" element={<AdminSignin />} />
            <Route path="/signup" element={<AdminSignup />} />
            <Route path="/adminappbar" element={<AdminAppbar />} />
          </Routes>
        </Router>
    </AdminAppbarContext.Provider>
  );
}

export default App;
