/**
 * Fetches IsomericSMILES from PubChem REST API for every molecule and updates molecules.js.
 * PubChem: https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{name}/property/IsomericSMILES/JSON
 * Rate limit: max 5 requests/sec - we use 1.2 sec delay.
 * Run: node scripts/fetch-pubchem-smiles.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cactusQuery } from './cactus-names.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOLECULES_PATH = path.join(__dirname, '../src/data/molecules.js');
const PUBCHEM_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name';
const DELAY_MS = 1200;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getQueryName(displayName) {
  const mapped = cactusQuery[displayName];
  if (mapped) return mapped;
  return displayName
    .replace(/\s*\([^)]+\)\s*/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

async function fetchPubChemSmiles(query) {
  const url = `${PUBCHEM_BASE}/${encodeURIComponent(query)}/property/IsomericSMILES/JSON`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    const json = await res.json();
    const props = json?.PropertyTable?.Properties?.[0];
    const smiles = props?.IsomericSMILES ?? props?.SMILES;
    if (smiles && typeof smiles === 'string' && smiles.length > 2) return smiles;
  } catch (e) {
    // ignore
  }
  return null;
}

function parseMoleculeLine(line) {
  const nameMatch = line.match(/name:\s*'([^']*)'/);
  const smilesMatch = line.match(/smiles:\s*'((?:[^'\\]|\\.)*)'/);
  if (nameMatch && smilesMatch) {
    return { name: nameMatch[1], smiles: smilesMatch[1], fullLine: line };
  }
  return null;
}

function replaceSmilesInLine(line, newSmiles) {
  return line.replace(/smiles:\s*'((?:[^'\\]|\\.)*)'/, `smiles: '${newSmiles.replace(/'/g, "\\'")}'`);
}

async function main() {
  const content = fs.readFileSync(MOLECULES_PATH, 'utf8');
  const lines = content.split('\n');
  const updates = [];
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseMoleculeLine(lines[i]);
    if (parsed) updates.push({ lineIndex: i, name: parsed.name, currentSmiles: parsed.smiles });
  }
  console.log(`Found ${updates.length} molecules. Fetching IsomericSMILES from PubChem...`);
  const results = [];
  for (let u = 0; u < updates.length; u++) {
    const { name, currentSmiles } = updates[u];
    const query = getQueryName(name);
    const fetched = await fetchPubChemSmiles(query);
    const useSmiles = fetched || currentSmiles;
    if (!fetched) console.warn(`No PubChem result: ${name} (tried: ${query})`);
    else console.log(`OK: ${name}`);
    results.push({ lineIndex: updates[u].lineIndex, newSmiles: useSmiles });
    await sleep(DELAY_MS);
  }
  const newLines = [...lines];
  for (const r of results) {
    newLines[r.lineIndex] = replaceSmilesInLine(lines[r.lineIndex], r.newSmiles);
  }
  fs.writeFileSync(MOLECULES_PATH, newLines.join('\n'), 'utf8');
  console.log(`Updated ${results.length} molecules in ${MOLECULES_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
