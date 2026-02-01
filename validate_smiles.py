#!/usr/bin/env python3
"""
SMILES Validator using RDKit
Validates molecular SMILES codes, checks formulas, and identifies errors
"""

import json
import re
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors
from collections import defaultdict
import requests
from typing import Dict, List, Tuple, Optional

# Molecules data
molecules = [
  {"name": 'Estradiol', "formula": 'C₁₈H₂₄O₂', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@@H]2O)CCC4=C3C=CC(=C4)O'},
  {"name": 'Testosteron', "formula": 'C₁₉H₂₈O₂', "smiles": 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@H]4O)C'},
  {"name": 'Kortisol', "formula": 'C₂₁H₃₀O₅', "smiles": 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O'},
  {"name": 'Adrenalin', "formula": 'C₉H₁₃NO₃', "smiles": 'CNC[C@@H](C1=CC(=C(C=C1)O)O)O'},
  {"name": 'Oxytocin', "formula": 'C₄₃H₆₆N₁₂O₁₂S₂', "smiles": 'CC[C@H](C)[C@H]1C(=O)N[C@H](C(=O)N[C@H](C(=O)N[C@@H](CSSC[C@@H](C(=O)N[C@H](C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCC[C@H]3C(=O)N[C@@H](CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N'},
  {"name": 'Thyroxin', "formula": 'C₁₅H₁₁I₄NO₄', "smiles": 'C1=C(C=C(C(=C1I)OC2=CC(=C(C(=C2)I)O)I)I)C[C@@H](C(=O)O)N'},
  {"name": 'Progesteron', "formula": 'C₂₁H₃₀O₂', "smiles": 'CC(=O)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CCC4=CC(=O)CC[C@]34C)C'},
  {"name": 'Melatonin', "formula": 'C₁₃H₁₆N₂O₂', "smiles": 'CC(=O)NCCC1=CNC2=C1C=C(C=C2)OC'},
  {"name": 'Aldosteron', "formula": 'C₂₁H₂₈O₅', "smiles": 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@H]4C(=O)CO)C=O)O'},
  {"name": 'DHEA', "formula": 'C₁₉H₂₈O₂', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1CCC2=O)CC=C4[C@@]3(CC[C@@H](C4)O)C'},
  {"name": 'Estron', "formula": 'C₁₈H₂₂O₂', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1CCC2=O)CCC4=C3C=CC(=C4)O'},
  {"name": 'Estriol', "formula": 'C₁₈H₂₄O₃', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1C[C@H]([C@@H]2O)O)CCC4=C3C=CC(=C4)O'},
  {"name": 'Dihydrotestosteron', "formula": 'C₁₉H₃₀O₂', "smiles": 'C[C@]12CCC(=O)C[C@@H]1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@H]4O)C'},
  {"name": 'Triiodotyronin', "formula": 'C₁₅H₁₂I₃NO₄', "smiles": 'C1=CC(=C(C=C1OC2=C(C=C(C=C2I)C[C@@H](C(=O)O)N)I)I)O'},
  {"name": 'Kortison', "formula": 'C₂₁H₂₈O₅', "smiles": 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2C(=O)C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C'},
  {"name": 'Prostaglandin E2', "formula": 'C₂₀H₃₂O₅', "smiles": 'CCCCC[C@@H](/C=C/[C@H]1[C@@H](CC(=O)[C@@H]1C/C=C\\CCCC(=O)O)O)O'},
  {"name": 'Calcitriol', "formula": 'C₂₇H₄₄O₃', "smiles": 'C[C@H](CCCC(C)(C)O)[C@H]1CC[C@@H]\\2[C@@]1(CCC/C2=C\\C=C/3\\C[C@H](C[C@@H](C3=C)O)O)C'},
  {"name": 'Epinefrin', "formula": 'C₉H₁₃NO₃', "smiles": 'CNC[C@@H](C1=CC(=C(C=C1)O)O)O'},
  {"name": 'Prednisolon', "formula": 'C₂₁H₂₈O₅', "smiles": 'C[C@]12C[C@@H]([C@H]3[C@H]([C@@H]1CC[C@@]2(C(=O)CO)O)CCC4=CC(=O)C=C[C@]34C)O'},
  {"name": 'Dexametason', "formula": 'C₂₂H₂₉FO₅', "smiles": 'C[C@@H]1C[C@H]2[C@@H]3CCC4=CC(=O)C=C[C@@]4([C@]3([C@H](C[C@@]2([C@]1(C(=O)CO)O)C)O)F)C'},
  {"name": 'Androstenedion', "formula": 'C₁₉H₂₆O₂', "smiles": 'C[C@]12CC[C@H]3[C@@H](CCC4=CC(=O)CC[C@]34C)[C@@H]1CCC2=O'},
  {"name": 'Noretyndron', "formula": 'C₂₀H₂₆O₂', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=CC(=O)CC[C@H]34'},
  {"name": 'Etinylestradiol', "formula": 'C₂₀H₂₄O₂', "smiles": 'C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=C3C=CC(=C4)O'},
  {"name": 'Levonorgestrel', "formula": 'C₂₁H₂₈O₂', "smiles": 'CC[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=CC(=O)CC[C@H]34'},
  {"name": 'Hydrokortison', "formula": 'C₂₁H₃₀O₅', "smiles": 'C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O'},
]

def normalize_formula(formula_str: str) -> str:
    """Convert subscript numbers to regular numbers for comparison"""
    subscripts = {
        '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
        '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    }
    normalized = formula_str
    for sub, num in subscripts.items():
        normalized = normalized.replace(sub, num)
    return normalized

def parse_formula(formula_str: str) -> Dict[str, int]:
    """Parse a chemical formula string to get element counts"""
    formula_str = normalize_formula(formula_str)
    
    # Remove charge notation
    formula_str = formula_str.replace('⁺', '').replace('⁻', '')
    
    elements = {}
    # Match element + optional count
    pattern = r'([A-Z][a-z]?)(\d*)'
    matches = re.findall(pattern, formula_str)
    
    for element, count in matches:
        count = int(count) if count else 1
        elements[element] = elements.get(element, 0) + count
    
    return elements

def get_rdkit_formula(mol) -> Dict[str, int]:
    """Get formula from RDKit molecule"""
    formula = rdMolDescriptors.CalcMolFormula(mol)
    return parse_formula(formula)

def smiles_to_mol(smiles: str) -> Tuple[Optional[object], Optional[str]]:
    """
    Convert SMILES to RDKit molecule, return (mol, error_message)
    """
    try:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return None, "RDKit could not parse SMILES"
        return mol, None
    except Exception as e:
        return None, str(e)

def validate_molecule(mol_data: Dict) -> Dict:
    """Validate a single molecule"""
    result = {
        'name': mol_data['name'],
        'formula': mol_data['formula'],
        'smiles': mol_data['smiles'],
        'is_valid': True,
        'errors': [],
        'rdkit_formula': None,
        'expected_formula': None,
    }
    
    # Try to parse SMILES
    mol, smiles_error = smiles_to_mol(mol_data['smiles'])
    
    if smiles_error:
        result['is_valid'] = False
        result['errors'].append(f"SMILES parse error: {smiles_error}")
        return result
    
    # Get RDKit formula
    rdkit_formula = get_rdkit_formula(mol)
    result['rdkit_formula'] = rdkit_formula
    
    # Parse expected formula
    expected_formula = parse_formula(mol_data['formula'])
    result['expected_formula'] = expected_formula
    
    # Compare formulas
    if rdkit_formula != expected_formula:
        result['is_valid'] = False
        result['errors'].append(f"Formula mismatch: expected {expected_formula}, got {rdkit_formula}")
    
    return result

def main():
    """Validate all molecules"""
    print("Starting SMILES validation...")
    print(f"Total molecules to validate: {len(molecules)}\n")
    
    errors_found = []
    valid_count = 0
    
    for i, mol_data in enumerate(molecules, 1):
        result = validate_molecule(mol_data)
        
        if result['is_valid']:
            valid_count += 1
            print(f"✓ [{i}/{len(molecules)}] {mol_data['name']}")
        else:
            print(f"✗ [{i}/{len(molecules)}] {mol_data['name']}")
            errors_found.append(result)
            for error in result['errors']:
                print(f"   → {error}")
    
    print(f"\n{'='*60}")
    print(f"Validation Summary:")
    print(f"{'='*60}")
    print(f"Total molecules: {len(molecules)}")
    print(f"Valid: {valid_count}")
    print(f"Invalid: {len(errors_found)}")
    print(f"Error rate: {len(errors_found)/len(molecules)*100:.1f}%")
    
    if errors_found:
        print(f"\n{'='*60}")
        print("MOLECULES WITH ERRORS:")
        print(f"{'='*60}\n")
        
        error_json = []
        for result in errors_found:
            print(f"\n{result['name']}")
            print(f"  Current SMILES: {result['smiles']}")
            print(f"  Expected formula: {result['formula']}")
            print(f"  RDKit formula: {dict_to_formula_str(result['rdkit_formula'])}")
            print(f"  Expected parsed: {result['expected_formula']}")
            print(f"  Errors: {'; '.join(result['errors'])}")
            
            error_json.append({
                'name': result['name'],
                'current_smiles': result['smiles'],
                'expected_formula': result['formula'],
                'rdkit_formula': dict_to_formula_str(result['rdkit_formula']) if result['rdkit_formula'] else None,
                'errors': result['errors'],
                'status': 'NEEDS_REVIEW'
            })
        
        # Save error report
        with open('smiles_errors.json', 'w') as f:
            json.dump(error_json, f, indent=2)
        print(f"\n\nError report saved to: smiles_errors.json")

def dict_to_formula_str(formula_dict: Dict[str, int]) -> str:
    """Convert formula dict back to string"""
    if not formula_dict:
        return ""
    
    # Order: C, H, then alphabetically
    elements = sorted(formula_dict.keys())
    if 'C' in elements:
        elements.remove('C')
        elements.insert(0, 'C')
    if 'H' in elements:
        elements.remove('H')
        if 'C' in elements:
            elements.insert(1, 'H')
        else:
            elements.insert(0, 'H')
    
    result = ""
    for elem in elements:
        count = formula_dict[elem]
        if count == 1:
            result += elem
        else:
            result += f"{elem}{count}"
    return result

if __name__ == "__main__":
    main()
