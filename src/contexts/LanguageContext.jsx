import React, { createContext, useContext } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations = {
  no: {
    home: 'Hjem',
    periodicTable: 'Periodisk Tabell',
    elementBuilder: 'Grunnstoff-bygger',
    molecules: 'Molekyler',
    moleculesDesc: 'Utforsk 2D-strukturer av molekyler fra SMILES. Søk og filtrer etter kategori.',
    moleculesSearchPlaceholder: 'Søk etter molekyl, formel eller gruppe...',
    noMoleculesFound: 'Ingen molekyler funnet',
    compare: 'Sammenlign',
    favorites: 'Favoritter',
    recentlyViewed: 'Nylig vist',
    selectFirstElement: 'Velg første grunnstoff',
    selectSecondElement: 'Velg andre grunnstoff',
    compareElements: 'Sammenlign Grunnstoff',
    properties: 'Egenskaper',
    searchPlaceholder: 'Søk etter grunnstoff eller symbol...',
    allCategories: 'Alle kategorier',
    explorePeriodicTable: 'Utforsk Periodisk Tabell',
    tryElementBuilder: 'Prøv Grunnstoff-bygger',
    elements: 'Grunnstoff',
    categories: 'Kategorier',
    atomModels: 'Atom-modeller',
    norwegian: 'Norsk',
    change: 'Endre',
    selected: 'valgt',
    periodicTableDesc: 'Utforsk alle 118 grunnstoff med interaktive 3D atom-modeller og detaljerte beskrivelser på norsk.',
    elementBuilderDesc: 'Bygg dine egne atomer og se hvordan endringer i protoner, nøytroner og elektroner påvirker egenskapene.',
    whyKjemiLab: 'Hvorfor Kjemi Lab?',
    whyDesc: 'Vi kombinerer moderne teknologi med pedagogisk design for å gjøre kjemi tilgjengelig og engasjerende for alle.',
    whoFor: 'Hvem er Kjemi Lab for?',
    middleSchool: 'Ungdomsskoleelever',
    middleSchoolDesc: 'Lær grunnleggende kjemi på en morsom og interaktiv måte',
    highSchool: 'Videregående elever',
    highSchoolDesc: 'Fordyp deg i periodisk systemet og atomstruktur',
    teachers: 'Lærere',
    teachersDesc: 'Bruk som pedagogisk verktøy i kjemifaget',
    readyToExplore: 'Klar til å utforske kjemi?',
    startJourney: 'Start din reise inn i atomverdenen med Kjemi Lab',
    getStarted: 'Kom i gang nå',
  },
  en: {
    home: 'Home',
    periodicTable: 'Periodic Table',
    elementBuilder: 'Element Builder',
    molecules: 'Molecules',
    moleculesDesc: 'Explore 2D structures of molecules from SMILES. Search and filter by category.',
    moleculesSearchPlaceholder: 'Search for molecule, formula or group...',
    noMoleculesFound: 'No molecules found',
    compare: 'Compare',
    favorites: 'Favorites',
    recentlyViewed: 'Recently Viewed',
    selectFirstElement: 'Select first element',
    selectSecondElement: 'Select second element',
    compareElements: 'Compare Elements',
    properties: 'Properties',
    searchPlaceholder: 'Search for element or symbol...',
    allCategories: 'All categories',
    explorePeriodicTable: 'Explore Periodic Table',
    tryElementBuilder: 'Try Element Builder',
    elements: 'Elements',
    categories: 'Categories',
    atomModels: 'Atom Models',
    norwegian: 'Norwegian',
    english: 'English',
    change: 'Change',
    selected: 'selected',
    periodicTableDesc: 'Explore all 118 elements with interactive 3D atom models and detailed descriptions in English.',
    elementBuilderDesc: 'Build your own atoms and see how changes in protons, neutrons, and electrons affect properties.',
    whyKjemiLab: 'Why Kjemi Lab?',
    whyDesc: 'We combine modern technology with educational design to make chemistry accessible and engaging for everyone.',
    whoFor: 'Who is Kjemi Lab for?',
    middleSchool: 'Middle School Students',
    middleSchoolDesc: 'Learn basic chemistry in a fun and interactive way',
    highSchool: 'High School Students',
    highSchoolDesc: 'Dive deep into the periodic system and atomic structure',
    teachers: 'Teachers',
    teachersDesc: 'Use as an educational tool in chemistry classes',
    readyToExplore: 'Ready to explore chemistry?',
    startJourney: 'Start your journey into the atomic world with Kjemi Lab',
    getStarted: 'Get Started',
  }
};

export const LanguageProvider = ({ children }) => {
  const language = 'no';

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

