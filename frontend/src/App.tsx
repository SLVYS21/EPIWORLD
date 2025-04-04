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

        {/* Protected Routes (Wrapped in Layout) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
