import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calculator, TrendingUp, User, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'learning', label: 'Learning Path', icon: BookOpen, path: '/learning' },
    { id: 'solver', label: 'Problem Solver', icon: Calculator, path: '/solver' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/progress' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
    { id: 'logout', label: 'Sign Out', icon: LogOut, path: '/logout' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r border-gray-200 shadow-sm"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 flex flex-col min-h-0 pt-6">
          {/* Main Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Secondary Navigation */}
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Info Card */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-xs text-gray-500">Level 12 • 1,247 XP</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress to Level 13</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-1 transition-colors ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-400'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
