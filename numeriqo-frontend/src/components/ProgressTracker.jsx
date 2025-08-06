import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target } from 'lucide-react';

const ProgressTracker = () => {
  const achievements = [
    { icon: Trophy, title: 'Problem Solver', description: 'Solved 100 problems', earned: true },
    { icon: Star, title: 'Quick Learner', description: 'Completed 5 lessons in a day', earned: true },
    { icon: Zap, title: 'Speed Demon', description: 'Solved 10 problems in 5 minutes', earned: false },
    { icon: Target, title: 'Accuracy Master', description: '95% accuracy for a week', earned: false }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 3, total: 5 },
    { day: 'Tue', completed: 5, total: 5 },
    { day: 'Wed', completed: 2, total: 4 },
    { day: 'Thu', completed: 4, total: 6 },
    { day: 'Fri', completed: 3, total: 3 },
    { day: 'Sat', completed: 1, total: 2 },
    { day: 'Sun', completed: 0, total: 3 }
  ];

  const subjects = [
    { name: 'Algebra', progress: 85, color: 'bg-blue-500' },
    { name: 'Geometry', progress: 65, color: 'bg-green-500' },
    { name: 'Calculus', progress: 40, color: 'bg-purple-500' },
    { name: 'Statistics', progress: 25, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
      >
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
          Weekly Activity
        </h3>
        <div className="flex items-end justify-between space-x-2 h-32">
          {weeklyProgress.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center space-y-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.completed / Math.max(...weeklyProgress.map(d => d.total))) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t w-6 min-h-[4px]"
              />
              <span className="text-xs text-gray-500 font-medium">{day.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
      >
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
          Subject Progress
        </h3>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={subject.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                <span className="text-sm text-gray-500">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`${subject.color} h-2 rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-purple-100"
      >
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
          Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map(({ icon: Icon, title, description, earned }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border-2 transition-all ${
                earned
                  ? 'border-purple-200 bg-purple-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <Icon className={`h-6 w-6 mb-2 ${
                earned ? 'text-purple-600' : 'text-gray-400'
              }`} />
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
              <p className="text-xs text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
