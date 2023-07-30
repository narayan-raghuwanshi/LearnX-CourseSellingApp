import AdminSignup from "./components/admin/AdminSignup";
import AdminSignin from "./components/admin/AdminSignin";
import AdminAppbar from "./components/admin/AdminAppbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEditcourse from "./components/admin/AdminEditcourse";
import AdminAddcourse from "./components/admin/AdminAddcourse";
import UserSignup from "./components/user/UserSignup";
import UserSignin from "./components/user/UserSignin";
import UserPurchasedCourses from "./components/user/UserPurchasedCourses";
import UserAllCourses from "./components/user/UserAllCourses";
import UserAppbar from "./components/user/UserAppbar";
import Course from "./components/user/Course";
import CourseContent from "./components/user/CourseContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { createContext, useEffect, useState } from 'react';
export const AdminAppbarContext = createContext();
export const UserAppbarContext = createContext();
function App() {
  const [isAdminAppbarVisible, setIsAdminAppbarVisible] = useState(true);
  const [isUserAppbarVisible, setIsUserAppbarVisible] = useState(false);
  return (
    <AdminAppbarContext.Provider value={{ isAdminAppbarVisible, setIsAdminAppbarVisible }}>
      <UserAppbarContext.Provider value={{ isUserAppbarVisible, setIsUserAppbarVisible }}>
        <Router>
          {isAdminAppbarVisible && <AdminAppbar />}
          {isUserAppbarVisible && <UserAppbar />}
          <Routes>
            {/* ADMIN */}
            <Route path="/addcourse" element={<AdminAddcourse />} />
            <Route path="/courses" element={<AdminDashboard />} />
            <Route path="/courses/editcourse/:courseId" element={<AdminEditcourse />} />
            <Route path="/signin" element={<AdminSignin />} />
            <Route path="/signup" element={<AdminSignup />} />
            <Route path="/adminappbar" element={<AdminAppbar />} />
            {/* USER */}
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/usersignup" element={<UserSignup />} />
            <Route path="/usersignin" element={<UserSignin />} />
            <Route path="/userpurchasedcourses" element={<UserPurchasedCourses />} />
            <Route path="/userallcourses" element={<UserAllCourses />} />
            <Route path="/userappbar" element={<UserAppbar />} />
            <Route path="/coursecontent/:courseId" element={<CourseContent />} />
          </Routes>
        </Router>
      </UserAppbarContext.Provider>
    </AdminAppbarContext.Provider>
  );
}

export default App;
