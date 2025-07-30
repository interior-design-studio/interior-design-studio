import { motion } from 'framer-motion';
import { CtaSection } from '../../components/ui/CtaSection';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { getProjectById } from '../../utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FadeInWhenVisible } from '../../components/ui/FadeInWhenVisible';
import { useMainContext } from '../../context/MainContext';
import { GoBackButton } from '../../components/ui/GoBackButton';

export const Project = () => {
  const { projectId } = useParams();
  const { width } = useMainContext();
  const isMobile = width < 767;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (err) {
        setError(err.message);
        console.error('Помилка завантаження проекту:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const combineFeatures = project
    ? [project.style, ...(project.tags || [])]
    : [];

  return (
    <motion.main
      className="page project-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {project && (
        <article className="project-content">
          <div className="container">
            <BreadCrumb
              items={[
                { title: 'Головна', href: '/' },
                { title: 'Портфоліо', href: '/projects' },
                { title: project.name },
              ]}
            />
            {isMobile && <GoBackButton />}
          </div>

          <div className="container">
            <section className="project-page__top grid">
              <div className="project__main-poster grid--onDesktop-7-12">
                <FadeInWhenVisible direction="left">
                  <div
                    className="project__main-poster bg-image"
                    style={{
                      backgroundImage: `url(${project.main_image})`,
                    }}
                  ></div>
                </FadeInWhenVisible>
              </div>
              <div className="project-details grid--onDesktop-1-5">
                <h1 className="project-title h1--medium">{project.name}</h1>
                <ul className="project-features-list">
                  {combineFeatures.map((item, index) => (
                    <li className="project-feature" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="project-description">
                  <p>{project.full_description}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="container">
            <section className="project-gallery">
              <ul className="project-gallery__list">
                {project.gallery.map((item, index) => (
                  <li
                    className="project-gallery__item image-hover-grayscale bg-image"
                    key={index}
                    style={{
                      backgroundImage: `url(${item})`,
                    }}
                  ></li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      )}
      <CtaSection />
    </motion.main>
  );
};
