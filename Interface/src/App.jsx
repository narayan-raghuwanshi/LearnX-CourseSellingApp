import AdminSignup from "./AdminSignup";
import AdminSignin from "./AdminSignin";
import AdminAppbar from "./AdminAppbar";
import AdminDashboard from "./AdminDashboard";
import AdminEditcourse from "./AdminEditcourse";
import AdminAddcourse from "./AdminAddcourse";
import UserSignup from "./UserSignup";
import UserSignin from "./UserSignin";
import UserPurchasedCourses from "./UserPurchasedCourses";
import UserAllCourses from "./UserAllCourses";
import UserAppbar from "./UserAppbar";
import Course from "./Course";
import CourseContent from "./CourseContent";
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
