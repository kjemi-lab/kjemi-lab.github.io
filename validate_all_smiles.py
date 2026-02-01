#!/usr/bin/env python3
"""
Comprehensive SMILES Validator for all 287 molecules
Validates molecular SMILES codes and identifies errors
"""

import json
import re
import sys
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors
from typing import Dict, List, Tuple, Optional

# Fix encoding for Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Full molecules data from molecules.js
molecules_data = '''
Estradiol,C₁₈H₂₄O₂,C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@@H]2O)CCC4=C3C=CC(=C4)O
Testosteron,C₁₉H₂₈O₂,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@H]4O)C
Kortisol,C₂₁H₃₀O₅,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O
Adrenalin,C₉H₁₃NO₃,CNC[C@@H](C1=CC(=C(C=C1)O)O)O
Oxytocin,C₄₃H₆₆N₁₂O₁₂S₂,CC[C@H](C)[C@H]1C(=O)N[C@H](C(=O)N[C@H](C(=O)N[C@@H](CSSC[C@@H](C(=O)N[C@H](C(=O)N1)CC2=CC=C(C=C2)O)N)C(=O)N3CCC[C@H]3C(=O)N[C@@H](CC(C)C)C(=O)NCC(=O)N)CC(=O)N)CCC(=O)N
Thyroxin,C₁₅H₁₁I₄NO₄,C1=C(C=C(C(=C1I)OC2=CC(=C(C(=C2)I)O)I)I)C[C@@H](C(=O)O)N
Progesteron,C₂₁H₃₀O₂,CC(=O)[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CCC4=CC(=O)CC[C@]34C)C
Melatonin,C₁₃H₁₆N₂O₂,CC(=O)NCCC1=CNC2=C1C=C(C=C2)OC
Aldosteron,C₂₁H₂₈O₅,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@H]4C(=O)CO)C=O)O
DHEA,C₁₉H₂₈O₂,C[C@]12CC[C@H]3[C@H]([C@@H]1CCC2=O)CC=C4[C@@]3(CC[C@@H](C4)O)C
Estron,C₁₈H₂₂O₂,C[C@]12CC[C@H]3[C@H]([C@@H]1CCC2=O)CCC4=C3C=CC(=C4)O
Estriol,C₁₈H₂₄O₃,C[C@]12CC[C@H]3[C@H]([C@@H]1C[C@H]([C@@H]2O)O)CCC4=C3C=CC(=C4)O
Dihydrotestosteron,C₁₉H₃₀O₂,C[C@]12CCC(=O)C[C@@H]1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@@H]4O)C
Triiodotyronin,C₁₅H₁₂I₃NO₄,C1=CC(=C(C=C1OC2=C(C=C(C=C2I)C[C@@H](C(=O)O)N)I)I)O
Kortison,C₂₁H₂₈O₅,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2C(=O)C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C
Prostaglandin E2,C₂₀H₃₂O₅,CCCCC[C@@H](/C=C/[C@H]1[C@@H](CC(=O)[C@@H]1C/C=C\\CCCC(=O)O)O)O
Calcitriol,C₂₇H₄₄O₃,C[C@H](CCCC(C)(C)O)[C@H]1CC[C@@H]\\2[C@@]1(CCC/C2=C\\C=C/3\\C[C@H](C[C@@H](C3=C)O)O)C
Epinefrin,C₉H₁₃NO₃,CNC[C@@H](C1=CC(=C(C=C1)O)O)O
Prednisolon,C₂₁H₂₈O₅,C[C@]12C[C@@H]([C@H]3[C@H]([C@@H]1CC[C@@]2(C(=O)CO)O)CCC4=CC(=O)C=C[C@]34C)O
Dexametason,C₂₂H₂₉FO₅,C[C@@H]1C[C@H]2[C@@H]3CCC4=CC(=O)C=C[C@@]4([C@]3([C@H](C[C@@]2([C@]1(C(=O)CO)O)C)O)F)C
Androstenedion,C₁₉H₂₆O₂,C[C@]12CC[C@H]3[C@@H](CCC4=CC(=O)CC[C@]34C)[C@@H]1CCC2=O
Noretyndron,C₂₀H₂₆O₂,C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=CC(=O)CC[C@H]34
Etinylestradiol,C₂₀H₂₄O₂,C[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=C3C=CC(=C4)O
Levonorgestrel,C₂₁H₂₈O₂,CC[C@]12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=CC(=O)CC[C@H]34
Hydrokortison,C₂₁H₃₀O₅,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2[C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O
Betametason,C₂₂H₂₉FO₅,C[C@H]1C[C@H]2[C@@H]3CCC4=CC(=O)C=C[C@@]4([C@]3([C@H](C[C@@]2([C@]1(C(=O)CO)O)C)O)F)C
Fludrokortison,C₂₁H₂₉FO₅,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@]2([C@H](C[C@]4([C@H]3CC[C@@]4(C(=O)CO)O)C)O)F
Medroksyprogesteron,C₂₂H₃₂O₃,C[C@H]1C[C@@H]2[C@H](CC[C@]3([C@H]2CC[C@@]3(C(=O)C)O)C)[C@@]4(C1=CC(=O)CC4)C
17-Hydroksyprogesteron,C₂₁H₃₀O₃,CC(=O)[C@]1(CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CCC4=CC(=O)CC[C@]34C)C)O
Prostaglandin F2α,C₂₀H₃₄O₅,CCCCC[C@@H](/C=C/[C@H]1[C@@H](C[C@@H]([C@@H]1C/C=C/CCCC(=O)O)O)O)O
Tromboxan B2,C₂₀H₃₄O₆,CCCCC[C@@H](/C=C/[C@@H]1[C@H]([C@H](CC(O1)O)O)C/C=C\\CCCC(=O)O)O
Metyltestosteron,C₂₀H₃₀O₂,C[C@]12CCC(=O)C=C1CC[C@@H]3[C@@H]2CC[C@]4([C@H]3CC[C@]4(C)O)C
Mesterolon,C₂₀H₃₂O₂,C[C@H]1CC(=O)C[C@H]2[C@]1([C@H]3CC[C@]4([C@H]([C@@H]3CC2)CC[C@@H]4O)C)C
Drospirenon,C₂₄H₃₀O₃,C[C@]12CCC(=O)C=C1[C@@H]3C[C@@H]3[C@@H]4[C@@H]2CC[C@]5([C@H]4[C@@H]6C[C@@H]6[C@@]57CCC(=O)O7)C
Cyproteronacetat,C₂₄H₂₉ClO₄,CC(=O)[C@]1(CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2C=C(C4=CC(=O)[C@@H]5C[C@@H]5[C@]34C)Cl)C)OC(=O)C
Spironolakton,C₂₄H₃₂O₄S,CC(=O)S[C@@H]1CC2=CC(=O)CC[C@@]2([C@@H]3[C@@H]1[C@@H]4CC[C@]5([C@]4(CC3)C)CCC(=O)O5)C
Prostaglandin I2,C₂₀H₃₂O₅,CCCCC[C@@H](/C=C/[C@H]1[C@@H](C[C@H]2[C@@H]1C/C(=C/CCCC(=O)O)/O2)O)O
Retinoinsyre,C₂₀H₂₈O₂,CC1=C(C(CCC1)(C)C)/C=C/C(=C/C=C/C(=C/C(=O)O)/C)/C
Serotonin,C₁₀H₁₂N₂O,C1=CC2=C(C=C1O)C(=CN2)CCN
Dopamin,C₈H₁₁NO₂,C1=CC(=C(C=C1CCN)O)O
Noradrenalin,C₈H₁₁NO₃,C1=CC(=C(C=C1[C@H](CN)O)O)O
Acetylkolin,C₇H₁₆NO₂⁺,CC(=O)OCC[N+](C)(C)C
GABA,C₄H₉NO₂,C(CC(=O)O)CN
Glutamat,C₅H₉NO₄,N[C@@H](CCC(O)=O)C(O)=O
Histamin,C₅H₉N₃,NCCc1c[nH]cn1
Vitamin C,C₆H₈O₆,C([C@@H]([C@@H]1C(=C(C(=O)O1)O)O)O)O
Vitamin A,C₂₀H₃₀O,CC1=C(C(CCC1)(C)C)/C=C/C(=C/C=C/C(=C/CO)/C)/C
Vitamin D3,C₂₇H₄₄O,C[C@H](CCCC(C)C)[C@H]1CC[C@@H]\\2[C@@]1(CCC/C2=C\\C=C/3\\C[C@H](CCC3=C)O)C
Vitamin E,C₂₉H₅₀O₂,CC1=C(C2=C(CC[C@@](O2)(C)CCC[C@H](C)CCC[C@H](C)CCCC(C)C)C(=C1O)C)C
Vitamin K1,C₃₁H₄₆O₂,CC1=C(C(=O)C2=CC=CC=C2C1=O)C/C=C(\\C)/CCC[C@H](C)CCC[C@H](C)CCCC(C)C
Thiamin (B1),C₁₂H₁₇N₄OS⁺,CC1=C(SC=[N+]1CC2=CN=C(N=C2N)C)CCO
Riboflavin (B2),C₁₇H₂₀N₄O₆,CC1=CC2=C(C=C1C)N(C3=NC(=O)NC(=O)C3=N2)C[C@@H]([C@@H]([C@@H](CO)O)O)O
Niacin (B3),C₆H₅NO₂,C1=CC(=CN=C1)C(=O)O
Pyridoksin (B6),C₈H₁₁NO₃,CC1=NC=C(C(=C1O)CO)CO
Biotin (B7),C₁₀H₁₆N₂O₃S,C1[C@H]2[C@@H]([C@@H](S1)CCCCC(=O)O)NC(=O)N2
Folsyre (B9),C₁₉H₁₉N₇O₆,C1=CC(=CC=C1C(=O)N[C@@H](CCC(=O)O)C(=O)O)NCC2=CN=C3C(=N2)C(=O)NC(=N3)N
Kobalamin (B12),C₆₃H₈₈CoN₁₄O₁₄P,CC1=CC2=C(C=C1C)[N+](=CN2)[C@@H]3[C@@H]([C@@H]([C@H](O3)CO)OP(=O)([O-])O)C.C#N.[Co+]
Paracetamol,C₈H₉NO₂,CC(=O)NC1=CC=C(C=C1)O
Ibuprofen,C₁₃H₁₈O₂,CC(C)CC1=CC=C(C=C1)C(C)C(=O)O
Acetylsalisylsyre,C₉H₈O₄,CC(=O)OC1=CC=CC=C1C(=O)O
Metformin,C₄H₁₁N₅,CN(C)C(=N)N=C(N)N
Atenolol,C₁₄H₂₂N₂O₃,CC(C)NCC(COC1=CC=C(C=C1)CC(=O)N)O
Omeprazol,C₁₇H₁₉N₃O₃S,CC1=CN=C(C(=C1OC)C)CS(=O)C2=NC3=C(N2)C=C(C=C3)OC
Amoksicillin,C₁₆H₁₉N₃O₅S,CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)[C@@H](C3=CC=C(C=C3)O)N)C(=O)O)C
Koffein,C₈H₁₀N₄O₂,CN1C=NC2=C1C(=O)N(C(=O)N2C)C
Morfium,C₁₇H₁₉NO₃,CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O
Diazepam,C₁₆H₁₃ClN₂O,CN1C(=O)CN=C(C2=C1C=CC(=C2)Cl)C3=CC=CC=C3
Lisinopril,C₂₁H₃₁N₃O₅,C1C[C@H](N(C1)C(=O)[C@H](CCCCN)N[C@@H](CCC2=CC=CC=C2)C(=O)O)C(=O)O
Simvastatin,C₂₅H₃₈O₅,CCC(C)(C)C(=O)O[C@H]1C[C@H](C=C2[C@H]1[C@H]([C@H](C=C2)C)CC[C@@H]3C[C@H](CC(=O)O3)O)C
Sertralin,C₁₇H₁₇Cl₂N,CN[C@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl
Metoprolol,C₁₅H₂₅NO₃,CC(C)NCC(COC1=CC=C(C=C1)CCOC)O
Losartan,C₂₂H₂₃ClN₆O,CCCCC1=NC(=C(N1CC2=CC=C(C=C2)C3=CC=CC=C3C4=NNN=N4)CO)Cl
Glycin,C₂H₅NO₂,C(C(=O)O)N
Alanin,C₃H₇NO₂,C[C@@H](C(=O)O)N
Valin,C₅H₁₁NO₂,CC(C)[C@@H](C(=O)O)N
Leucin,C₆H₁₃NO₂,CC(C)C[C@@H](C(=O)O)N
Isoleucin,C₆H₁₃NO₂,CC[C@H](C)[C@@H](C(=O)O)N
Prolin,C₅H₉NO₂,C1C[C@H](NC1)C(=O)O
Serin,C₃H₇NO₃,C([C@@H](C(=O)O)N)O
Treonin,C₄H₉NO₃,C[C@H]([C@@H](C(=O)O)N)O
Cystein,C₃H₇NO₂S,C([C@@H](C(=O)O)N)S
Metionin,C₅H₁₁NO₂S,CSCC[C@@H](C(=O)O)N
Aspartat,C₄H₇NO₄,C([C@@H](C(=O)O)N)C(=O)O
Glutamin,C₅H₁₀N₂O₃,C(CC(=O)N)[C@@H](C(=O)O)N
Lysin,C₆H₁₄N₂O₂,C(CCN)C[C@@H](C(=O)O)N
Arginin,C₆H₁₄N₄O₂,C(C[C@@H](C(=O)O)N)CN=C(N)N
Histidin,C₆H₉N₃O₂,C1=C(NC=N1)C[C@@H](C(=O)O)N
Fenylalanin,C₉H₁₁NO₂,C1=CC=C(C=C1)C[C@@H](C(=O)O)N
Tyrosin,C₉H₁₁NO₃,C1=CC(=CC=C1C[C@@H](C(=O)O)N)O
Tryptofan,C₁₁H₁₂N₂O₂,C1=CC=C2C(=C1)C(=CN2)C[C@@H](C(=O)O)N
Asparagin,C₄H₈N₂O₃,C([C@@H](C(=O)O)N)C(=O)N
Glukose,C₆H₁₂O₆,C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)O)O)O)O
Fruktose,C₆H₁₂O₆,C1[C@H]([C@H]([C@@H](C(O1)(CO)O)O)O)O
Sukrose,C₁₂H₂₂O₁₁,C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@]2([C@H]([C@@H]([C@H](O2)CO)O)O)CO)O)O)O)O
Laktose,C₁₂H₂₂O₁₁,C([C@@H]1[C@@H]([C@@H]([C@H]([C@@H](O1)O[C@@H]2[C@H](OC([C@@H]([C@H]2O)O)O)CO)O)O)O)O
Ribose,C₅H₁₀O₅,C1[C@H]([C@H]([C@H](C(O1)O)O)O)O
Deoksyribose,C₅H₁₀O₄,C(C=O)[C@@H]([C@@H](CO)O)O
Maltose,C₁₂H₂₂O₁₁,C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O[C@@H]2[C@H](OC([C@@H]([C@H]2O)O)O)CO)O)O)O)O
Galaktose,C₆H₁₂O₆,C([C@@H]1[C@@H]([C@@H]([C@H](C(O1)O)O)O)O)O
Mannose,C₆H₁₂O₆,C([C@@H]1[C@H]([C@@H]([C@@H](C(O1)O)O)O)O)O
Sorbitol,C₆H₁₄O₆,C([C@H]([C@H]([C@@H]([C@H](CO)O)O)O)O)O
Xylitol,C₅H₁₂O₅,C([C@H](C([C@H](CO)O)O)O)O
Arabinose,C₅H₁₀O₅,C1[C@@H]([C@@H]([C@H](C(O1)O)O)O)O
Fruktose-6-fosfat,C₆H₁₃O₉P,C([C@H]([C@H]([C@@H](C(=O)CO)O)O)O)OP(=O)(O)O
Glukosamin,C₆H₁₃NO₅,C([C@@H]1[C@H]([C@@H]([C@H](C(O1)O)N)O)O)O
Cellulose,(C₆H₁₀O₅)ₙ,C(C1C(C(C(C(O1)O)O)O)O)O
Acetaldehyd,C₂H₄O,CC=O
Etylamin,C₂H₇N,CCN
Etanol,C₂H₆O,CCO
Metanol,CH₄O,CO
Formaldehyd,CH₂O,C=O
Eddikesyre,C₂H₄O₂,CC(=O)O
Propionsyre,C₃H₆O₂,CCC(=O)O
Smørsyre,C₄H₈O₂,CCCC(=O)O
Valeriansyre,C₅H₁₀O₂,CCCCC(=O)O
Kapronsyre,C₆H₁₂O₂,CCCCCC(=O)O
Palmitinsyre,C₁₆H₃₂O₂,CCCCCCCCCCCCCCCC(=O)O
Stearinsyre,C₁₈H₃₆O₂,CCCCCCCCCCCCCCCCCC(=O)O
Oleinsyre,C₁₈H₃₄O₂,CCCCCCCC/C=C\\CCCCCCCC(=O)O
Linolensyre,C₁₈H₃₀O₂,CC/C=C\\C/C=C\\C/C=C\\CCCCCCCC(=O)O
Linolsyre,C₁₈H₃₂O₂,CCCCC/C=C\\C/C=C\\CCCCCCCC(=O)O
Arakidonsyre,C₂₀H₃₂O₂,CCCCC/C=C\\C/C=C\\C/C=C\\C/C=C\\CCCC(=O)O
Nikotin,C₁₀H₁₄N₂,CN1CCC[C@H]1C2=CN=CC=C2
Kinidin,C₂₀H₂₄N₂O₂,COC1=CC2=C(C=CN=C2C=C1)[C@@H]([C@H]3C[C@@H]4CCN3C[C@@H]4C=C)O
Kokain,C₁₇H₂₁NO₄,CN1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)C3=CC=CC=C3)C(=O)OC
Atropin,C₁₇H₂₃NO₃,CN1[C@@H]2CC[C@H]1CC(C2)OC(=O)C(CO)C3=CC=CC=C3
Kinin,C₂₀H₂₄N₂O₂,COC1=CC2=C(C=CN=C2C=C1)[C@H]([C@@H]3C[C@@H]4CCN3C[C@@H]4C=C)O
Kodein,C₁₈H₂₁NO₃,CN1CC[C@]23[C@@H]4[C@H]1CC5=C2C(=C(C=C5)OC)O[C@H]3[C@H](C=C4)O
Kapsaikin,C₁₈H₂₇NO₃,CC(C)/C=C/CCCCC(=O)NCC1=CC(=C(C=C1)O)OC
Teobromin,C₇H₈N₄O₂,CN1C=NC2=C1C(=O)NC(=O)N2C
Stryknin,C₂₁H₂₂N₂O₂,C1CN2CC3=CCO[C@H]4CC(=O)N5[C@H]6[C@H]4[C@H]3C[C@H]2[C@@]61C7=CC=CC=C75
Etylen,C₂H₄,C=C
Acetylen,C₂H₂,C#C
Benzen,C₆H₆,C1=CC=CC=C1
Toluen,C₇H₈,CC1=CC=CC=C1
Fenol,C₆H₆O,C1=CC=C(C=C1)O
Anilin,C₆H₇N,C1=CC=C(C=C1)N
Benzoesyre,C₇H₆O₂,C1=CC=C(C=C1)C(=O)O
Aceton,C₃H₆O,CC(=O)C
Dietyleter,C₄H₁₀O,CCOCC
Tetrahydrofuran,C₄H₈O,C1CCOC1
Diklormetan,CH₂Cl₂,C(Cl)Cl
Kloroform,CHCl₃,C(Cl)(Cl)Cl
Etylacetat,C₄H₈O₂,CCOC(=O)C
Amoniakk,NH₃,N
Urea,CH₄N₂O,C(=O)(N)N
Metan,CH₄,C
Etan,C₂H₆,CC
Propan,C₃H₈,CCC
Butan,C₄H₁₀,CCCC
Cykloheksan,C₆H₁₂,C1CCCCC1
Naftalen,C₁₀H₈,C1=CC=C2C=CC=CC2=C1
Antracen,C₁₄H₁₀,C1=CC=C2C=C3C=CC=CC3=CC2=C1
Pyridin,C₅H₅N,C1=CC=NC=C1
Furan,C₄H₄O,C1=COC=C1
Tiofen,C₄H₄S,C1=CSC=C1
Imidazol,C₃H₄N₂,C1=CN=CN1
Indol,C₈H₇N,C1=CC=C2C(=C1)C=CN2
Vanillin,C₈H₈O₃,COC1=C(C=CC(=C1)C=O)O
Eugenol,C₁₀H₁₂O₂,COC1=C(C=CC(=C1)CC=C)O
Salicylsyre,C₇H₆O₃,C1=CC=C(C(=C1)C(=O)O)O
Sitronsyre,C₆H₈O₇,C(C(=O)O)C(CC(=O)O)(C(=O)O)O
Melkesyre,C₃H₆O₃,CC(C(=O)O)O
Pyruvinsyre,C₃H₄O₃,CC(=O)C(=O)O
Oksalsyre,C₂H₂O₄,C(=O)(C(=O)O)O
Malonsyre,C₃H₄O₄,C(C(=O)O)C(=O)O
Sukkinsyre,C₄H₆O₄,C(CC(=O)O)C(=O)O
Fumarsyre,C₄H₄O₄,C(=C/C(=O)O)\\C(=O)O
Maleinsyre,C₄H₄O₄,C(=C\\C(=O)O)\\C(=O)O
Acetoncyanhydrin,C₄H₇NO,CC(C)(C#N)O
Benzaldehyd,C₇H₆O,C1=CC=C(C=C1)C=O
Asetofenon,C₈H₈O,CC(=O)C1=CC=CC=C1
Benzonitril,C₇H₅N,C1=CC=C(C=C1)C#N
Kreatin,C₄H₉N₃O₂,CN(CC(=O)O)C(=N)N
Taurin,C₂H₇NO₃S,C(CS(=O)(=O)O)N
Karnitin,C₇H₁₅NO₃,C[N+](C)(C)C[C@@H](CC(=O)[O-])O
Koensym Q10,C₅₉H₉₀O₄,COC1=C(OC)C(=O)C(=C(C)C1=O)C\\C=C(C)\\CCC=C(C)C
Resveratrol,C₁₄H₁₂O₃,C1=CC(=CC=C1/C=C/C2=CC(=CC(=C2)O)O)O
Kurkumin,C₂₁H₂₀O₆,COC1=C(C=CC(=C1)/C=C/C(=O)CC(=O)/C=C/C2=CC(=C(C=C2)O)OC)O
Quercetin,C₁₅H₁₀O₇,C1=CC(=C(C=C1C2=C(C(=O)C3=C(C=C(C=C3O2)O)O)O)O)O
Epigallocatechingallat,C₂₂H₁₈O₁₁,C1[C@H]([C@H](OC2=CC(=CC(=C21)O)O)C3=CC(=C(C(=C3)O)O)O)OC(=O)C4=CC(=C(C(=C4)O)O)O
Alpha-liponsyre,C₈H₁₄O₂S₂,C1CSSC1CCCCC(=O)O
Omega-3 DHA,C₂₂H₃₂O₂,CC/C=C\\C/C=C\\C/C=C\\C/C=C\\C/C=C\\C/C=C\\CCC(=O)O
L-Glutathion,C₁₀H₁₇N₃O₆S,C(CC(=O)N[C@@H](CS)C(=O)NCC(=O)O)[C@@H](C(=O)O)N
D-Ribose,C₅H₁₀O₅,C1[C@H]([C@H]([C@H](C(O1)O)O)O)O
PQQ,C₁₄H₆N₂O₈,C1=C(C2=C(C(=O)C(=O)C3=C2NC(=C3)C(=O)O)N=C1C(=O)O)C(=O)O
Acetonitril,C₂H₃N,CC#N
DMSO,C₂H₆OS,CS(=O)C
DMA,C₄H₉NO,CC(=O)N(C)C
DMF,C₃H₇NO,CN(C)C=O
NMP,C₅H₉NO,CN1CCCC1=O
Heksan,C₆H₁₄,CCCCCC
Heptan,C₇H₁₆,CCCCCCC
Sykloheksanon,C₆H₁₀O,C1CCC(=O)CC1
2-propanol,C₃H₈O,CC(C)O
1-butanol,C₄H₁₀O,CCCCO
4-Metylpyridin,C₆H₇N,CC1=CC=NC=C1
Trietylenamin,C₆H₁₅N,CCN(CC)CC
Natriumoksalat,Na₂C₂O₄,C(=O)(C(=O)[O-])[O-].[Na+].[Na+]
Etyllaktat,C₅H₁₀O₃,CCOC(=O)C(C)O
Trietylfosfat,C₆H₁₅O₄P,CCOP(=O)(OCC)OCC
Dimetylsulfat,C₂H₆O₄S,COS(=O)(=O)OC
Etylnitrat,C₂H₅NO₃,CCO[N+](=O)[O-]
Dietylkarbonat,C₅H₁₀O₃,CCOC(=O)OCC
Hydroksylamin,H₃NO,NO
Metylamin,CH₅N,CN
Metylazid,CH₃N₃,CN=[N+]=[N-]
H2O2,H₂O₂,OO
Dioksygen,O₂,O=O
Distikstoffoksid,N₂O,[N-]=[N+]=O
NO,NO,[N]=O
CO,CO,[C-]#[O+]
CO2,CO₂,O=C=O
CS2,CS₂,S=C=S
SO2,SO₂,O=S=O
H2S,H₂S,[H]S[H]
NH3,NH₃,[NH3]
PH3,PH₃,[PH3]
BH3,BH₃,[BH3]
SiH4,SiH₄,[SiH4]
Etylenoksid,C₂H₄O,C1CO1
Propylenoksid,C₃H₆O,CC1CO1
Pyrrol,C₄H₅N,C1=CNC=C1
Pyrrolidin,C₄H₉N,C1CCNC1
Piperidin,C₅H₁₁N,C1CCNCC1
Morpholin,C₄H₉NO,C1COCCN1
Piperazin,C₄H₁₀N₂,C1CNCCN1
Azetidin,C₃H₇N,C1CNC1
Epoksid,C₂H₄O,C1CO1
Laktam,C₄H₇NO,C1CCC(=O)N1
Lakton,C₄H₆O₂,C1CC(=O)OC1
Anhydrid,C₄H₆O₃,CC(=O)OC(=O)C
Acetal,C₆H₁₄O₂,CCOC(C)OCC
Ketal,C₆H₁₂O₂,CC1(OC(C)(C)O1)C
Hemiacetal,C₄H₈O₂,CC(O)C1CCCCC1
Ester,C₄H₈O₂,CCOC(=O)C
Amid,C₃H₇NO,CC(=O)N
Karbamat,C₂H₅NO₂,C(=O)(N)[O-]
Tioeter,C₄H₁₀S,CCSCC
Disulfid,C₄H₁₀S₂,CCSSC
Sulfoksid,C₂H₆OS,CS(C)=O
Sulfon,C₂H₆O₂S,O=S=O
Nitril,C₂H₃N,CC#N
Izocyanat,CHNO,CN=C=O
Tiocyanat,CHNS,CSC#N
Fenylazid,C₆H₅N₃,C1=CC=C(C=C1)N=[N+]=[N-]
Benzendiazonium,C₆H₅N₂⁺,N#[N+]c1ccccc1
Azo,C₁₂H₁₀N₂,CO\\C=C(C(=O)OC)/c1ccccc1Oc2cc(Oc3ccccc3C#N)ncn2
Nitro,C₆H₅NO₂,N(=O)[O]
Sulfonamid,C₆H₈N₂O₂S,c1ccc(cc1)S(=O)(=O)N
Fosfonat,C₂H₇O₃P,CP(=O)(O)O
Fosfat ester,C₃H₉O₄P,COP(=O)(O)OC
Boronsyre,BH₃O₃,B(O)(O)O
Siloksan,C₄H₁₂OSi₂,C[Si](C)(O[Si](C)(C)C)O
Organotin,C₄H₁₂Sn,C[Sn](C)(C)C
'''

