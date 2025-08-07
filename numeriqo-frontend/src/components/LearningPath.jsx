import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Play } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { learningPathData } from '../utils/mockData';

const LearningPath = () => {
  const [selectedLevel, setSelectedLevel] = useState('elementary');

  const levels = [
    { id: 'elementary', name: 'Elementary', color: 'bg-green-500' },
    { id: 'middle', name: 'Middle School', color: 'bg-blue-500' },
    { id: 'high', name: 'High School', color: 'bg-purple-500' },
    { id: 'university', name: 'University', color: 'bg-red-500' }
  ];

  return (
    <motion.div 
      className="space-y-6 pb-20 lg:pb-6"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        variants={fadeInUp}
      >
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
          Your Learning Path 🎯
        </h1>
        <p className="text-gray-600 font-body">
          Follow your personalized curriculum designed by AI to maximize your learning potential.
        </p>
      </motion.div>

      {/* Level Selector */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        variants={fadeInUp}
      >
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Select Level</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedLevel === level.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <div className={`w-3 h-3 ${level.color} rounded-full mx-auto mb-2`}></div>
              <p className="font-medium text-sm">{level.name}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Learning Modules */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">
          {levels.find(l => l.id === selectedLevel)?.name} Modules
        </h2>
        <div className="space-y-4">
          {learningPathData[selectedLevel]?.map((module, index) => (
            <motion.div
              key={module.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    module.status === 'completed' ? 'bg-green-100' :
                    module.status === 'current' ? 'bg-primary/10' :
                    'bg-gray-100'
                  }`}>
                    {module.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : module.status === 'current' ? (
                      <Play className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 font-body">{module.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        {module.lessons} lessons
                      </span>
                      <span className="text-sm text-gray-500">
                        {module.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      module.status === 'completed' ? 'text-green-600' :
                      module.status === 'current' ? 'text-primary' :
                      'text-gray-400'
                    }`}>
                      {module.progress}% Complete
                    </div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className={`h-full rounded-full ${
                          module.status === 'completed' ? 'bg-green-500' :
                          module.status === 'current' ? 'bg-primary' :
                          'bg-gray-300'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningPath;
