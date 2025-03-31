import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LostAndFound from "./pages/LostAndFound/LostAndFound";
import Forum from "./pages/Forum/Forum";
import Canteen from "./pages/Canteen/Canteen";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lost-and-found" element={<LostAndFound />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/canteen" element={<Canteen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
