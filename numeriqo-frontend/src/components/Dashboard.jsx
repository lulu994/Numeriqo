import React from 'react';
import { motion } from 'framer-motion';
import LessonCard from './LessonCard';
import ProgressTracker from './ProgressTracker';
import { TrendingUp, Award, Clock, Target } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: TrendingUp, label: 'Learning Streak', value: '7 days', color: 'text-green-600' },
    { icon: Award, label: 'Points Earned', value: '2,450', color: 'text-purple-600' },
    { icon: Clock, label: 'Time Studied', value: '12h 30m', color: 'text-blue-600' },
    { icon: Target, label: 'Goals Met', value: '8/10', color: 'text-orange-600' }
  ];

  const lessons = [
    {
      id: 1,
      title: 'Algebra Basics',
      level: 'Beginner',
      progress: 75,
      duration: '15 min',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Quadratic Equations',
      level: 'Intermediate',
      progress: 45,
      duration: '25 min',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Calculus Introduction',
      level: 'Advanced',
      progress: 20,
      duration: '35 min',
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Sarah! 👋
          </h1>
          <p className="text-gray-600 font-body">
            Ready to continue your math journey? Let's make today count!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ icon: Icon, label, value, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <Icon className={`h-8 w-8 ${color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
              Continue Learning
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <LessonCard lesson={lesson} />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
              Your Progress
            </h2>
            <ProgressTracker />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
