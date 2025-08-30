import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { elements, categoryColors, categoryNames } from '../data/elements';
import ElementModal from './ElementModal';

const PeriodicTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedElement, setSelectedElement] = useState(null);

  // Group elements by category for display
  const elementsByCategory = useMemo(() => {
    const grouped = {};
    elements.forEach(element => {
      if (!grouped[element.category]) {
        grouped[element.category] = [];
      }
      grouped[element.category].push(element);
    });
    return grouped;
  }, []);

  const filteredElements = useMemo(() => {
    let filtered = elements;
    
    if (searchTerm) {
      filtered = filtered.filter(element =>
        element.name_norwegian.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.atomic_number.toString().includes(searchTerm)
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(element => element.category === selectedCategory);
    }
    
    return filtered;
  }, [searchTerm, selectedCategory]);

  const getGridPosition = (element) => {
    return {
      gridColumn: element.group,
      gridRow: element.period
    };
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      alkali: "Myke, reaktive metaller som reagerer kraftig med vann",
      "alkaline-earth": "Hardere metaller som reagerer med vann og syrer",
      transition: "Sterke, harde metaller med høy smeltepunkt",
      "post-transition": "Metaller med egenskaper mellom overgangsmetaller og ikke-metaller",
      lanthanide: "Sjeldne jordmetaller med unike optiske egenskaper",
      actinide: "Radioaktive metaller som brukes i atomenergi",
      metalloid: "Elementer med egenskaper mellom metaller og ikke-metaller",
      nonmetal: "Ikke-metalliske elementer som er essensielle for liv",
      halogen: "Reaktive ikke-metaller som danner salter med metaller",
      "noble-gas": "Inerte gasser som reagerer sjelden med andre stoffer"
    };
    return descriptions[category] || "Beskrivelse ikke tilgjengelig";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gradient mb-4"
        >
          Kjemi Lab
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-4xl mx-auto"
        >
          Utforsk alle {elements.length} grunnstoff med interaktive 3D atom-modeller og detaljerte beskrivelser
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Søk etter grunnstoff eller symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-primary/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface border border-primary/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            <option value="all">Alle kategorier ({elements.length})</option>
            {Object.entries(categoryNames).map(([key, name]) => (
              <option key={key} value={key}>
                {name} ({elementsByCategory[key]?.length || 0})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Periodic Table */}
      <div className="max-w-[98vw] mx-auto mb-12 overflow-x-auto">
        <div 
          className="grid gap-0.5 mx-auto"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(45px, 1fr))',
            gridTemplateRows: 'repeat(7, minmax(45px, 1fr))',
            minWidth: 'max-content'
          }}
        >
          {filteredElements.map((element) => (
            <motion.div
              key={element.atomic_number}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={getGridPosition(element)}
              className={`element-card ${categoryColors[element.category]} cursor-pointer`}
              onClick={() => setSelectedElement(element)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xs text-gray-400 text-left leading-none">{element.atomic_number}</div>
              <div className="text-lg font-bold text-center leading-none">{element.symbol}</div>
              <div className="text-xs text-center text-gray-300 leading-none">{element.name_norwegian}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Explanation */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-center mb-8 text-gradient"
        >
          Kategori-forklaring
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryNames).map(([key, name], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`border-2 ${categoryColors[key]} bg-surface/30 rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer`}
            >
              <h3 className="font-bold text-lg mb-2">{name}</h3>
              <p className="text-sm text-gray-300 mb-2">
                {elementsByCategory[key]?.length || 0} grunnstoff
              </p>
              <p className="text-xs text-gray-400 mb-2">
                Eksempler: {elementsByCategory[key]?.slice(0, 3).map(el => el.symbol).join(', ')}
              </p>
              <p className="text-sm text-gray-300">
                {getCategoryDescription(key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Element Modal */}
      {selectedElement && (
        <ElementModal
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default PeriodicTable;
