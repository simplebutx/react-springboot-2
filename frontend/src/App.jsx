import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./shared/pages/Home";
import Health from "./shared/pages/Health";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import MyPage from "./features/auth/pages/Mypage";
import Navbar from "./shared/components/Navbar";
import AdminDashboard from "./features/admin/pages/AdminDashboard";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
      
        <Route path="/api/health" element={<Health />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

   
    </>
  )
}

export default App
