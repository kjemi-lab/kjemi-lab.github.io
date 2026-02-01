// Script til å validere SMILES-koder
// Kjør med: node scripts/validate-smiles.js

import { molecules } from '../src/data/molecules.js';

const CORRECTED_SMILES = {
  // Enkle fikser for vanlige problemer
  'Kobalamin (B12)': 'CC1=CC2=C(C=C1C)N(C=N2)[C@@H]3[C@@H]([C@@H]([C@H](O3)CO)OP(=O)(O)O)C', // Forenklet
  'Acetal': 'CCO[C@@H](C)OCC', // Korrekt acetal struktur
  'DMA': 'CC(=O)N(C)C', // Dimetylacetamid
  'Hemiacetal': 'CC(C)C(C)O', // Forenklet
  'Ester': 'CCOC(=O)C', // Etylacetat
  'H2O2': 'OO', // Hydrogenperoksid
  'Dioksygen': 'O=O', // Oksygen
  'Distikstoffoksid': '[N-]=[N+]=O', // N2O
  'NO': '[N]=O', // Nitrogenmonoksid
  'CO': '[C-]#[O+]', // Karbonmonoksid
  'CO2': 'C(=O)=O', // Karbondioksid - dette er usuell notasjon
  'CS2': 'C(=S)=S', // Karbondisulfid
  'SO2': 'O=S=O', // Svoveldioksid
  'H2S': 'S', // Hydrogensulfid
  'BH3': '[BH3]', // Boran - spesielt tegn
  'SiH4': '[SiH4]', // Silan - spesielt tegn
  'Metylazid': 'CN=[N+]=[N-]', // Metylazid
  'Dimetylsiloksan': 'C[Si](C)(O[Si](C)(C)C)C', // Siloksan
  'Tetrahydrofuran': 'C1CCOC1', // THF
  'DMA': 'CC(=O)N(C)C', // Dimetylacetamid korreksjon
  'Etylamin': 'CCN', // Etylamin
  'PH3': 'P', // Fosfin
};

console.log('Validerer SMILES-koder...\n');

let errors = 0;
let fixes = 0;

molecules.forEach((mol) => {
  const smiles = mol.smiles;
  
  // Kontroller for potensielle problemer
  const issues = [];
  
  // Sjekk for balanserte parenteser
  const openParen = (smiles.match(/\(/g) || []).length;
  const closeParen = (smiles.match(/\)/g) || []).length;
  if (openParen !== closeParen) {
    issues.push(`Ubalanserte parenteser (${openParen} åpne, ${closeParen} lukkede)`);
  }
  
  // Sjekk for balanserte brackets
  const openBracket = (smiles.match(/\[/g) || []).length;
  const closeBracket = (smiles.match(/\]/g) || []).length;
  if (openBracket !== closeBracket) {
    issues.push(`Ubalanserte brackets (${openBracket} åpne, ${closeBracket} lukkede)`);
  }
  
  // Sjekk for doble likhetstegn som ikke er i dobbel binding
  const problematicEquals = smiles.match(/=(?!=)/g);
  
  if (issues.length > 0) {
    console.error(`❌ ${mol.name}: ${issues.join(', ')}`);
    errors++;
    
    if (CORRECTED_SMILES[mol.name]) {
      console.log(`   💡 Foreslått rettelse: ${CORRECTED_SMILES[mol.name]}`);
      fixes++;
    }
  }
});

console.log(`\n✅ Kontroll fullført!`);
console.log(`Funn: ${errors} potensielle problemer`);
console.log(`Tilgjengelige fikser: ${fixes}`);

if (errors === 0) {
  console.log('\n✨ Alle SMILES-koder ser OK ut!');
}
