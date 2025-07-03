import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './pages/About';
import AiChat from './pages/AiChat';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from './pages/Dashboard';
import DataVisualization from './pages/DataVisualization';
import NewsFeed from './pages/NewsFeed';
import ProjectManager from './pages/ProjectManager';
import RecipeFinder from './pages/RecipeFinder';
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/projects" element={<ProjectManager />} />
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/data-visualization" element={<DataVisualization />} />
        <Route path="/recipes" element={<RecipeFinder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    
  );
}

export default App;
