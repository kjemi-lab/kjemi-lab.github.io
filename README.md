# Kjemi Lab - Periodisk Tabell & 3D Atom-visualisering

En avansert, interaktiv web-applikasjon for kjemiundervisning som kombinerer moderne web-teknologi med pedagogisk design for å skape en omfattende plattform hvor brukere kan utforske det periodiske systemet, bygge sine egne atomer, og få en dyp forståelse av atomstruktur gjennom 3D-visualisering.

## 🌟 Funksjoner

### 🧪 Periodisk Tabell
- **118 grunnstoff** med nøyaktige vitenskapelige data
- **Norsk språkstøtte** - alle grunnstoffnavn oversatt til norsk
- **Kategorisering** i 9 ulike typer med fargekoding
- **Søk og filtrering** etter navn, symbol og kategori
- **Responsivt design** som tilpasser seg alle enheter

### 🔬 3D Atom-visualisering
- **Interaktive 3D-modeller** bygget med Three.js
- **Realistisk rendering** av protoner, nøytroner og elektroner
- **Mus-kontrollert rotasjon** og zoom-funksjonalitet
- **Automatisk animasjon** av elektronbaner
- **Tilpasset størrelse** basert på atomstruktur

### ⚛️ Grunnstoff-bygger
- **Hands-on eksperimentering** med atomstruktur
- **Intelligent identifikasjon** av grunnstoff, ioner og isotoper
- **Real-time 3D-visualisering** av bygde atomer
- **Pedagogiske forklaringer** på norsk
- **Validering** av partikkel-antall

### 🎨 Moderne Design
- **Dark Mode First** med neonlilla tema
- **Elegante animasjoner** med Framer Motion
- **Responsivt design** for alle skjermstørrelser
- **Tilgjengelighetsfunksjoner** for alle brukere

## 🚀 Teknisk Stack

### Frontend
- **React 18** - Moderne frontend-framework med hooks
- **Tailwind CSS** - Utility-first CSS-rammeverk
- **Framer Motion** - Elegante animasjoner og overganger
- **Three.js** - Avansert 3D-grafikk og visualisering
- **Lucide React** - Konsistente, moderne ikoner

### Utviklingsverktøy
- **Vite** - Rask build tool og dev server
- **ESLint** - Kodekvalitet og konsistens
- **PostCSS** - CSS-prosessering
- **Autoprefixer** - Automatisk CSS-prefixering

## 📦 Installasjon

### Forutsetninger
- Node.js 16+ 
- npm eller yarn

### Steg
1. **Klon repositoriet**
   ```bash
   git clone <repository-url>
   cd kjemi-lab
   ```

2. **Installer avhengigheter**
   ```bash
   npm install
   ```

3. **Start utviklingsserver**
   ```bash
   npm run dev
   ```

4. **Åpne i nettleser**
   - Gå til `http://localhost:3000`
   - Applikasjonen starter automatisk

### Build for produksjon
```bash
npm run build
npm run preview
```

## 🏗️ Prosjektstruktur

```
src/
├── components/          # React-komponenter
│   ├── Navigation.jsx  # Hovednavigasjon
│   ├── Home.jsx        # Hjemmeside
│   ├── PeriodicTable.jsx # Periodisk tabell
│   ├── ElementModal.jsx  # Element-detaljmodal
│   ├── ElementBuilder.jsx # Grunnstoff-bygger
│   ├── Atom3D.jsx      # 3D atom-visualisering
│   └── About.jsx       # Om-siden
├── data/               # Statiske data
│   └── elements.js     # Grunnstoff-database
├── App.jsx             # Hovedapplikasjon
├── main.jsx            # Entry point
└── index.css           # Hovedstiler
```

## 🎯 Bruk

### Periodisk Tabell
1. **Utforsk grunnstoff** ved å klikke på elementer
2. **Søk etter grunnstoff** ved å bruke søkefeltet
3. **Filtrer på kategori** for å fokusere på spesifikke typer
4. **Klikk på element** for å se detaljer og 3D-modell

