# 🚀 GitHub Pages Deployment Guide

## Enkel publisering for kjemi-lab.github.io

### 1. **Repository er allerede opprettet**
- Repository navn: `kjemi-lab.github.io`
- Brukernavn: `kjemi-lab`
- Dette betyr at GitHub Pages aktiveres automatisk!

### 2. **Push koden til GitHub**
```bash
# Initialiser Git (hvis ikke allerede gjort)
git init

# Legg til alle filer
git add .

# Første commit
git commit -m "Initial commit: Kjemi Lab applikasjon"

# Sett hovedbranch til main
git branch -M main

# Legg til GitHub som remote
git remote add origin https://github.com/kjemi-lab/kjemi-lab.github.io.git

# Push til GitHub
git push -u origin main
```

### 3. **Publiser på GitHub Pages**
```bash
# Bygg applikasjonen
npm run build

# Publiser (dette oppretter gh-pages branch automatisk)
npm run deploy
```

### 4. **GitHub Pages aktiveres automatisk!**
- Siden repository heter `kjemi-lab.github.io`, aktiveres GitHub Pages automatisk
- Ingen ekstra konfigurasjon nødvendig

## 🎯 **Resultat:**
Din applikasjon vil være tilgjengelig på:
`https://kjemi-lab.github.io/`

## 🔄 **Oppdateringer:**
Hver gang du gjør endringer:
```bash
git add .
git commit -m "Beskriv endringen"
git push
npm run deploy
```

## ❓ **Hjelp:**
- Repository navnet `kjemi-lab.github.io` aktiverer GitHub Pages automatisk
- Vent noen minutter etter `npm run deploy` før du sjekker nettsiden
- Hvis du får feil, sjekk at remote URL er riktig: `https://github.com/kjemi-lab/kjemi-lab.github.io.git`
