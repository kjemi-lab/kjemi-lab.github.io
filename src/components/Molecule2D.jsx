import React, { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';
import { useTheme } from '../contexts/ThemeContext';
import { useRDKit } from '../contexts/RDKitContext';

const Molecule2D = ({ smiles, width = 200, height = 200, className = '' }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { rdkit } = useRDKit();

  useEffect(() => {
    const smilesStr = typeof smiles === 'string' ? smiles.trim() : '';
    if (!smilesStr || !containerRef.current) return;

    setError(null);
    containerRef.current.innerHTML = '';

    const drawMolecule = async () => {
      // RDKit: korrekt stereokjemi, wedge/dashed bonds
      if (rdkit) {
        try {
          console.log('🔬 Tegner med RDKit:', smilesStr);
          // Parse SMILES med RDKit
          const mol = rdkit.get_mol(smilesStr);
          if (!mol) {
            throw new Error('Ugyldig SMILES-kode');
          }

          try {
            // Regenerer 2D-koordinater
            mol.get_new_coords();
          } catch (_) {
            // Fortsett selv om det feiler
          }

          const details = {
            width: Math.round(width),
            height: Math.round(height),
            backgroundColour: theme === 'light' ? [1, 1, 1] : [0.05, 0.05, 0.1],
            bondLineWidth: 2.5,
            addStereoAnnotation: true,
            explicitMethyl: false,
            symbolColour: theme === 'light' ? [0, 0, 0] : [0.9, 0.9, 0.9],
            bondColour: theme === 'light' ? [0, 0, 0] : [0.9, 0.9, 0.9],
            centreMoleculesBeforeDrawing: true,
            fixedBondLength: 45,
          };

          const svgStr = mol.get_svg_with_highlights(JSON.stringify(details));
          mol.delete();
          
          if (svgStr && containerRef.current) {
            console.log('✅ RDKit tegning vellykket');
            containerRef.current.innerHTML = svgStr;
            const svg = containerRef.current.querySelector('svg');
            if (svg) {
              svg.style.maxWidth = '100%';
              svg.style.height = 'auto';
            }
            return;
          }
        } catch (err) {
          console.warn('⚠️ RDKit feilet:', err.message);
        }
      } else {
        console.log('ℹ️ RDKit ikke tilgjengelig, bruker SmilesDrawer');
      }

      // Fallback: SmilesDrawer
      const themeName = theme === 'dark' ? 'kjemi-dark' : 'kjemi-light';
      const options = {
        width,
        height,
        bondThickness: 2,
        bondLength: 35,
        shortBondLength: 0.85,
        bondSpacing: 6,
        terminalCarbons: false,
        explicitHydrogens: false,
        fontSizeLarge: 14,
        fontSizeSmall: 10,
        padding: 25,
        compactDrawing: false,
        isomeric: true,
        themes: {
          'kjemi-dark': {
            C: '#a0a0a0', O: '#ff6666', N: '#ff9999', H: '#ffffff',
            F: '#99ff99', CL: '#99ff99', BR: '#99ff99', I: '#99ff99',
            P: '#ffcc99', S: '#ffff99', B: '#a0a0a0', SI: '#ffffff',
            BACKGROUND: '#1A1A2B',
          },
          'kjemi-light': {
            C: '#c62828', O: '#c62828', N: '#c62828', H: '#000',
            F: '#000', CL: '#000', BR: '#000', I: '#000',
            P: '#c62828', S: '#c62828', B: '#c62828', SI: '#000',
            BACKGROUND: '#ffffff',
          },
        },
      };

      try {
        return new Promise((resolve) => {
          const smiDrawer = new SmilesDrawer.SmiDrawer(options, {});
          smiDrawer.draw(smilesStr, null, themeName, 
            (svg) => {
              if (svg && containerRef.current) {
                containerRef.current.innerHTML = '';
                containerRef.current.appendChild(svg);
                svg.style.maxWidth = '100%';
                svg.style.height = 'auto';
              }
              resolve(true);
            }, 
            (err) => {
              // Fallback uten stereo
              console.warn('Tegning med stereo feilet, prøver uten:', err);
              const simplifiedSmiles = smilesStr.replace(/@+/g, '');
              const smiDrawer2 = new SmilesDrawer.SmiDrawer(options, {});
              smiDrawer2.draw(simplifiedSmiles, null, themeName,
                (svg2) => {
                  if (svg2 && containerRef.current) {
                    containerRef.current.innerHTML = '';
                    containerRef.current.appendChild(svg2);
                    svg2.style.maxWidth = '100%';
                    svg2.style.height = 'auto';
                  }
                  resolve(true);
                },
                (err2) => {
                  setError('Kunne ikke tegne');
                  resolve(false);
                }
              );
            }
          );
        });
      } catch (err) {
        setError('Feil ved tegning');
        console.error(err);
      }
    };

    drawMolecule();
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
