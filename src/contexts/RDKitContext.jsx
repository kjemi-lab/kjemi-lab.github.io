import React, { createContext, useContext, useState, useEffect } from 'react';

const RDKitContext = createContext(null);

export const useRDKit = () => useContext(RDKitContext);

export function RDKitProvider({ children }) {
  const [rdkit, setRdkit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRDKit = async () => {
      try {
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        console.log('Checking for window.initRDKitModule...');
        
        // Sjekk om initRDKitModule allerede er tilgjengelig
        if (window.initRDKitModule) {
          console.log('Found initRDKitModule, initializing...');
          try {
            const RDKit = await window.initRDKitModule({
              locateFile: (filename) => `https://unpkg.com/@rdkit/rdkit@2025.3.4-1.0.0/dist/${filename}`,
            });
            setRdkit(RDKit);
            console.log('✅ RDKit loaded successfully:', RDKit);
          } catch (initError) {
            console.error('❌ Error initializing RDKit:', initError);
            setLoading(false);
          }
        } else {
          console.warn('⚠️  window.initRDKitModule not available');
          console.warn('Available on window:', Object.keys(window).filter(k => k.includes('RD') || k.includes('rdkit')));
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Error loading RDKit:', error);
        setLoading(false);
      }
    };

    // Vent lengre for å sikre at RDKit CDN scriptet er lastet
    const timer = setTimeout(loadRDKit, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RDKitContext.Provider value={{ rdkit, loading }}>
      {children}
    </RDKitContext.Provider>
  );
}
