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
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-custom" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-surface rounded-2xl border border-primary/20 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
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
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-white mb-1">
                {molecule.name}
              </h2>
              <p className="text-lg text-primary font-mono">{molecule.formula}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {molecule.groups.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
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
              className="bg-background/30 rounded-xl p-6 mb-6 border border-primary/20"
            >
              <div className="flex items-center justify-center min-h-[400px]">
                <Molecule2D
                  key={`${molecule.name}-${molecule.smiles}`}
                  smiles={molecule.smiles}
                  width={Math.min(420, 200 + molecule.smiles.length * 2)}
                  height={Math.min(420, 200 + molecule.smiles.length * 2)}
                  className="w-full"
                />
              </div>
              <p className="text-xs text-gray-400 text-center mt-3 font-mono break-all">
                SMILES: {molecule.smiles}
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface/50 rounded-xl p-4 border border-primary/20"
            >
              <h3 className="text-sm font-semibold text-primary mb-2">
                Beskrivelse
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
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
