import UserSignup from "./components/user/UserSignup";
import UserSignin from "./components/user/UserSignin";
import UserPurchasedCourses from "./components/user/UserPurchasedCourses";
import UserAllCourses from "./components/user/UserAllCourses";
import UserAppbar from "./components/user/UserAppbar";
import Course from "./components/user/Course";
import CourseContent from "./components/user/CourseContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {userState} from "../src/store/atoms/user.js"
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
function App() {
  return (
    <Router>
      <UserAppbar />
      <InitUser></InitUser>
      <Routes>
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/usersignin" element={<UserSignin />} />
        <Route path="/userpurchasedcourses" element={<UserPurchasedCourses />} />
        <Route path="/userallcourses" element={<UserAllCourses />} />
        <Route path="/userappbar" element={<UserAppbar />} />
        <Route path="/coursecontent/:courseId" element={<CourseContent />} />
      </Routes>
    </Router>
  );
}

function InitUser(){
  const setUser = useSetRecoilState(userState);
  const init = async()=>{
    try{
      const response = await axios.get("http://localhost:3000/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      });
      if(response.data.username){
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }else{
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    }catch(e){
      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  }
  useEffect(() => {
    init();
  }, [])
  return <></>
}

export default App;
