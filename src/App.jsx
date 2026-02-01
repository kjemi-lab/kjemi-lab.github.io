import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import PeriodicTable from './components/PeriodicTable';
import ElementBuilder from './components/ElementBuilder';
import Molecules from './components/Molecules';
import ElementModal from './components/ElementModal';
import { elements } from './data/elements';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedElement, setSelectedElement] = useState(null);

  // Handle URL hash routing for sharing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#element/')) {
        const atomicNumber = parseInt(hash.split('/')[1]);
        const element = elements.find(el => el.atomic_number === atomicNumber);
        if (element) {
          setSelectedElement(element);
          setActiveTab('periodic-table');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // '/' - Focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Søk"], input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      }

      // 'Esc' - Close modals
      if (e.key === 'Escape') {
        setSelectedElement(null);
      }

      // '1' - Home
      if (e.key === '1' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setActiveTab('home');
      }

      // '2' - Periodic Table
      if (e.key === '2' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setActiveTab('periodic-table');
      }

      // '3' - Element Builder
      if (e.key === '3' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setActiveTab('element-builder');
      }

      // '4' - Molecules
      if (e.key === '4' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setActiveTab('molecules');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onTabChange={setActiveTab} />;
      case 'periodic-table':
        return <PeriodicTable onElementSelect={setSelectedElement} />;
      case 'element-builder':
        return <ElementBuilder />;
      case 'molecules':
        return <Molecules />;
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App flex flex-col min-h-screen">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-grow">
            {renderContent()}
          </div>
          {/* Element Modal from URL */}
          {selectedElement && (
            <ElementModal
              element={selectedElement}
              onClose={() => {
                setSelectedElement(null);
                window.history.replaceState(null, '', window.location.pathname);
              }}
            />
          )}
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
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
