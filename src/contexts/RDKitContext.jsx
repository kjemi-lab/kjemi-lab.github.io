import React, { createContext, useContext, useState, useEffect } from 'react';

const RDKitContext = createContext(null);

export function RDKitProvider({ children }) {
  const [rdkit, setRdkit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || window.initRDKitModule == null) {
      setLoading(false);
      return;
    }
    window
      .initRDKitModule({
        locateFile: () =>
          'https://unpkg.com/@rdkit/rdkit@2025.3.4-1.0.0/dist/RDKit_minimal.wasm',
      })
      .then((RDKit) => {
        setRdkit(RDKit);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <RDKitContext.Provider value={{ rdkit, loading }}>
      {children}
    </RDKitContext.Provider>
  );
}

export function useRDKit() {
  return useContext(RDKitContext);
}
