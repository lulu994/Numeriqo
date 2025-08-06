import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ remove BrowserRouter
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PracticeMode from './components/PracticeMode';
import ProfileSettings from './components/ProfileSettings';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

