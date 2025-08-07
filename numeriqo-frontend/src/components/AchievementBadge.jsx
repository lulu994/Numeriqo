import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, Zap, Crown } from 'lucide-react';

const AchievementBadge = ({ achievement, size = 'md', showDetails = true, className = '' }) => {
  const getBadgeIcon = (type) => {
    const iconMap = {
      streak: Zap,
      completion: Trophy,
      mastery: Crown,
      progress: Target,
      excellence: Star,
      default: Award
    };
    return iconMap[type] || iconMap.default;
  };

  const getSizeClasses = (size) => {
    const sizeMap = {
      sm: 'w-12 h-12 text-xs',
      md: 'w-16 h-16 text-sm',
      lg: 'w-20 h-20 text-base',
      xl: 'w-24 h-24 text-lg'
    };
    return sizeMap[size] || sizeMap.md;
  };

  const getBadgeColor = (rarity) => {
    const colorMap = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-yellow-600'
    };
    return colorMap[rarity] || colorMap.common;
  };

  const IconComponent = getBadgeIcon(achievement.type);
  const sizeClasses = getSizeClasses(size);
  const gradientClasses = getBadgeColor(achievement.rarity);

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`relative ${sizeClasses} flex items-center justify-center rounded-full bg-gradient-to-br ${gradientClasses} shadow-lg`}>
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <IconComponent className="w-1/2 h-1/2 text-white drop-shadow-sm" />
        {achievement.isNew && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
      
      {showDetails && (
        <div className="mt-2 text-center">
          <h4 className="font-semibold text-gray-800 text-sm">{achievement.name}</h4>
          {achievement.description && (
            <p className="text-xs text-gray-600 mt-1 max-w-24">{achievement.description}</p>
          )}
          {achievement.earnedAt && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(achievement.earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
