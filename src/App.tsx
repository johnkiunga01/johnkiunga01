import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Toaster } from "@/components/ui/sonner";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple mock auth check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/dashboard/*" 
            element={isAuthenticated ? <Dashboard onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/auth" />} 
          />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;