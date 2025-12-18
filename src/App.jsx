import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import PeriodicTable from './components/PeriodicTable';
import ElementBuilder from './components/ElementBuilder';
import MoleculeBuilder from './components/MoleculeBuilder';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onTabChange={setActiveTab} />;
      case 'periodic-table':
        return <PeriodicTable />;
      case 'element-builder':
        return <ElementBuilder />;
      case 'molecule-builder':
        return <MoleculeBuilder />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-grow">
        {renderContent()}
      </div>
      {/* Footer with creator credit */}
      <footer className="mt-auto py-6 px-6 border-t border-primary/20 bg-surface/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-gray-500 text-sm">©</span>
            <motion.span 
              className="text-gray-300 font-medium tracking-wide hover:text-primary transition-colors duration-300 cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              L.Berry
            </motion.span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
