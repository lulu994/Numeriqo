import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PracticeMode from './components/PracticeMode';
import ProfileSettings from './components/ProfileSettings';
import ProgressTracker from './components/ProgressTracker';

const App = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Sidebar />
      <main className="flex-1 pt-16 px-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/practice" element={<PracticeMode />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/progress" element={<ProgressTracker />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
