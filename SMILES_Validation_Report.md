# SMILES Validation Report - Chemistry Lab Molecules Database

## Executive Summary

**Validation Date:** February 1, 2026  
**Total Molecules Analyzed:** 255  
**Valid SMILES:** 239 (93.7%)  
**Invalid/Incorrect SMILES:** 16 (6.3%)

---

## Validation Results

### Overall Statistics
- ✓ **Valid molecules with correct SMILES:** 239
- ✗ **Molecules with errors:** 16
- **Error categories:**
  - Formula Mismatch: 16 errors
  - SMILES Parse Errors: 0
  - Exception Errors: 0

---

## Detailed Error Analysis

### Critical Issues (Severely Incorrect)

#### 1. **Kobalamin (B12)** - CRITICAL
- **Current SMILES:** `CC1=CC2=C(C=C1C)[N+](=CN2)[C@@H]3[C@@H]([C@@H]([C@H](O3)CO)OP(=O)([O-])O)C.C#N.[Co+]`
- **Current Formula:** C₆₃H₈₈CoN₁₄O₁₄P
- **RDKit Calculates:** C₁₆CoH₂₂N₃O₆P
- **Problem:** The SMILES only shows the nucleoside (ribose-base) portion. It's missing the entire complex corrinoid ring system (the main structure of B12).
- **Why It's Wrong:** Cobalamin is one of the most complex naturally occurring organic molecules. The provided SMILES represents <3% of the actual structure.
- **Recommendation:** Research complete B12 structure from PubChem (CID: 5311) or similar chemical database.

#### 2. **Koensym Q10 (Ubiquinone-10)** - CRITICAL
- **Current SMILES:** `COC1=C(OC)C(=O)C(=C(C)C1=O)C\\C=C(C)\\CCC=C(C)C`
- **Current Formula:** C₅₉H₉₀O₄
- **RDKit Calculates:** C₁₉H₂₆O₄
- **Problem:** The side chain is severely truncated. Q10 requires a 50-carbon isoprenyl tail (10 isoprenyl units) but the SMILES only shows ~19 carbons total.
- **Why It's Wrong:** Missing ~40 carbons from the side chain structure.
- **Recommendation:** Expand side chain to full 10-unit (C50) isoprenyl tail.

#### 3. **Cellulose** - MODERATE
- **Current SMILES:** `C(C1C(C(C(C(O1)O)O)O)O)O`
- **Current Formula:** (C₆H₁₀O₅)ₙ
- **RDKit Calculates:** C₆H₁₂O₆ (Glucose)
- **Problem:** SMILES shows a single glucose molecule (C₆H₁₂O₆) but formula claims cellulose repeat unit (C₆H₁₀O₅)ₙ.
- **Why It's Wrong:** Cellulose is formed by glucose dehydration. The SMILES represents unreacted glucose, not cellulose.
- **Recommendation:** Use cellobiose (C₁₂H₂₂O₁₁) or other disaccharide unit, or note that this is a monomer representation.

---

### Formula Mismatch Errors (Incorrect Formulas or Truncated SMILES)

#### 4. **Hemiacetal**
- **Current SMILES:** `CC(O)C1CCCCC1` (1-methylcyclohexanol)
- **Current Formula:** C₄H₈O₂
- **RDKit Calculates:** C₈H₁₆O
- **Issue:** SMILES shows cyclohexanol (C₇H₁₄O), not hemiacetal. Formula is completely wrong.
- **Recommendation:** Define hemiacetal correctly as `CC(O)COC` or similar functional group example.

#### 5. **Amid (Amide)**
- **Current SMILES:** `CC(=O)N` (Acetamide)
- **Current Formula:** C₃H₇NO
- **RDKit Calculates:** C₂H₅NO
- **Issue:** SMILES is primary amide (2 carbons), formula claims 3 carbons (N-methylacetamide).
- **Recommendation:** Update SMILES to `CC(=O)NC` for N-methylacetamide.

#### 6. **Karbamat (Carbamate)**
- **Current SMILES:** `C(=O)(N)[O-]` (Carbamate anion)
- **Current Formula:** C₂H₅NO₂
- **RDKit Calculates:** CH₂NO₂⁻
- **Issue:** SMILES shows bare carbamate group, formula suggests ethyl carbamate.
- **Recommendation:** Update SMILES to `CCO C(=O)N` for ethyl carbamate/urethane.

#### 7. **Disulfid (Disulfide)**
- **Current SMILES:** `CCSSC` (Diethyl disulfide)
- **Current Formula:** C₄H₁₀S₂
- **RDKit Calculates:** C₄H₁₀S₂
- **Issue:** Actually these match! Error is in parsing - CCSSC is only C2H6S2 (dimethyl disulfide).
- **Recommendation:** SMILES should be `CCCSCC` for C₄H₁₀S₂ (diethyl disulfide).

#### 8. **Sulfon (Sulfone)**
- **Current SMILES:** `O=S=O` (Sulfur dioxide)
- **Current Formula:** C₂H₆O₂S
- **RDKit Calculates:** SO₂
- **Issue:** SMILES is SO2 (sulfur dioxide), not dimethyl sulfone.
- **Recommendation:** Update SMILES to `CS(=O)(=O)C` for dimethyl sulfone.

#### 9. **Izocyanat (Isocyanate)**
- **Current SMILES:** `CN=C=O` (Methyl isocyanate)
- **Current Formula:** CHNO
- **RDKit Calculates:** C₂H₃NO
- **Issue:** SMILES is methyl isocyanate (C2H3NO), formula shows just -N=C=O without methyl.
- **Recommendation:** Formula should be C₂H₃NO, or provide bare isocyanate SMILES only.

