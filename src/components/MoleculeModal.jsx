import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Molecule2D from './Molecule2D';
import { moleculeGroups } from '../data/molecules';

const MoleculeModal = ({ molecule, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2A4A]/95"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-custom" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-4xl h-[95vh] overflow-y-auto bg-surface rounded-xl sm:rounded-2xl border border-primary/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-surface/80 hover:bg-surface border border-primary/30 hover:border-primary/50 transition-all duration-200"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </button>

          <div className="p-4 sm:p-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">
                {molecule.name}
              </h2>
              <p className="text-sm sm:text-lg text-primary font-mono">{molecule.formula}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {molecule.groups.map((g) => (
                  <span
                    key={g}
                    className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                  >
                    {moleculeGroups[g]}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 2D Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background/30 rounded-lg sm:rounded-xl p-3 sm:p-6 mb-4 sm:mb-6 border border-primary/20"
            >
              <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <Molecule2D
                  key={`${molecule.name}-${molecule.smiles}`}
                  smiles={molecule.smiles}
                  width={Math.min(350, 200 + molecule.smiles.length * 2)}
                  height={Math.min(350, 200 + molecule.smiles.length * 2)}
                  className="w-full"
                />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3 font-mono break-all">
                SMILES: {molecule.smiles}
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-primary/20"
            >
              <h3 className="text-xs sm:text-sm font-semibold text-primary mb-2">
                Beskrivelse
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {molecule.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoleculeModal;
