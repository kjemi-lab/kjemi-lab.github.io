import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Target, Users } from 'lucide-react';

const Home = ({ onTabChange }) => {
  const features = [
    {
      icon: Atom,
      title: "Periodisk Tabell",
      description: "Utforsk alle 118 grunnstoff med interaktive 3D atom-modeller og detaljerte beskrivelser på norsk.",
      tab: "periodic-table"
    },
    {
      icon: Zap,
      title: "Grunnstoff-bygger",
      description: "Bygg dine egne atomer og se hvordan endringer i protoner, nøytroner og elektroner påvirker egenskapene.",
      tab: "element-builder"
    }
  ];

  const stats = [
    { number: "118", label: "Grunnstoff" },
    { number: "10", label: "Kategorier" },
    { number: "3D", label: "Atom-modeller" },
    { number: "100%", label: "Norsk" }
  ];

  const handleButtonClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Kjemi Lab
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Den ultimate periodiske tabell-applikasjonen for norske studenter og lærere. 
            Lær kjemi på en ny og spennende måte med interaktive 3D-modeller og detaljerte beskrivelser.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={() => handleButtonClick('periodic-table')}
              className="btn-primary text-lg px-8 py-4"
            >
              Utforsk Periodisk Tabell
            </button>
            <button 
              onClick={() => handleButtonClick('element-builder')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Prøv Grunnstoff-bygger
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Hvorfor Kjemi Lab?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vi kombinerer moderne teknologi med pedagogisk design for å gjøre kjemi 
              tilgjengelig og engasjerende for alle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-surface/50 border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handleButtonClick(feature.tab)}
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Hvem er Kjemi Lab for?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Ungdomsskoleelever</h3>
                <p className="text-gray-300">Lær grunnleggende kjemi på en morsom og interaktiv måte</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Videregående elever</h3>
                <p className="text-gray-300">Fordyp deg i periodisk systemet og atomstruktur</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Lærere</h3>
                <p className="text-gray-300">Bruk som pedagogisk verktøy i kjemifaget</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Klar til å utforske kjemi?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start din reise inn i atomverdenen med Kjemi Lab
            </p>
            <button 
              onClick={() => handleButtonClick('periodic-table')}
              className="btn-primary text-lg px-8 py-4"
            >
              Kom i gang nå
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
