import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import PeriodicTable from './components/PeriodicTable';
import ElementBuilder from './components/ElementBuilder';

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
      default:
        return <Home onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="App">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;
