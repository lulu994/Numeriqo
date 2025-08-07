import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import LessonCard from './LessonCard';
import ProgressTracker from './ProgressTracker';
import AchievementBadge from './AchievementBadge';
import DashboardLoading from './DashboardLoading';
import { TrendingUp, Award, Clock, Target } from 'lucide-react';

// Animation utilities
const prefersReducedMotion = () => 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const containerVariants = {
  hidden: prefersReducedMotion() ? {} : { opacity: 0 },
  visible: prefersReducedMotion() ? {} : {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: prefersReducedMotion() ? {} : { opacity: 0, scale: 0.95 },
  visible: prefersReducedMotion() ? {} : { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};

// StatCard Component
const StatCard = React.memo(({ icon: Icon, label, value, color, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay }}
      className="relative bg-white rounded-xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      role="status"
      aria-label={`${label}: ${value}`}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${color}`} aria-hidden="true" />
      </div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 bottom-full mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg"
        >
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-gray-800" />
        </motion.div>
      )}
    </motion.div>
  );
});

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number
};

// Main Dashboard Component
const Dashboard = ({ userName = 'Sarah', initialData }) => {
  const [isLoading, setIsLoading] = useState(!initialData);
  const [stats, setStats] = useState(initialData?.stats || []);
  const [lessons, setLessons] = useState(initialData?.lessons || []);
  const [achievements, setAchievements] = useState(initialData?.achievements || []);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return;

    const fetchData = async () => {
      try {
        // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setStats([
          { 
            icon: TrendingUp, 
            label: 'Learning Streak', 
            value: '7 days', 
            color: 'text-green-600' 
          },
          { 
            icon: Award, 
            label: 'Points Earned', 
            value: '2,450', 
            color: 'text-purple-600' 
          },
          { 
            icon: Clock, 
            label: 'Time Studied', 
            value: '12h 30m', 
            color: 'text-blue-600' 
          },
          { 
            icon: Target, 
            label: 'Goals Met', 
            value: '8/10', 
            color: 'text-orange-600' 
          }
        ]);

        setLessons([
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
        ]);

        setAchievements([
          { 
            id: 1, 
            title: '7-Day Streak', 
            description: 'You\'ve studied for 7 days in a row!', 
            icon: '🔥', 
            color: 'bg-orange-100 text-orange-700' 
          },
          { 
            id: 2, 
            title: 'Math Master', 
            description: 'Completed 10 Algebra lessons.', 
            icon: '🏆', 
            color: 'bg-yellow-100 text-yellow-700' 
          },
          { 
            id: 3, 
            title: 'Early Bird', 
            description: 'Studied before 8 AM.', 
            icon: '🌅', 
            color: 'bg-blue-100 text-blue-700' 
          }
        ]);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">Error Loading Dashboard</h3>
          <p className="text-red-700 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) return <DashboardLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-[calc(100vh-4rem)]"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p className="text-gray-600 font-body">
            Ready to continue your math journey? Let's make today count!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={`${stat.label}-${index}`}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Continue Learning
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  variants={itemVariants}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <LessonCard lesson={lesson} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Your Progress
              </h2>
              <ProgressTracker />
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {achievements.map((ach, index) => (
                  <motion.div
                    key={ach.id}
                    variants={itemVariants}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <AchievementBadge {...ach} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

Dashboard.propTypes = {
  userName: PropTypes.string,
  initialData: PropTypes.shape({
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.elementType.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      })
    ),
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
        duration: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired
      })
    ),
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      })
    )
  })
};

Dashboard.defaultProps = {
  userName: 'Sarah',
  initialData: null
};

export default React.memo(Dashboard);
