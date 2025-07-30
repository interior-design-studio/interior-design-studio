import { motion } from 'framer-motion';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { ServicesList } from './components/ServicesList';
import { ServicesSurvey } from './components/ServicesSurvey';
import { useRef } from 'react';
import { FadeInWhenVisible } from '../../components/ui/FadeInWhenVisible';

export const Services = () => {
  const currentPage = 'Послуги';
  const surveyRef = useRef(null);

  const scrollToSurvey = () => {
    if (surveyRef.current) {
      surveyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.main
      className="page services-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <BreadCrumb
          items={[
            { title: 'Головна', href: '/' },
            { title: currentPage, href: '/services' },
          ]}
        />
      </div>
      <SectionHeader title="Послуги" slogan={`"Краса,що працює на вас"`} />
      <section>
        <ServicesList onScrollToSurvey={scrollToSurvey} />
      </section>
      <FadeInWhenVisible direction="up">
        <section className="services-survey-section" ref={surveyRef}>
          <ServicesSurvey />
        </section>
      </FadeInWhenVisible>
    </motion.main>
  );
};
