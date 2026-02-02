import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./shared/pages/Home";
import Health from "./shared/pages/Health";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import MyPage from "./features/auth/pages/Mypage";
import Navbar from "./shared/components/Navbar";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import PostCreatePage from "./features/posts/pages/PostCreatePage";
import PostListPage from "./features/posts/pages/PostListPage";
import PostDetailPage from "./features/posts/pages/PostDetailPage";
import PostEditPage from "./features/posts/pages/PostEditPage";

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
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/new" element={<PostCreatePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>

   
    </>
  )
}

export default App
