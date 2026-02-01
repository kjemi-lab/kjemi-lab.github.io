/**
 * Fetches canonical SMILES from NCI Cactus for every molecule in molecules.js
 * and updates the file. Run: node scripts/fetch-all-smiles.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cactusQuery } from './cactus-names.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOLECULES_PATH = path.join(__dirname, '../src/data/molecules.js');
const BASE = 'https://cactus.nci.nih.gov/chemical/structure';
const DELAY_MS = 150;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getQueryName(displayName) {
  const mapped = cactusQuery[displayName];
  if (mapped) return mapped;
  const cleaned = displayName
    .replace(/\s*\([^)]+\)\s*/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
  return cleaned.toLowerCase();
}

async function fetchSmiles(query) {
  const url = `${BASE}/${encodeURIComponent(query)}/smiles`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const text = await res.text();
    if (!res.ok) return null;
    const first = (text.split('\n')[0] || text).trim();
    if (first && first.length > 2 && !first.startsWith('<') && !first.startsWith('Sorry')) {
      return first;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

// Extract name and smiles from a molecule line
function parseMoleculeLine(line) {
  const nameMatch = line.match(/name:\s*'([^']*)'/);
  const smilesMatch = line.match(/smiles:\s*'((?:[^'\\]|\\.)*)'/);
  if (nameMatch && smilesMatch) {
    return { name: nameMatch[1], smiles: smilesMatch[1], fullLine: line };
  }
  return null;
}

// Replace smiles in line
function replaceSmilesInLine(line, newSmiles) {
  return line.replace(/smiles:\s*'((?:[^'\\]|\\.)*)'/, `smiles: '${newSmiles.replace(/'/g, "\\'")}'`);
}

async function main() {
  const content = fs.readFileSync(MOLECULES_PATH, 'utf8');
  const lines = content.split('\n');
  const updates = [];
  let index = 0;
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseMoleculeLine(lines[i]);
    if (parsed) {
      updates.push({ lineIndex: i, name: parsed.name, currentSmiles: parsed.smiles });
      index++;
    }
  }
  console.log(`Found ${updates.length} molecules. Fetching SMILES from Cactus...`);
  const results = [];
  for (let u = 0; u < updates.length; u++) {
    const { name, currentSmiles } = updates[u];
    const query = getQueryName(name);
    const fetched = await fetchSmiles(query);
    const useSmiles = fetched || currentSmiles;
    if (!fetched) console.warn(`No Cactus result for: ${name} (tried: ${query})`);
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