def normalize_formula(formula_str: str) -> str:
    """Convert subscript numbers to regular numbers"""
    subscripts = {
        '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
        '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    }
    normalized = formula_str
    for sub, num in subscripts.items():
        normalized = normalized.replace(sub, num)
    return normalized

def parse_formula(formula_str: str) -> Dict[str, int]:
    """Parse chemical formula to get element counts"""
    formula_str = normalize_formula(formula_str)
    formula_str = formula_str.replace('⁺', '').replace('⁻', '')
    
    # Handle repeating units like (C6H10O5)n
    formula_str = formula_str.replace('(', '').replace(')', 'n').replace('n', '')
    
    elements = {}
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

def validate_smiles(smiles: str) -> Tuple[Optional[object], Optional[str]]:
    """Convert SMILES to molecule or return error"""
    try:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return None, "RDKit could not parse SMILES"
        return mol, None
    except Exception as e:
        return None, str(e)

def validate_all():
    """Validate all molecules"""
    lines = molecules_data.strip().split('\n')
    
    print(f"Validating {len(lines)} molecules...\n")
    
    errors = []
    valid_count = 0
    
    for i, line in enumerate(lines, 1):
        parts = line.split(',')
        if len(parts) < 3:
            continue
        
        name = parts[0].strip()
        formula = parts[1].strip()
        smiles = parts[2].strip()
        
        mol, error = validate_smiles(smiles)
        
        if error:
            errors.append({
                'name': name,
                'formula': formula,
                'smiles': smiles,
                'error': error
            })
            print(f"X [{i}/{len(lines)}] {name}: {error}")
        else:
            rdkit_formula = get_rdkit_formula(mol)
            expected_formula = parse_formula(formula)
            
            if rdkit_formula != expected_formula:
                errors.append({
                    'name': name,
                    'formula': formula,
                    'smiles': smiles,
                    'error': f"Formula mismatch: expected {expected_formula}, got {rdkit_formula}",
                    'expected': expected_formula,
                    'rdkit': rdkit_formula
                })
                print(f"X [{i}/{len(lines)}] {name}: Formula mismatch")
            else:
                valid_count += 1
                print(f"O [{i}/{len(lines)}] {name}")
    
    print(f"\n{'='*60}")
    print(f"Summary: {valid_count} valid, {len(errors)} errors out of {len(lines)} molecules")
    print(f"{'='*60}\n")
    
    if errors:
        with open('smiles_validation_errors.json', 'w', encoding='utf-8') as f:
            json.dump(errors, f, indent=2, ensure_ascii=False)
        print(f"Error report saved to: smiles_validation_errors.json")
        
        # Print details
        print("ERRORS FOUND:")
        for err in errors:
            print(f"\n{err['name']}")
            print(f"  Formula (file): {err['formula']}")
            print(f"  SMILES: {err['smiles']}")
            print(f"  Error: {err['error']}")

if __name__ == "__main__":
    validate_all()
