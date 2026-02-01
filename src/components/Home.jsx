import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Target, Users, FlaskConical } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = ({ onTabChange }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Atom,
      titleKey: "periodicTable",
      descriptionKey: "periodicTableDesc",
      tab: "periodic-table"
    },
    {
      icon: Zap,
      titleKey: "elementBuilder",
      descriptionKey: "elementBuilderDesc",
      tab: "element-builder"
    },
    {
      icon: FlaskConical,
      titleKey: "molecules",
      descriptionKey: "moleculesDesc",
      tab: "molecules"
    }
  ];

  const stats = [
    { number: "118", labelKey: "elements" },
    { number: "200", labelKey: "molecules" },
    { number: "3D", labelKey: "atomModels" },
    { number: "100%", labelKey: "norwegian" }
  ];

  const handleButtonClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Kjemi Lab
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Den ultimate periodiske tabell-applikasjonen for norske studenter og lærere. 
            Lær kjemi på en ny og spennende måte med interaktive 3D-modeller og detaljerte beskrivelser.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={() => handleButtonClick('periodic-table')}
              className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {t('explorePeriodicTable')}
            </button>
            <button 
              onClick={() => handleButtonClick('element-builder')}
              className="btn-secondary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {t('tryElementBuilder')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.labelKey}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              {t('whyKjemiLab')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('whyDesc')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-surface/50 border border-primary/20 rounded-lg sm:rounded-xl p-4 sm:p-8 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handleButtonClick(feature.tab)}
                >
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">{t(feature.titleKey)}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">{t(feature.descriptionKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Target className="w-12 sm:w-16 h-12 sm:h-16 text-primary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              {t('whoFor')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12">
              <div className="text-center">
                <Users className="w-8 sm:w-12 h-8 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">{t('middleSchool')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">{t('middleSchoolDesc')}</p>
              </div>
              <div className="text-center">
                <Users className="w-8 sm:w-12 h-8 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">{t('highSchool')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">{t('highSchoolDesc')}</p>
              </div>
              <div className="text-center">
                <Users className="w-8 sm:w-12 h-8 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">{t('teachers')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">{t('teachersDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              {t('readyToExplore')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
              {t('startJourney')}
            </p>
            <button 
              onClick={() => handleButtonClick('periodic-table')}
              className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              {t('getStarted')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
