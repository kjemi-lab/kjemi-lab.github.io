import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Code, BookOpen, Users, Target, Zap, Globe, Heart } from 'lucide-react';

const About = () => {
  const technologies = [
    { name: "React 18", description: "Moderne frontend-framework med hooks", icon: Code },
    { name: "Three.js", description: "Avansert 3D-grafikk og visualisering", icon: Zap },
    { name: "Tailwind CSS", description: "Utility-first CSS-rammeverk", icon: Code },
    { name: "Framer Motion", description: "Elegante animasjoner og overganger", icon: Zap }
  ];

  const features = [
    {
      icon: FlaskConical,
      title: "Vitenskapelig Nøyaktighet",
      description: "Alle data er basert på offisielle IUPAC-standarder og nøyaktige vitenskapelige målinger.",
      color: "from-neon-blue to-neon-cyan"
    },
    {
      icon: BookOpen,
      title: "Pedagogisk Design",
      description: "Designet spesielt for norske læreplaner med fokus på forståelse og engasjement.",
      color: "from-neon-green to-neon-yellow"
    },
    {
      icon: Target,
      title: "Interaktiv Læring",
      description: "Hands-on eksperimentering med atomstruktur og kjemiske egenskaper.",
      color: "from-neon-purple to-neon-magenta"
    },
    {
      icon: Globe,
      title: "Norsk Språkstøtte",
      description: "Fullstendig oversatt til norsk med kulturelt relevant kontekst og eksempler.",
      color: "from-neon-orange to-neon-red"
    }
  ];

  const team = [
    {
      name: "Kjemi Lab Team",
      role: "Utviklere & Designere",
      description: "Passionerte utviklere som kombinerer teknisk ekspertise med pedagogisk forståelse.",
      avatar: "🧪"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/25">
              <FlaskConical className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gradient mb-6"
          >
            Om Kjemi Lab
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            En revolusjonerende plattform som kombinerer moderne webutvikling med 
            avansert 3D-grafikk for å skape en engasjerende kjemiundervisning.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Vår Misjon
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Kjemi Lab ble skapt med en enkelt visjon: å gjøre kompleks kjemivitenskap 
                  tilgjengelig og engasjerende for alle aldersgrupper. Vi tror at læring 
                  skal være interaktiv, visuell og morsom.
                </p>
                <p>
                  Ved å kombinere moderne web-teknologi med pedagogisk design, skaper vi 
                  en plattform hvor brukere kan utforske atomverdenen på en helt ny måte.
                </p>
                <p>
                  Vårt fokus på norsk språk og kultur sikrer at applikasjonen er relevant 
                  for norske elever og lærere, og fyller et viktig gap i det digitale 
                  utdanningslandskapet.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 border border-primary/30">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Kjemiundervisning for Fremtiden
                  </h3>
                  <p className="text-gray-300">
                    Vi ser for oss en verden hvor vitenskapsundervisning er tilgjengelig 
                    for alle, uansett hvor de er eller hvilke ressurser de har.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="py-20 bg-surface/30"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hva Gjør Kjemi Lab Spesielt?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Vår plattform skiller seg ut gjennom unike funksjoner og tilnærming til læring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  className="bg-surface/50 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Technology Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Teknologi & Arkitektur
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bygget med moderne web-teknologier for optimal ytelse og brukeropplevelse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                  className="bg-surface/50 rounded-xl p-6 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        className="py-20 bg-surface/30"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Vårt Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dedikerte utviklere og designere som tror på kraften av digital læring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 + index * 0.2 }}
                className="bg-surface/50 rounded-2xl p-8 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-4xl">
                  {member.avatar}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Future Plans Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fremtidige Planer
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Vi jobber kontinuerlig med å forbedre og utvide Kjemi Lab.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-integrasjon",
                description: "Intelligente quiz-spørsmål og personaliserte læringsruter.",
                icon: "🤖"
              },
              {
                title: "Molekylær Modeling",
                description: "3D-visualisering av molekyler og kjemiske reaksjoner.",
                icon: "🧬"
              },
              {
                title: "Sosiale Funksjoner",
                description: "Brukerkontoer, fremgang tracking og delbare konfigurasjoner.",
                icon: "👥"
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.0 + index * 0.2 }}
                className="bg-surface/50 rounded-2xl p-8 border border-primary/20 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4 }}
        className="py-20 bg-surface/30 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Har du spørsmål?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Vi er alltid interessert i å høre fra brukere og lærere som ønsker å 
            bidra til forbedringen av Kjemi Lab.
          </p>
          <button className="btn-primary text-xl px-10 py-5">
            Kontakt Oss
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
