import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import CareerExplorer from './pages/CareerExplorer';
import CollegeDirectory from './pages/CollegeDirectory';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { User } from './lib/sampleData';

const queryClient = new QueryClient();

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} />} />
            <Route path="/assessment" element={<Assessment currentUser={currentUser} />} />
            <Route path="/careers" element={<CareerExplorer currentUser={currentUser} />} />
            <Route path="/colleges" element={<CollegeDirectory currentUser={currentUser} />} />
            <Route path="/timeline" element={<Timeline currentUser={currentUser} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} onLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;