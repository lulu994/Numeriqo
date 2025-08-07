import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Home, BookOpen, User, Menu, X } from 'lucide-react';

const NavItem = ({ path, icon: Icon, label, isActive, onClick, isFirst }) => (
  <Link
    to={path}
    onClick={onClick}
    id={isFirst ? 'first-nav-item' : undefined}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
    }`}
    tabIndex={isFirst ? 0 : -1}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { path: '/', icon: Home, label: 'Dashboard' },
      { path: '/practice', icon: BookOpen, label: 'Practice' },
      { path: '/profile', icon: User, label: 'Profile' }
    ],
    []
  );

  const isActive = (path) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(`${path}/`));

  // Prevent body scroll & close on route change
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const focusableElements = document.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-primary/10 z-50 shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-xl text-gray-900">
              Numeriqo
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                {...item}
                isActive={isActive(item.path)}
                onClick={() => {}}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-down Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-primary/10 shadow-sm overflow-hidden relative z-10"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item, index) => (
                  <NavItem
                    key={item.path}
                    {...item}
                    isActive={isActive(item.path)}
                    onClick={() => setIsOpen(false)}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
