import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Atom, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import Atom3D from './Atom3D';
import { elements } from '../data/elements';

const ElementBuilder = () => {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(1);

  // Beregn atom-egenskaper
  const atomInfo = useMemo(() => {
    const baseElement = elements.find(el => el.protons === protons);
    const charge = protons - electrons;
    const isIsotope = baseElement && baseElement.neutrons !== neutrons;
    
    let title = "Ukjent atom";
    let description = "Dette er ikke et kjent grunnstoff.";
    let type = "unknown";
    
    if (baseElement) {
      if (charge === 0 && !isIsotope) {
        title = baseElement.name_norwegian;
        description = `Dette er ${baseElement.name_norwegian} (${baseElement.symbol}), et stabilt grunnstoff.`;
        type = "element";
      } else if (charge !== 0 && !isIsotope) {
        title = `${baseElement.name_norwegian} Ion (${charge > 0 ? charge : charge}${charge > 0 ? '+' : ''})`;
        description = `Dette er ${baseElement.name_norwegian} som har ${Math.abs(charge)} elektroner ${charge > 0 ? 'mangler' : 'for mange'}.`;
        type = "ion";
      } else if (charge === 0 && isIsotope) {
        title = `${baseElement.name_norwegian} Isotop`;
        description = `Dette er ${baseElement.name_norwegian} med ${neutrons} nøytroner (vanlig: ${baseElement.neutrons}).`;
        type = "isotope";
      } else {
        title = `${baseElement.name_norwegian} Ion Isotop (${charge > 0 ? charge : charge}${charge > 0 ? '+' : ''})`;
        description = `Dette er ${baseElement.name_norwegian} som både er en isotop og et ion.`;
        type = "ion-isotope";
      }
    }
    
    return { title, description, type, baseElement, charge, isIsotope };
  }, [protons, neutrons, electrons]);

  const handleIncrement = (particleType) => {
    switch (particleType) {
      case 'protons':
        setProtons(prev => Math.min(prev + 1, 118));
        break;
      case 'neutrons':
        setNeutrons(prev => prev + 1);
        break;
      case 'electrons':
        setElectrons(prev => prev + 1);
        break;
    }
  };

  const handleDecrement = (particleType) => {
    switch (particleType) {
      case 'protons':
        setProtons(prev => Math.max(prev - 1, 1));
        break;
      case 'neutrons':
        setNeutrons(prev => Math.max(prev - 1, 0));
        break;
      case 'electrons':
        setElectrons(prev => Math.max(prev - 1, 1));
        break;
    }
  };

  const handleInputChange = (particleType, value) => {
    const numValue = parseInt(value) || 0;
    switch (particleType) {
      case 'protons':
        setProtons(Math.max(1, Math.min(numValue, 118)));
        break;
      case 'neutrons':
        setNeutrons(Math.max(0, numValue));
        break;
      case 'electrons':
        setElectrons(Math.max(1, numValue));
        break;
    }
  };

  const getTypeIcon = () => {
    switch (atomInfo.type) {
      case 'element':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'ion':
        return <Zap className="w-6 h-6 text-yellow-400" />;
      case 'isotope':
        return <Atom className="w-6 h-6 text-blue-400" />;
      case 'ion-isotope':
        return <AlertTriangle className="w-6 h-6 text-orange-400" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
    }
  };

  const getTypeColor = () => {
    switch (atomInfo.type) {
      case 'element':
        return 'border-green-400/50 bg-green-400/10';
      case 'ion':
        return 'border-yellow-400/50 bg-yellow-400/10';
      case 'isotope':
        return 'border-blue-400/50 bg-blue-400/10';
      case 'ion-isotope':
        return 'border-orange-400/50 bg-orange-400/10';
      default:
        return 'border-red-400/50 bg-red-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          Grunnstoff-bygger
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Eksperimenter med atomstruktur ved å justere antall protoner, nøytroner og elektroner
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Atom identification */}
          <div className={`p-6 rounded-xl border-2 ${getTypeColor()}`}>
            <div className="flex items-center gap-3 mb-4">
              {getTypeIcon()}
              <h3 className="text-xl font-semibold text-white">Atom-identifikasjon</h3>
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">{atomInfo.title}</h4>
            <p className="text-gray-300 leading-relaxed">{atomInfo.description}</p>
          </div>

          {/* Particle controls */}
          <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-6 text-center">Partikkel-kontroller</h3>
            
            {/* Protons */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-neon-red">Protoner</span>
                <span className="text-sm text-gray-400">Definerer grunnstoffet</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('protons')}
                  className="w-10 h-10 rounded-full bg-neon-red/20 border border-neon-red/50 hover:bg-neon-red/30 transition-colors flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-neon-red" />
                </button>
                <input
                  type="number"
                  value={protons}
                  onChange={(e) => handleInputChange('protons', e.target.value)}
                  className="input-field text-center w-20"
                  min="1"
                  max="118"
                />
                <button
                  onClick={() => handleIncrement('protons')}
                  className="w-10 h-10 rounded-full bg-neon-red/20 border border-neon-red/50 hover:bg-neon-red/30 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-neon-red" />
                </button>
              </div>
            </div>

            {/* Neutrons */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-neon-blue">Nøytroner</span>
                <span className="text-sm text-gray-400">Påvirker isotop</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('neutrons')}
                  className="w-10 h-10 rounded-full bg-neon-blue/20 border border-neon-blue/50 hover:bg-neon-blue/30 transition-colors flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-neon-blue" />
                </button>
                <input
                  type="number"
                  value={neutrons}
                  onChange={(e) => handleInputChange('neutrons', e.target.value)}
                  className="input-field text-center w-20"
                  min="0"
                />
                <button
                  onClick={() => handleIncrement('neutrons')}
                  className="w-10 h-10 rounded-full bg-neon-blue/20 border border-neon-blue/50 hover:bg-neon-blue/30 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-neon-blue" />
                </button>
              </div>
            </div>

            {/* Electrons */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-medium text-neon-yellow">Elektroner</span>
                <span className="text-sm text-gray-400">Påvirker ladning</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('electrons')}
                  className="w-10 h-10 rounded-full bg-neon-yellow/20 border border-neon-yellow/50 hover:bg-neon-yellow/30 transition-colors flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-neon-yellow" />
                </button>
                <input
                  type="number"
                  value={electrons}
                  onChange={(e) => handleInputChange('electrons', e.target.value)}
                  className="input-field text-center w-20"
                  min="1"
                />
                <button
                  onClick={() => handleIncrement('electrons')}
                  className="w-10 h-10 rounded-full bg-neon-yellow/20 border border-neon-yellow/50 hover:bg-neon-yellow/30 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-neon-yellow" />
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-neon-red">{protons}</div>
                  <div className="text-xs text-gray-400">Protoner</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-blue">{neutrons}</div>
                  <div className="text-xs text-gray-400">Nøytroner</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neon-yellow">{electrons}</div>
                  <div className="text-xs text-gray-400">Elektroner</div>
                </div>
              </div>
              {atomInfo.charge !== 0 && (
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-400">Ladning:</span>
                  <span className={`ml-2 text-lg font-bold ${atomInfo.charge > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                    {atomInfo.charge > 0 ? '+' : ''}{atomInfo.charge}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right column - 3D visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* 3D Atom visualization */}
          <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4 text-center">3D Atom-modell</h3>
            <div className="h-96 bg-background/30 rounded-lg overflow-hidden">
              <Atom3D 
                protons={protons}
                neutrons={neutrons}
                electrons={electrons}
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-3">
              Dra med musen for å rotere, bruk hjul for å zoome
            </p>
          </div>

          {/* Educational information */}
          <div className="bg-surface/50 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4">Læringstips</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-neon-red">•</span>
                <span>Protoner definerer grunnstoffet - endre dette for å skape et nytt element</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-blue">•</span>
                <span>Nøytroner påvirker stabilitet og skaper isotoper</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-yellow">•</span>
                <span>Elektroner bestemmer kjemiske egenskaper og ladning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Prøv å lage ioner ved å endre antall elektroner</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElementBuilder;
