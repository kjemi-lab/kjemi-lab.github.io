# Quick Reference: SMILES Errors to Fix

## 16 Molecules Need Fixing (out of 255 total)

### CRITICAL - Incomplete/Severely Wrong (FIX FIRST)

| # | Name | Issue | Current | Recommendation |
|---|------|-------|---------|-----------------|
| 1 | **Kobalamin (B12)** | Missing 95% of structure | Fragment only | Research from PubChem CID 5311 |
| 2 | **Koensym Q10** | Truncated (missing 40+ carbons) | Partial side chain | Extend to 10-unit isoprenyl chain |
| 3 | **Cellulose** | Wrong hydration state | Glucose shown | Use cellobiose or specify monomer |

### HIGH PRIORITY - Wrong Structure (FIX SECOND)

| # | Name | Issue | Current SMILES | Correct SMILES |
|---|------|-------|-----------------|-----------------|
| 4 | Sulfon | Wrong compound (SO₂) | `O=S=O` | `CS(=O)(=O)C` |
| 5 | Nitro | Wrong compound (NO₂⁻) | `N(=O)[O]` | `C1=CC=C(C=C1)[N+](=O)[O-]` |
| 6 | Azo | Mismatched structure | Complex phenyl ether | `C1=CC=C(C=C1)N=NC2=CC=CC=C2` |
| 7 | Hemiacetal | Wrong functional group | Cyclohexanol | `CC(O)COC` |

### MEDIUM PRIORITY - Formula/Structure Mismatch (FIX THIRD)

| # | Name | Current Formula | Current SMILES | Fix |
|---|------|-----------------|-----------------|------|
| 8 | Amid | C₃H₇NO | `CC(=O)N` | Add methyl: `CC(=O)NC` |
| 9 | Karbamat | C₂H₅NO₂ | `C(=O)(N)[O-]` | Add ethoxy: `CCO C(=O)N` |
| 10 | Disulfid | C₄H₁₀S₂ | `CCSSC` | Extend: `CCCSCC` |
| 11 | Sulfonamid | C₆H₈N₂O₂S | `c1ccc(cc1)S(=O)(=O)N` | Add methyl: `c1ccc(cc1)S(=O)(=O)NC` |
| 12 | Siloksan | C₄H₁₂OSi₂ | `C[Si](C)(O[Si](C)(C)C)O` | Replace O: `C[Si](C)(O[Si](C)(C)C)C` |

### LOW PRIORITY - Formula Annotation (FIX LAST)

| # | Name | Current Formula | Current SMILES | Fix |
|---|------|-----------------|-----------------|------|
| 13 | Izocyanat | CHNO | `CN=C=O` | Update formula to: C₂H₃NO |
| 14 | Tiocyanat | CHNS | `CSC#N` | Update formula to: C₂H₃NS |
| 15 | Fosfonat | C₂H₇O₃P | `CP(=O)(O)O` | Extend: `CCP(=O)(O)O` |
| 16 | Fosfat ester | C₃H₉O₄P | `COP(=O)(O)OC` | Extend: `CCOP(=O)(O)OC` |

---

## Quick Actions Needed

### For Each Molecule:
1. Open `SMILES_CORRECTIONS_DETAILED.json`
2. Find the molecule name
3. Copy the "correct_smiles" value
4. Test it in RDKit:
   ```python
   from rdkit import Chem
   mol = Chem.MolFromSmiles("new_smiles")
   ```
5. Update molecules.js
6. Done!

### Testing Command:
```bash
python validate_all_smiles.py
```

---

## Files Reference

| File | Purpose | Use Case |
|------|---------|----------|
| SMILES_CORRECTIONS_DETAILED.json | Complete details on every error | For implementing fixes |
| SMILES_Validation_Report.md | Human-readable analysis | For understanding issues |
| README_SMILES_VALIDATION.md | This summary guide | For quick reference |
| validate_all_smiles.py | Validation script | To verify fixes |

---

## Success Metrics

- [ ] All 16 errors reviewed
- [ ] 3 critical issues researched
- [ ] 4 high-priority SMILES replaced
- [ ] 5 medium-priority structures fixed
- [ ] 3 low-priority formulas updated
- [ ] Validation script reports 0 errors
- [ ] All 255 molecules validated as correct

---

**Time to fix:** ~30 minutes for experienced chemist  
**Time to fix:** ~2 hours for thorough research and testing  

Start with the 3 critical issues, they're the most important!
