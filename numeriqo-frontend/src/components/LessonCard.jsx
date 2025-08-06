import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, BarChart3 } from 'lucide-react';

const LessonCard = ({ lesson }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-blue-600';
      case 'Advanced': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1">
            {lesson.title}
          </h3>
          <p className={`text-sm font-medium ${getLevelColor(lesson.level)}`}>
            {lesson.level}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
        >
          <Play className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{lesson.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${lesson.progress}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{lesson.duration}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">Level {lesson.level}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
          {lesson.difficulty}
        </span>
      </div>
    </motion.div>
  );
};

export default LessonCard;
