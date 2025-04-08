import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import LandingPage from "./pages/Home";
import AuthPage from "./pages/authPage";
import CantineApp from "./pages/CantineApp";
import ChannelSelection from "./pages/ChannelSelection";
import UserDashboard from "./pages/userDashboard";
import Index from "./pages/Index";
import IndexDashboard from "./pages/IndexDashboard";
import NotFound from "./pages/NotFound";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import CafeteriaAdmin from "./pages/admin/Cafeteria";
import LostFoundAdmin from "./pages/admin/LostFound";
import ForumAdmin from "./pages/admin/Forum";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cantine" element={<CantineApp />} />
        <Route path="/channel" element={<ChannelSelection />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/stackoverflow" element={<Index />} />

        <Route path="/admin/index" element={<IndexDashboard />} />

         {/* Admin Routes */}
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/admin/cafeteria" element={<CafeteriaAdmin />} />
          {/* 
          <Route path="/admin/lost-found" element={<LostFoundAdmin />} />
          <Route path="/admin/forum" element={<ForumAdmin />} /> */}
      

        {/* Protected Routes (Wrapped in Layout) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
