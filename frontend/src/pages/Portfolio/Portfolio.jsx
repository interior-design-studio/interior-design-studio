import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { Filters } from './components/Filters';
import { CtaSection } from '../../components/ui/CtaSection';
import { ProjectsList } from './components/ProjectsList';
import { useMainContext } from '../../context';
import { MobileFiltersOpenButton } from './components/MobileOpenFiltersButton';
import { MobileFilters } from '../MobileFilters';
import { FiltersResetButton } from '../../components/ui/FiltersResetButton';

export const Portfolio = () => {
  const { projects, width, selectedFilters } = useMainContext();
  const currentPage = 'Портфоліо';
  const isMobile = width < 767;

  const getFilteredProjects = (projects, filters) => {
    if (!filters.length) return projects;

    const styles = [
      'Еко-стиль',
      'Індустріальний',
      'Скандинавський',
      'Мінімалізм',
    ];
    const areas = [
      'Вітальня',
      'Спальня',
      'Санвузол',
      'Кухня',
      'Гардеробна',
      'Дитяча',
    ];

    const selectedStyles = filters.filter((f) => styles.includes(f));
    const selectedAreas = filters.filter((f) => areas.includes(f));

    return projects.filter((project) => {
      const matchesStyle = selectedStyles.length
        ? selectedStyles.includes(project.style)
        : true;

      const matchesAreas = selectedAreas.length
        ? selectedAreas.every((tag) => project.tags.includes(tag))
        : true;

      return matchesStyle && matchesAreas;
    });
  };

  const filteredProjectsList = useMemo(() => {
    return getFilteredProjects(projects, selectedFilters);
  }, [projects, selectedFilters]);

  return (
    <motion.main
      className="page portfolio-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <BreadCrumb
          items={[
            { title: 'Головна', href: '/' },
            { title: currentPage, href: '/projects' },
          ]}
        />
      </div>

      <SectionHeader title="Портфоліо" slogan={`"Дім - це більше,ніж стіни"`} />

      <div className="container">
        {!isMobile ? (
          <Filters />
        ) : (
          <div className="mobile-filters-block">
            <MobileFiltersOpenButton />
            <FiltersResetButton />
          </div>
        )}

        <MobileFilters />

        <div className="portfolio-page__content">
          <ProjectsList
            projects={filteredProjectsList}
            parentName="Портфоліо"
          />
        </div>
      </div>

      <CtaSection />
    </motion.main>
  );
};
