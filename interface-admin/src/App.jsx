import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import AdminSignup from "./components/admin/AdminSignup";
import AdminSignin from "./components/admin/AdminSignin";
import AdminAppbar from "./components/admin/AdminAppbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEditcourse from "./components/admin/AdminEditcourse";
import AdminAddcourse from "./components/admin/AdminAddcourse";
import { adminState } from "./store/atoms/admin.js";
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
function App() {

  return (
    <Router>
      <AdminAppbar></AdminAppbar>
      <InitUser></InitUser>
      <Routes>
        <Route path="/addcourse" element={<AdminAddcourse />} />
        <Route path="/courses" element={<AdminDashboard />} />
        <Route path="/editcourse" element={<AdminEditcourse />} />
        <Route path="/signin" element={<AdminSignin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/adminappbar" element={<AdminAppbar />} />
      </Routes>
    </Router>
  );
}

function InitUser() {
  const setAdmin = useSetRecoilState(adminState);
  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken")
        }
      });
      if (response.data.username) {
        setAdmin({
          isLoading: false,
          adminEmail: response.data.username
        })
      } else {
        setAdmin({
          isLoading: false,
          adminEmail: null
        })
      }
    } catch (e) {
      setAdmin({
        isLoading: false,
        adminEmail: null
      })
    }
  }
  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App;