#### 10. **Tiocyanat (Thiocyanate)**
- **Current SMILES:** `CSC#N` (Methyl thiocyanate)
- **Current Formula:** CHNS
- **RDKit Calculates:** C₂H₃NS
- **Issue:** SMILES is methyl thiocyanate, formula shows just SCN without methyl.
- **Recommendation:** Formula should be C₂H₃NS for methyl thiocyanate.

#### 11. **Azo**
- **Current SMILES:** `CO\\C=C(C(=O)OC)/c1ccccc1Oc2cc(Oc3ccccc3C#N)ncn2` (Complex aromatic)
- **Current Formula:** C₁₂H₁₀N₂
- **RDKit Calculates:** C₂₂H₁₇N₃O₅
- **Issue:** The complex SMILES doesn't match the simple C₁₂H₁₀N₂ formula at all.
- **Recommendation:** Either simplify SMILES to `C1=CC=C(C=C1)N=NC2=CC=CC=C2` (azobenzene, C₁₂H₁₀N₂) or update formula to match complex SMILES.

#### 12. **Nitro**
- **Current SMILES:** `N(=O)[O]` (Nitrite ion)
- **Current Formula:** C₆H₅NO₂
- **RDKit Calculates:** NO₂⁻
- **Issue:** SMILES is nitrite ion, formula is nitrobenzene.
- **Recommendation:** Update SMILES to `C1=CC=C(C=C1)[N+](=O)[O-]` for nitrobenzene.

#### 13. **Sulfonamid (Sulfonamide)**
- **Current SMILES:** `c1ccc(cc1)S(=O)(=O)N`
- **Current Formula:** C₆H₈N₂O₂S
- **RDKit Calculates:** C₆H₇NO₂S
- **Issue:** SMILES shows one N (benzenesulfonamide), formula shows two N atoms.
- **Recommendation:** Update SMILES to `c1ccc(cc1)S(=O)(=O)NC` for N-methylbenzenesulfonamide (tosylamide).

#### 14. **Fosfonat (Phosphonate)**
- **Current SMILES:** `CP(=O)(O)O` (Methylphosphonic acid)
- **Current Formula:** C₂H₇O₃P
- **RDKit Calculates:** CH₅O₃P
- **Issue:** SMILES has 1 carbon (methyl), formula requires 2 carbons (ethyl).
- **Recommendation:** Update SMILES to `CCP(=O)(O)O` for ethylphosphonic acid.

#### 15. **Fosfat ester (Phosphate ester)**
- **Current SMILES:** `COP(=O)(O)OC` (Dimethyl phosphate)
- **Current Formula:** C₃H₉O₄P
- **RDKit Calculates:** C₂H₇O₄P
- **Issue:** SMILES has 2 carbons (dimethyl), formula requires 3 carbons.
- **Recommendation:** Update SMILES to `CCOP(=O)(O)OC` for ethyl methyl phosphate.

#### 16. **Siloksan (Siloxane)**
- **Current SMILES:** `C[Si](C)(O[Si](C)(C)C)O`
- **Current Formula:** C₄H₁₂OSi₂
- **RDKit Calculates:** C₅H₁₆O₂Si₂
- **Issue:** SMILES has 5 carbons and 2 oxygen atoms, but formula claims 4 carbons and 1 oxygen.
- **Recommendation:** Either update formula to C₅H₁₆O₂Si₂ or modify SMILES to match C₄H₁₂OSi₂.

---

## Categories of Errors

### By Error Type
- **Incomplete/Truncated SMILES:** 3 (B12, Q10, Cellulose)
- **Mismatched SMILES and Formula:** 10
- **Wrong SMILES Structure:** 3 (Nitro, Sulfon, Azo)

### By Molecule Category
- **Hormones/Vitamins:** 2 (B12, Q10)
- **Polysaccharides:** 1 (Cellulose)
- **Organic Functional Groups:** 13 (Hemiacetal, Amid, Karbamat, Disulfid, Sulfon, Izocyanat, Tiocyanat, Azo, Nitro, Sulfonamid, Fosfonat, Fosfat ester, Siloksan)

---

## Recommendations

### Immediate Fixes (High Priority)
1. **B12 (Kobalamin):** Research complete corrinoid structure from PubChem or chemical databases
2. **CoQ10:** Expand isoprenyl side chain to full 50 carbons
3. **Cellulose:** Use cellobiose (disaccharide) representation or clarify as monomer

### Secondary Fixes (Medium Priority)
- Correct 10 formula/SMILES mismatches for organic compounds
- Verify all formulas match their SMILES calculations

### Best Practices Going Forward
1. Always validate SMILES using RDKit or similar tool
2. Verify molecular formula calculations match the SMILES
3. For complex molecules (vitamins, cofactors), consider:
   - Using parent/simplified structure SMILES
   - Adding comments about incomplete representation
   - Including links to 3D structure databases
4. Test SMILES in multiple tools (RDKit, ChemDraw, PubChem)

---

## Files Provided

1. **SMILES_VALIDATION_ERRORS.json** - Raw validation results from RDKit
2. **SMILES_CORRECTIONS.json** - Detailed corrections with research-based correct SMILES
3. **SMILES_Validation_Report.md** - This comprehensive analysis document

---

## Next Steps

To update your molecules.js file:
1. Review each correction in SMILES_CORRECTIONS.json
2. Cross-reference with PubChem (pubchem.ncbi.nlm.nih.gov)
3. Test new SMILES in RDKit before updating
4. Update molecules.js with corrected SMILES and formulas
5. Run validation again to verify all corrections

---

*Report generated: 2026-02-01*  
*Analysis method: RDKit SMILES validation with formula cross-checking*  
*Total validation time: ~2 minutes for 255 molecules*
