import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, GitCompare, Heart, Clock } from 'lucide-react';
import { elements, categoryColors, categoryNames } from '../data/elements';
import ElementModal from './ElementModal';
import ElementComparison from './ElementComparison';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useLanguage } from '../contexts/LanguageContext';

const PeriodicTable = ({ onElementSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { t, language } = useLanguage();

  // Handle element selection from URL
  useEffect(() => {
    if (onElementSelect) {
      const hash = window.location.hash;
      if (hash.startsWith('#element/')) {
        const atomicNumber = parseInt(hash.split('/')[1]);
        const element = elements.find(el => el.atomic_number === atomicNumber);
        if (element) {
          onElementSelect(element);
        }
      }
    }
  }, [onElementSelect]);

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
    
    if (showFavorites) {
      filtered = filtered.filter(element => favorites.includes(element.atomic_number));
    }
    
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
  }, [searchTerm, selectedCategory, showFavorites, favorites]);

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
      <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-3 sm:mb-4"
        >
          Kjemi Lab
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-4xl mx-auto"
        >
          Utforsk alle {elements.length} grunnstoff med interaktive 3D atom-modeller og detaljerte beskrivelser
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 space-y-3 sm:space-y-4 px-4 sm:px-0">
        <div className="flex flex-col sm:items-center sm:gap-4 gap-3">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-surface border border-primary/30 rounded-lg text-sm sm:text-base text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <motion.button
              onClick={() => setShowComparison(true)}
              className="px-3 sm:px-6 py-2 sm:py-3 bg-primary/20 border border-primary/50 rounded-lg text-white text-xs sm:text-sm hover:bg-primary/30 transition-colors flex items-center gap-2 font-medium flex-1 sm:flex-none justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitCompare className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="hidden sm:inline">{t('compare')}</span>
            </motion.button>
            <motion.button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-3 sm:px-4 py-2 sm:py-3 border rounded-lg transition-colors flex items-center gap-2 font-medium text-xs sm:text-sm flex-1 sm:flex-none justify-center ${
                showFavorites
                  ? 'bg-neon-yellow/20 border-neon-yellow/50 text-neon-yellow'
                  : 'bg-primary/20 border-primary/50 text-white hover:bg-primary/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${showFavorites ? 'fill-neon-yellow' : ''}`} />
              <span className="hidden sm:inline">{t('favorites')} ({favorites.length})</span>
              <span className="sm:hidden">({favorites.length})</span>
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface border border-primary/30 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 flex-1 sm:flex-none"
          >
            <option value="all">{t('allCategories')} ({elements.length})</option>
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
            gridTemplateColumns: 'repeat(18, minmax(35px, 1fr))',
            gridTemplateRows: 'repeat(10, minmax(35px, 1fr))',
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
              className={`element-card border-2 ${categoryColors[element.category]} ${categoryColors[element.category]}/20 cursor-pointer relative ${
                isFavorite(element.atomic_number) ? 'ring-2 ring-neon-yellow' : ''
              }`}
              onClick={() => {
                setSelectedElement(element);
                addToRecentlyViewed(element.atomic_number);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFavorite(element.atomic_number);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFavorite(element.atomic_number) && (
                <Heart className="absolute top-1 right-1 w-3 h-3 fill-neon-yellow text-neon-yellow" />
              )}
              <div className="text-xs text-gray-400 text-left leading-none">{element.atomic_number}</div>
              <div className="text-lg font-bold text-center leading-none">{element.symbol}</div>
              <div className="text-xs text-center text-gray-300 leading-none">
                {language === 'no' ? element.name_norwegian : element.name_english}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && !showFavorites && (
        <div className="max-w-6xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/50 rounded-xl p-6 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-white">{t('recentlyViewed')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentlyViewed.slice(0, 10).map((atomicNumber) => {
                const element = elements.find(el => el.atomic_number === atomicNumber);
                if (!element) return null;
                return (
                  <motion.button
                    key={atomicNumber}
                    onClick={() => {
                      setSelectedElement(element);
                      addToRecentlyViewed(element.atomic_number);
                    }}
                    className={`px-3 py-2 rounded-lg border-2 transition-all ${
                      categoryColors[element.category]
                    } hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="font-bold">{element.symbol}</span>
                    <span className="text-xs ml-1">
                      {language === 'no' ? element.name_norwegian : element.name_english}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

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
          onClose={() => {
            setSelectedElement(null);
            window.history.replaceState(null, '', window.location.pathname);
          }}
        />
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <ElementComparison
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default PeriodicTable;
