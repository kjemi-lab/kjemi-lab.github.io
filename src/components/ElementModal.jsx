import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Zap, Thermometer, Scale } from 'lucide-react';
import Atom3D from './Atom3D';
import { categoryColors, categoryNames } from '../data/elements';

const ElementModal = ({ element, onClose }) => {
  const categoryColor = categoryColors[element.category];
  const categoryName = categoryNames[element.category];

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
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-surface rounded-2xl border border-primary/20 shadow-2xl"
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
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full ${categoryColor} flex items-center justify-center text-3xl font-bold text-white shadow-glow`}>
                  {element.symbol}
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-white">{element.name_norwegian}</h2>
                  <p className="text-lg text-gray-400">{element.name_english}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Atomnummer:</span>
                    <span className="text-lg font-semibold text-primary">{element.atomic_number}</span>
                  </div>
                </div>
              </div>
              
              <div className={`inline-block px-4 py-2 rounded-full ${categoryColor} text-white font-medium`}>
                {categoryName}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column - Properties */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Basic properties */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Atom className="w-5 h-5 text-primary" />
                    Grunnleggende egenskaper
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-neon-red/10 rounded-lg border border-neon-red/30">
                      <div className="text-2xl font-bold text-neon-red">{element.protons}</div>
                      <div className="text-sm text-gray-400">Protoner</div>
                    </div>
                    <div className="text-center p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/30">
                      <div className="text-2xl font-bold text-neon-blue">{element.neutrons}</div>
                      <div className="text-sm text-gray-400">Nøytroner</div>
                    </div>
                    <div className="text-center p-3 bg-neon-yellow/10 rounded-lg border border-neon-yellow/30">
                      <div className="text-2xl font-bold text-neon-yellow">{element.electrons}</div>
                      <div className="text-sm text-gray-400">Elektroner</div>
                    </div>
                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="text-2xl font-bold text-primary">{element.atomic_mass}</div>
                      <div className="text-sm text-gray-400">Atommasse (u)</div>
                    </div>
                  </div>
                </div>

                {/* Physical properties */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-primary" />
                    Fysiske egenskaper
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Smeltepunkt:</span>
                      <span className="font-medium">
                        {element.melting_point ? `${element.melting_point}°C` : 'Ukjent'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Kokepunkt:</span>
                      <span className="font-medium">
                        {element.boiling_point ? `${element.boiling_point}°C` : 'Ukjent'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tetthet:</span>
                      <span className="font-medium">
                        {element.density ? `${element.density} g/cm³` : 'Ukjent'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Oppdaget:</span>
                      <span className="font-medium">
                        {element.discovered_year > 0 ? element.discovered_year : `${Math.abs(element.discovered_year)} f.Kr.`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Electron configuration */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Elektronkonfigurasjon
                  </h3>
                  <div className="bg-background/50 rounded-lg p-4">
                    <code className="text-lg font-mono text-primary">{element.electron_configuration}</code>
                  </div>
                </div>
              </motion.div>

              {/* Right column - 3D visualization and description */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* 3D Atom visualization */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4 text-center">3D Atom-modell</h3>
                  <div className="h-64 bg-background/30 rounded-lg overflow-hidden">
                    <Atom3D 
                      protons={element.protons}
                      neutrons={element.neutrons}
                      electrons={element.electrons}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center mt-3">
                    Dra med musen for å rotere, bruk hjul for å zoome
                  </p>
                </div>

                {/* Description */}
                <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-semibold mb-4">Beskrivelse</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {element.description_norwegian}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ElementModal;
