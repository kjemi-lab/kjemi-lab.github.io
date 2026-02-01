import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { molecules, moleculeGroups } from '../data/molecules';
import Molecule2D from './Molecule2D';
import MoleculeModal from './MoleculeModal';
import { useLanguage } from '../contexts/LanguageContext';

const Molecules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedMolecule, setSelectedMolecule] = useState(null);
  const { t } = useLanguage();

  const filteredMolecules = useMemo(() => {
    let filtered = molecules;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (mol) =>
          mol.name.toLowerCase().includes(term) ||
          mol.formula.toLowerCase().includes(term) ||
          mol.groups.some((g) => moleculeGroups[g]?.toLowerCase().includes(term))
      );
    }

    if (selectedGroup !== 'all') {
      filtered = filtered.filter((mol) => mol.groups.includes(selectedGroup));
    }

    return filtered;
  }, [searchTerm, selectedGroup]);

  const groupCounts = useMemo(() => {
    const counts = { all: molecules.length };
    molecules.forEach((mol) => {
      mol.groups.forEach((g) => {
        counts[g] = (counts[g] || 0) + 1;
      });
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gradient mb-4"
        >
          {t('molecules')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-4xl mx-auto"
        >
          {t('moleculesDesc')}
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('moleculesSearchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-primary/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5 shrink-0" />
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-surface border border-primary/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 min-w-[180px]"
            >
              <option value="all">{t('allCategories')} ({groupCounts.all})</option>
              {Object.entries(moleculeGroups).map(([key, name]) => (
                <option key={key} value={key}>
                  {name} ({groupCounts[key] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Molecule Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredMolecules.map((molecule, index) => (
              <motion.div
                key={`${molecule.name}-${index}-${molecule.smiles.slice(0, 20)}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index % 20 * 0.01 }}
                className="bg-surface/50 border border-primary/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]"
                onClick={() => setSelectedMolecule(molecule)}
              >
                <div className="aspect-square flex items-center justify-center mb-3 bg-background/30 rounded-lg overflow-hidden min-h-[180px]">
                  <Molecule2D
                    smiles={molecule.smiles}
                    width={190}
                    height={190}
                  />
                </div>
                <h3 className="font-semibold text-white text-sm truncate">
                  {molecule.name}
                </h3>
                <p className="text-gray-400 text-xs truncate">{molecule.formula}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {molecule.groups.slice(0, 2).map((g) => (
                    <span
                      key={g}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary"
                    >
                      {moleculeGroups[g]}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMolecules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-400"
          >
            {t('noMoleculesFound')}
          </motion.div>
        )}
      </div>

      {/* Molecule Modal */}
      <AnimatePresence>
        {selectedMolecule && (
          <MoleculeModal
            molecule={selectedMolecule}
            onClose={() => setSelectedMolecule(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Molecules;
