import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Globe, Shield, BookOpen, Award, Palette } from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    achievementAlerts: true,
    progressReports: false,
    newContent: true
  });
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'italian', name: 'Italiano', flag: '🇮🇹' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'chinese', name: '中文', flag: '🇨🇳' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵' }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', earned: true, date: '2024-01-15' },
    { title: 'Problem Solver', description: 'Solved 100 math problems', earned: true, date: '2024-01-20' },
    { title: 'Streak Master', description: '7-day learning streak', earned: true, date: '2024-01-25' },
    { title: 'Speed Demon', description: 'Solved 10 problems in under 5 minutes', earned: false, date: null },
    { title: 'Perfectionist', description: '100% accuracy for a week', earned: false, date: null },
    { title: 'Knowledge Seeker', description: 'Completed 50 lessons', earned: false, date: null }
  ];

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            S
          </div>
          <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <h2 className="font-heading text-xl font-semibold text-gray-900 mt-4">Sarah Johnson</h2>
        <p className="text-gray-600">Grade 10 Student</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">2,450</div>
          <div className="text-sm text-purple-700">Total Points</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">7</div>
          <div className="text-sm text-green-700">Day Streak</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">45</div>
          <div className="text-sm text-blue-700">Lessons Done</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">89%</div>
          <div className="text-sm text-orange-700">Accuracy</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            defaultValue="Sarah Johnson"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="sarah.johnson@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="elementary">Elementary (K-5)</option>
            <option value="middle">Middle School (6-8)</option>
            <option value="high" selected>High School (9-12)</option>
            <option value="university">University</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Language
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                language === lang.code
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-gray-900">{lang.name}</span>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Theme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === 'light'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="w-full h-12 bg-white rounded border mb-2"></div>
            <span className="text-sm font-medium">Light</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="w-full h-12 bg-gray-800 rounded border mb-2"></div>
            <span className="text-sm font-medium">Dark</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Learning Preferences
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Show hints automatically</span>
            <button className="w-12 h-6 bg-purple-500 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable sound effects</span>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Adaptive difficulty</span>
            <button className="w-12 h-6 bg-purple-500 rounded-full relative transition-colors">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => {
            const labels = {
              dailyReminders: 'Daily study reminders',
              achievementAlerts: 'Achievement notifications',
              progressReports: 'Weekly progress reports',
              newContent: 'New content alerts'
            };
            
            return (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <span className="text-gray-900 font-medium">{labels[key]}</span>
                  <p className="text-sm text-gray-500">Get notified about your learning progress</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle(key)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    value ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    value ? 'right-0.5' : 'left-0.5'
                  }`}></div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">Quiet Hours</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Your Achievements</h3>
        <p className="text-gray-600">Keep learning to unlock more badges!</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 transition-all ${
              achievement.earned
                ? 'border-purple-200 bg-purple-50'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.earned ? 'bg-purple-500' : 'bg-gray-400'
              }`}>
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                {achievement.earned && achievement.date && (
                  <p className="text-xs text-purple-600 font-medium">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
                {!achievement.earned && (
                  <p className="text-xs text-gray-500">Not yet earned</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'preferences': return renderPreferencesTab();
      case 'notifications': return renderNotificationsTab();
      case 'achievements': return renderAchievementsTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h1 className="font-heading text-2xl font-bold text-white">Settings & Profile</h1>
          <p className="text-purple-100 mt-1">Customize your learning experience</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 bg-gray-50 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
