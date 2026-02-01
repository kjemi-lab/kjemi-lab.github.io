import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation = ({ activeTab, onTabChange }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', labelKey: 'home' },
    { id: 'periodic-table', labelKey: 'periodicTable' },
    { id: 'element-builder', labelKey: 'elementBuilder' },
    { id: 'molecule-builder', labelKey: 'moleculeBuilder' }
  ];

  return (
    <nav className="bg-surface/80 backdrop-blur-custom border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onTabChange('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Atom className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gradient">Kjemi Lab</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-baseline space-x-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-gray-300 hover:text-white hover:bg-surface/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(tab.labelKey)}
                </motion.button>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-surface/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-gray-300 hover:text-white hover:bg-surface/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(tab.labelKey)}
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-300 hover:text-white"
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
