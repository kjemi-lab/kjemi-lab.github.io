import React from 'react';
import { motion } from 'framer-motion';
import { Atom } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Hjem' },
    { id: 'periodic-table', label: 'Periodisk Tabell' },
    { id: 'element-builder', label: 'Grunnstoff-bygger' },
    { id: 'molecule-builder', label: 'Molecule Builder' }
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
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
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
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
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