### Grunnstoff-bygger
1. **Juster antall protoner** (1-118) for å definere grunnstoffet
2. **Endre antall nøytroner** for å lage isotoper
3. **Modifiser antall elektroner** for å lage ioner
4. **Se real-time 3D-visualisering** av det bygde atomet
5. **Lær om egenskaper** gjennom intelligente forklaringer

### 3D Atom-visualisering
- **Dra med musen** for å rotere modellen
- **Bruk hjul** for å zoome inn/ut
- **Se animerte elektroner** som beveger seg i baner
- **Utforsk atomkjernen** med protoner og nøytroner

## 🌍 Norsk Språkstøtte

Kjemi Lab er designet spesielt for norske brukere med:
- **Fullstendig oversettelse** til norsk
- **Norske grunnstoffnavn** (Hydrogen, Natrium, Kalium, etc.)
- **Kulturelt relevant kontekst** og anvendelser
- **Norske måleenheter** (Celsius, g/cm³)
- **Pedagogisk innhold** tilpasset norske læreplaner

## 🔧 Konfigurasjon

### Tailwind CSS
- **Custom farger** for neon-tema
- **Responsive breakpoints** for alle enheter
- **Custom animasjoner** for interaktive elementer

### Three.js
- **Performance optimalisering** med geometry caching
- **Responsive rendering** som tilpasser seg container-størrelse
- **Memory management** for å unngå lekkasjer

## 📱 Responsivt Design

- **Desktop (1200px+)**: Fullskjerm opplevelse med side-ved-side layout
- **Tablet (768px-1199px)**: Kompakt design med stacked komponenter
- **Mobil (<768px)**: Touch-optimalisert med vertikalt layout

## 🎨 Designfilosofi

- **Dark Mode First**: Minimal øyebelastning og moderne utseende
- **Neonlilla tema**: Høy kontrast og futuristisk atmosfære
- **Gradient-akcenter**: Visuell dybde og interesse
- **Konsistent spacing**: Harmonisk layout på tvers av komponenter

## 🚀 Fremtidige Forbedringer

- **AI-integrasjon** for intelligente quiz-spørsmål
- **Molekylær modeling** og kjemiske reaksjoner
- **Sosiale funksjoner** med brukerkontoer
- **Klasseromsintegrasjon** for lærere
- **Utvidet 3D-visualisering** med orbital-modeller

## 🤝 Bidrag

Vi oppfordrer til bidrag fra:
- **Lærere** som ønsker å forbedre kjemiundervisning
- **Studenter** som har ideer til nye funksjoner
- **Utviklere** som kan bidra med teknisk ekspertise
- **Designere** som kan forbedre brukeropplevelsen

## 📄 Lisens

Dette prosjektet er lisensiert under MIT-lisensen - se [LICENSE](LICENSE) filen for detaljer.

## 📞 Kontakt

Har du spørsmål eller forslag til forbedringer? Ta gjerne kontakt med teamet bak Kjemi Lab.

---

**Kjemi Lab** - Der vitenskap møter teknologi for en bedre læringsopplevelse 🧪✨

## 🚀 Publisering på GitHub Pages

### Enkel publisering i 3 steg:

#### 1. **Opprett GitHub repository**
```bash
# Gå til GitHub.com og opprett et nytt repository
# Gi det navnet "kjemi-lab"
```

#### 2. **Push koden til GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Kjemi Lab applikasjon"
git branch -M main
git remote add origin https://github.com/DITT_BRUKERNAVN/kjemi-lab.git
git push -u origin main
```

#### 3. **Publiser på GitHub Pages**
```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Publiser applikasjonen
npm run deploy
```

#### 4. **Aktiver GitHub Pages**
- Gå til repository settings på GitHub
- Scroll ned til "Pages" seksjonen
- Under "Source", velg "Deploy from a branch"
- Velg "gh-pages" branch
- Klikk "Save"

Din applikasjon vil være tilgjengelig på: `https://DITT_BRUKERNAVN.github.io/kjemi-lab/`

### Automatisk oppdatering:
Hver gang du kjører `npm run deploy` vil applikasjonen oppdateres på GitHub Pages.

---

## 🛠️ Installasjon og Utvikling
