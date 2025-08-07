import React from 'react';
import { motion } from 'framer-motion';

const skeletonVariants = {
  animate: { 
    opacity: [0.3, 0.6, 0.3],
    transition: { 
      repeat: Infinity, 
      duration: 1.5 
    } 
  }
};

const SkeletonBox = ({ className }) => (
  <motion.div
    variants={skeletonVariants}
    animate="animate"
    className={`bg-gray-200 rounded ${className}`}
  />
);

const DashboardLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <SkeletonBox className="h-8 w-1/3" />
        <SkeletonBox className="h-4 w-2/3" />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <SkeletonBox key={i} className="h-24 w-full" />
        ))}
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonBox key={i} className="h-20 w-full" />
          ))}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <SkeletonBox className="h-40 w-full" />
          <SkeletonBox className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
