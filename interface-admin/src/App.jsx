import AdminSignup from "./components/admin/AdminSignup";
import AdminSignin from "./components/admin/AdminSignin";
import AdminAppbar from "./components/admin/AdminAppbar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEditcourse from "./components/admin/AdminEditcourse";
import AdminAddcourse from "./components/admin/AdminAddcourse";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <AdminAppbar />
      <Routes>
        <Route path="/addcourse" element={<AdminAddcourse />} />
        <Route path="/courses" element={<AdminDashboard />} />
        <Route path="/courses/editcourse/:courseId" element={<AdminEditcourse />} />
        <Route path="/signin" element={<AdminSignin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/adminappbar" element={<AdminAppbar />} />
      </Routes>
    </Router>
  );
}

export default App;
