import React, { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';
import { useTheme } from '../contexts/ThemeContext';

// Theme-tilpassede farger: primary #9f55ff, muted gray #a0a0a0
const KJEMI_THEMES = {
  dark: {
    C: '#a0a0a0',
    O: '#b366ff',
    N: '#b366ff',
    F: '#9f55ff',
    CL: '#9f55ff',
    BR: '#9f55ff',
    I: '#9f55ff',
    P: '#b366ff',
    S: '#b366ff',
    B: '#a0a0a0',
    SI: '#a0a0a0',
    H: '#888888',
    BACKGROUND: '#1A1A2B',
  },
  light: {
    C: '#666666',
    O: '#7c3aed',
    N: '#7c3aed',
    F: '#6d28d9',
    CL: '#6d28d9',
    BR: '#6d28d9',
    I: '#6d28d9',
    P: '#7c3aed',
    S: '#7c3aed',
    B: '#666666',
    SI: '#666666',
    H: '#555555',
    BACKGROUND: '#ffffff',
  },
};

const Molecule2D = ({ smiles, width = 200, height = 200, className = '' }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!smiles || !containerRef.current) return;

    setError(null);
    const themeName = theme === 'dark' ? 'kjemi-dark' : 'kjemi-light';

    const options = {
      width,
      height,
      bondThickness: 1.0,
      bondLength: 25,
      shortBondLength: 0.85,
      bondSpacing: 5,
      terminalCarbons: false,
      explicitHydrogens: true,
      fontSizeLarge: 12,
      fontSizeSmall: 8,
      padding: 15,
      compactDrawing: true,
      themes: {
        'kjemi-dark': KJEMI_THEMES.dark,
        'kjemi-light': KJEMI_THEMES.light,
      },
    };

    try {
      const cleanedSmiles = SmilesDrawer.clean ? SmilesDrawer.clean(smiles) : smiles;
      const smiDrawer = new SmilesDrawer.SmiDrawer(options, {});

      smiDrawer.draw(cleanedSmiles, null, themeName, (svg) => {
        setError(null);
        if (svg && containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(svg);
          svg.setAttribute('class', 'molecule-2d-svg');
          svg.style.maxWidth = '100%';
          svg.style.height = 'auto';
        }
      }, (err) => {
        setError(err?.message || 'Kunne ikke tegne molekylet');
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      });
    } catch (err) {
      setError(err?.message || 'Kunne ikke tegne molekylet');
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [smiles, width, height, theme]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-surface/30 rounded-lg border border-primary/20 text-gray-400 text-sm ${className}`}
        style={{ width, height }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`molecule-2d-container flex items-center justify-center ${className}`}
      style={{ minWidth: width, minHeight: height }}
    />
  );
};

export default Molecule2D;
