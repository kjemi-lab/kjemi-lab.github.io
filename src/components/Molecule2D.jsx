import React, { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';
import { useTheme } from '../contexts/ThemeContext';
import { useRDKit } from '../contexts/RDKitContext';

// Lærebok-stil: rød karbonskelett, svart heteroatomer (O, N, H) på lys grå bakgrunn
const THEME_COLORS = {
  dark: {
    background: [0.1, 0.1, 0.17],
  },
  light: {
    background: [0.95, 0.96, 0.97],
  },
};

const Molecule2D = ({ smiles, width = 200, height = 200, className = '' }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { rdkit } = useRDKit();

  useEffect(() => {
    if (!smiles || !containerRef.current) return;

    setError(null);

    // RDKit: korrekt stereokjemi, wedge/dashed bonds, eksplisitte H
    if (rdkit) {
      try {
        const mol = rdkit.get_mol(smiles);
        if (mol) {
          const colors = THEME_COLORS[theme] || THEME_COLORS.light;
          const details = {
            width: Math.round(width),
            height: Math.round(height),
            backgroundColour: colors.background,
            bondLineWidth: 2,
            addStereoAnnotation: true,
            explicitMethyl: true,
            symbolColour: theme === 'light' ? [0, 0, 0] : [0.9, 0.9, 0.9],
          };
          const svgStr = mol.get_svg_with_highlights(JSON.stringify(details));
          mol.delete();
          if (svgStr && containerRef.current) {
            containerRef.current.innerHTML = svgStr;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
              svg.setAttribute('class', 'molecule-2d-svg');
              svg.style.maxWidth = '100%';
              svg.style.height = 'auto';
              if (theme === 'light') {
                svg.querySelectorAll('path, line').forEach((el) => {
                  const stroke = el.getAttribute('stroke');
                  if (stroke && stroke !== 'none') {
                    el.setAttribute('stroke', '#c62828');
                  }
                });
                svg.querySelectorAll('text').forEach((el) => {
                  el.setAttribute('fill', '#000');
                });
              }
            }
          }
        }
      } catch (err) {
        setError(err?.message || 'Kunne ikke tegne molekylet');
        if (containerRef.current) containerRef.current.innerHTML = '';
      }
      return;
    }

    // Fallback: smiles-drawer
    const themeName = theme === 'dark' ? 'kjemi-dark' : 'kjemi-light';
    const options = {
      width,
      height,
      bondThickness: 1.5,
      bondLength: 25,
      shortBondLength: 0.85,
      bondSpacing: 5,
      terminalCarbons: false,
      explicitHydrogens: true,
      fontSizeLarge: 12,
      fontSizeSmall: 8,
      padding: 15,
      compactDrawing: true,
      isomeric: true,
      themes: {
        'kjemi-dark': {
          C: '#a0a0a0', O: '#b366ff', N: '#b366ff', H: '#888888',
          F: '#9f55ff', CL: '#9f55ff', BR: '#9f55ff', I: '#9f55ff',
          P: '#b366ff', S: '#b366ff', B: '#a0a0a0', SI: '#a0a0a0',
          BACKGROUND: '#1A1A2B',
        },
        'kjemi-light': {
          C: '#222', O: '#222', N: '#222', H: '#333',
          F: '#222', CL: '#222', BR: '#222', I: '#222',
          P: '#222', S: '#222', B: '#222', SI: '#222',
          BACKGROUND: '#ffffff',
        },
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
        if (containerRef.current) containerRef.current.innerHTML = '';
      });
    } catch (err) {
      setError(err?.message || 'Kunne ikke tegne molekylet');
      if (containerRef.current) containerRef.current.innerHTML = '';
    }
  }, [smiles, width, height, theme, rdkit]);

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
