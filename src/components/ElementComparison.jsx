import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Atom3D from './Atom3D';
import { elements, categoryColors, categoryNames } from '../data/elements';
import { useLanguage } from '../contexts/LanguageContext';

const ElementComparison = ({ onClose }) => {
  const [selectedElement1, setSelectedElement1] = useState(null);
  const [selectedElement2, setSelectedElement2] = useState(null);
  const { t, language } = useLanguage();

  const getGridPosition = (element) => {
    if (element.atomic_number >= 57 && element.atomic_number <= 71) { // Lanthanides
      return { gridColumn: (element.atomic_number - 57) + 4, gridRow: 9 };
    }
    if (element.atomic_number >= 89 && element.atomic_number <= 103) { // Actinides
      return { gridColumn: (element.atomic_number - 89) + 4, gridRow: 10 };
    }
    return {
      gridColumn: element.group,
      gridRow: element.period
    };
  };

  const handleElementClick = (element) => {
    if (!selectedElement1) {
      setSelectedElement1(element);
    } else if (!selectedElement2) {
      setSelectedElement2(element);
    }
  };

  const swapElements = () => {
    const temp = selectedElement1;
    setSelectedElement1(selectedElement2);
    setSelectedElement2(temp);
  };

  const PropertyRow = ({ label, value1, value2, unit = '' }) => {
    const isDifferent = value1 !== value2;
    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-primary/10">
        <div className="text-gray-400 font-medium">{label}</div>
        <div className={`text-center ${isDifferent ? 'text-neon-yellow' : 'text-white'}`}>
          {value1}{unit}
        </div>
        <div className={`text-center ${isDifferent ? 'text-neon-yellow' : 'text-white'}`}>
          {value2}{unit}
        </div>
      </div>
    );
  };

  // Determine which elements to show (highlight selected ones)
  const getElementClassName = (element) => {
    let baseClass = `element-card ${categoryColors[element.category]} cursor-pointer`;
    
    if (selectedElement1 && selectedElement1.atomic_number === element.atomic_number) {
      baseClass += ' ring-4 ring-neon-yellow ring-offset-2 ring-offset-surface';
    }
    if (selectedElement2 && selectedElement2.atomic_number === element.atomic_number) {
      baseClass += ' ring-4 ring-neon-blue ring-offset-2 ring-offset-surface';
    }
    
    return baseClass;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-custom" />
        
        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[95vw] max-h-[90vh] overflow-y-auto bg-surface rounded-2xl border border-primary/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 hover:bg-surface border border-primary/30 hover:border-primary/50 transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="p-6">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl font-bold text-gradient mb-2">
                {!selectedElement1 
                  ? t('selectFirstElement')
                  : !selectedElement2 
                    ? t('selectSecondElement')
                    : t('compareElements')}
              </h2>
              {selectedElement1 && !selectedElement2 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${categoryColors[selectedElement1.category]} flex items-center justify-center text-xl font-bold text-white shadow-glow`}>
                    {selectedElement1.symbol}
                  </div>
                  <p className="text-gray-300">
                    {language === 'no' ? selectedElement1.name_norwegian : selectedElement1.name_english} {t('selected')}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Show periodic table if not both selected */}
            {(!selectedElement1 || !selectedElement2) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="max-w-full overflow-x-auto">
                  <div 
                    className="grid gap-0.5 mx-auto"
                    style={{
                      gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))',
                      gridTemplateRows: 'repeat(10, minmax(40px, 1fr))',
                      minWidth: 'max-content'
                    }}
                  >
                    {elements.map((element) => (
                      <motion.div
                        key={element.atomic_number}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={getGridPosition(element)}
                        className={getElementClassName(element)}
                        onClick={() => handleElementClick(element)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-xs text-gray-400 text-left leading-none">{element.atomic_number}</div>
                        <div className="text-base font-bold text-center leading-none">{element.symbol}</div>
                        <div className="text-xs text-center text-gray-300 leading-none">
                          {language === 'no' ? element.name_norwegian : element.name_english}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comparison Table */}
            {selectedElement1 && selectedElement2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Selected Elements Summary */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-surface/50 rounded-xl p-4 border border-primary/20 text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${categoryColors[selectedElement1.category]} flex items-center justify-center text-3xl font-bold text-white shadow-glow`}>
                      {selectedElement1.symbol}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {language === 'no' ? selectedElement1.name_norwegian : selectedElement1.name_english}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {categoryNames[selectedElement1.category]}
                    </p>
                    <button
                      onClick={() => setSelectedElement1(null)}
                      className="mt-2 text-sm text-primary hover:text-primary/80"
                    >
                      {t('change')}
                    </button>
                  </div>
                  
                  {/* Swap button */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.button
                      onClick={swapElements}
                      className="p-3 rounded-full bg-primary/20 border border-primary/50 hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </motion.button>
                  </div>

                  <div className="bg-surface/50 rounded-xl p-4 border border-primary/20 text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${categoryColors[selectedElement2.category]} flex items-center justify-center text-3xl font-bold text-white shadow-glow`}>
                      {selectedElement2.symbol}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {language === 'no' ? selectedElement2.name_norwegian : selectedElement2.name_english}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {categoryNames[selectedElement2.category]}
                    </p>
                    <button
                      onClick={() => setSelectedElement2(null)}
                      className="mt-2 text-sm text-primary hover:text-primary/80"
                    >
                      {t('change')}
                    </button>
                  </div>
                </div>

                {/* 3D Models */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-surface/50 rounded-xl p-4 border border-primary/20">
                    <h3 className="text-lg font-semibold text-center mb-4 text-white">
                      {language === 'no' ? selectedElement1.name_norwegian : selectedElement1.name_english}
                    </h3>
                    <div className="h-64 bg-background/30 rounded-lg overflow-hidden">
                      <Atom3D 
                        protons={selectedElement1.protons}
                        neutrons={selectedElement1.neutrons}
                        electrons={selectedElement1.electrons}
                      />
                    </div>
                  </div>
                  <div className="bg-surface/50 rounded-xl p-4 border border-primary/20">
                    <h3 className="text-lg font-semibold text-center mb-4 text-white">
                      {language === 'no' ? selectedElement2.name_norwegian : selectedElement2.name_english}
                    </h3>
                    <div className="h-64 bg-background/30 rounded-lg overflow-hidden">
                      <Atom3D 
                        protons={selectedElement2.protons}
                        neutrons={selectedElement2.neutrons}
                        electrons={selectedElement2.electrons}
                      />
                    </div>
                  </div>
                </div>

                {/* Properties Comparison */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-6 text-center text-gradient">
                    {t('properties')}
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 pb-2 border-b border-primary/20 font-bold text-gray-300">
                      <div>Egenskap</div>
                      <div className="text-center">{selectedElement1.symbol}</div>
                      <div className="text-center">{selectedElement2.symbol}</div>
                    </div>
                    <PropertyRow 
                      label="Atomnummer" 
                      value1={selectedElement1.atomic_number} 
                      value2={selectedElement2.atomic_number} 
                    />
                    <PropertyRow 
                      label="Atommasse" 
                      value1={selectedElement1.atomic_mass} 
                      value2={selectedElement2.atomic_mass} 
                      unit=" u"
                    />
                    <PropertyRow 
                      label="Protoner" 
                      value1={selectedElement1.protons} 
                      value2={selectedElement2.protons} 
                    />
                    <PropertyRow 
                      label="Nøytroner" 
                      value1={selectedElement1.neutrons} 
                      value2={selectedElement2.neutrons} 
                    />
                    <PropertyRow 
                      label="Elektroner" 
                      value1={selectedElement1.electrons} 
                      value2={selectedElement2.electrons} 
                    />
                    <PropertyRow 
                      label="Periode" 
                      value1={selectedElement1.period} 
                      value2={selectedElement2.period} 
                    />
                    <PropertyRow 
                      label="Gruppe" 
                      value1={selectedElement1.group} 
                      value2={selectedElement2.group} 
                    />
                    <PropertyRow 
                      label="Kategori" 
                      value1={categoryNames[selectedElement1.category]} 
                      value2={categoryNames[selectedElement2.category]} 
                    />
                    {selectedElement1.melting_point && selectedElement2.melting_point && (
                      <PropertyRow 
                        label="Smeltepunkt" 
                        value1={selectedElement1.melting_point} 
                        value2={selectedElement2.melting_point} 
                        unit="°C"
                      />
                    )}
                    {selectedElement1.boiling_point && selectedElement2.boiling_point && (
                      <PropertyRow 
                        label="Kokepunkt" 
                        value1={selectedElement1.boiling_point} 
                        value2={selectedElement2.boiling_point} 
                        unit="°C"
                      />
                    )}
                    {selectedElement1.density && selectedElement2.density && (
                      <PropertyRow 
                        label="Tetthet" 
                        value1={selectedElement1.density} 
                        value2={selectedElement2.density} 
                        unit=" g/cm³"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ElementComparison;
