import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, Zap, Crown } from 'lucide-react';

// Icon mapping
const BADGE_ICONS = {
  streak: Zap,
  completion: Trophy,
  mastery: Crown,
  progress: Target,
  excellence: Star,
  default: Award
};

// Size classes for responsive badge scaling
const SIZE_CLASSES = {
  sm: 'w-12 h-12 text-xs',
  md: 'w-16 h-16 text-sm',
  lg: 'w-20 h-20 text-base',
  xl: 'w-24 h-24 text-lg'
};

// Gradient colors by rarity
const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600',
  locked: 'from-gray-300 to-gray-500 opacity-50 cursor-not-allowed'
};

// Motion animation states
const badgeVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const AchievementBadge = ({
  achievement = {},
  size = 'md',
  showDetails = true,
  className = ''
}) => {
  const IconComponent = useMemo(
    () => BADGE_ICONS[achievement.type] || BADGE_ICONS.default,
    [achievement.type]
  );

  const rarityColor = RARITY_COLORS[achievement.rarity] || RARITY_COLORS.common;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      tabIndex={0}
      role="group"
    >
      {/* Badge Circle */}
      <div
        role="img"
        aria-label={`Achievement: ${achievement.name || 'Unknown Badge'}`}
        className={`relative ${sizeClass} flex items-center justify-center rounded-full bg-gradient-to-br ${rarityColor} shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
      >
        {/* Rotating highlight overlay */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main icon */}
        <IconComponent className="w-1/2 h-1/2 text-white drop-shadow-sm" />

        {/* New indicator */}
        {achievement.isNew && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="text-white text-[8px] font-bold"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              NEW
            </motion.span>
          </motion.div>
        )}

        {/* Legendary sparkle effect */}
        {achievement.rarity === 'legendary' && (
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, Math.cos((i * 45 * Math.PI) / 180) * 20],
                  y: [0, Math.sin((i * 45 * Math.PI) / 180) * 20],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-2 text-center space-y-1">
          <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
            {achievement.name || 'Unnamed Badge'}
          </h4>
          {achievement.description && (
            <p className="text-xs text-gray-600 line-clamp-2 max-w-[6rem]">
              {achievement.description}
            </p>
          )}
          {achievement.earnedAt && (
            <p className="text-xs text-gray-500">
              {new Date(achievement.earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(AchievementBadge);
