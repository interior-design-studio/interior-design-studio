import { useMainContext } from '../../context';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CtaButtonPrimary } from '../../components/ui/CtaButtonPrimary';
import { CtaButtonSecondary } from '../../components/ui/CtaButtonSecondary';
import { HomeServiceItem } from './components/HomeServiceItem';
import { homeServicesData } from '../../data/homeServicesData';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { FadeInWhenVisible } from '../../components/ui/FadeInWhenVisible';

export const HomePage = () => {
  const { projects } = useMainContext();
  const [shownProjects, setShownProjects] = useState([]);
  const [fadeState, setFadeState] = useState([false, false]);
  const fadeDuration = 1000;
  const intervalDuration = 4000;
  const nextIndexRef = useRef(0);

  useEffect(() => {
    if (!projects || projects.length < 2) return;

    const initial = getInitialProjects(projects);
    setShownProjects(initial);
    nextIndexRef.current = 2 % projects.length;

    const toggleFade = (slideIdx) => {
      setFadeState((prev) => {
        const newState = [...prev];
        newState[slideIdx] = true;
        return newState;
      });

      setTimeout(() => {
        setShownProjects((prev) => {
          const newProjects = [...prev];
          newProjects[slideIdx] = getNextProject(
            projects,
            newProjects.map((p) => p.id)
          );
          return newProjects;
        });
        setFadeState((prev) => {
          const newState = [...prev];
          newState[slideIdx] = false;
          return newState;
        });
      }, fadeDuration);
    };

    let slideToChange = 0;

    const intervalId = setInterval(() => {
      toggleFade(slideToChange);
      slideToChange = slideToChange === 0 ? 1 : 0;
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [projects]);

  return (
    <motion.main
      className="page home-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section
        className="home__hero-section bg-image"
        style={{ height: '100vh', position: 'relative' }}
      >
        <Parallax speed={-10}>
          <p className="home__hero-section-title">
            МИ СТВОРЮЄМО ІНТЕР’ЄРИ,
            <br /> В ЯКИХ ХОЧЕТЬСЯ ЖИТИ
          </p>
        </Parallax>
        <Parallax speed={-10}>
          <div style={{ marginTop: '2rem' }}>
            <CtaButtonPrimary title={`Зв'язатися з нами`} link="/contact" />
          </div>
        </Parallax>
      </section>
      <FadeInWhenVisible direction="up">
        <section className="home__about-section">
          <SectionHeader title="Про нас" slogan="“Наші корені — наша сила ”" />
          <div className="container">
            <div className="about-section__top grid">
              <div className="about-section-top__slogan grid--onDesktop-5-12 h4--bold">
                Tavr Design House — це не просто студія інтер’єру. Це історія,
                вкорінена в землі Таврії — давньої назви нашого рідного Херсона
              </div>
              <div className="about-poster-1 grid--onDesktop-1-3 bg-image"></div>
              <div className="about-section__text grid--onDesktop-4-8">
                У своїй роботі ми поєднуємо архітектурну міцність і візуальну
                виразність. <br /> Надихаючись символом таврового профілю —
                конструктивного елементу, що уособлює витривалість і
                практичність, — ми створюємо інтер’єри, які служать роками.
              </div>
              <div className="about-poster-2 grid--onDesktop-9-12 bg-image"></div>
            </div>

            <div className="about-section__bottom grid">
              <h4 className="about-section__title h4--regular">Цінності</h4>
              <article className="about-section__article grid--onDesktop-5-8">
                <h3 className="article__title h3--semibold">Емоційність</h3>
                <p className="article__text">
                  Ми створюємо інтер’єри, які викликають щирі емоції, надихають
                  та дарують відчуття спокою. Простір має душу й атмосферу.
                </p>
              </article>
              <article className="about-section__article grid--onDesktop-9-12">
                <h3 className="article__title h3--semibold">
                  Індивідуальність
                </h3>
                <p className="article__text">
                  Кожен наш проєкт — унікальний. Ми не працюємо за шаблонами —
                  ми втілюємо саме вашу історію в інтер’єрі.
                </p>
              </article>
              <article className="about-section__article grid--onDesktop-5-8">
                <h3 className="article__title h3--semibold">
                  Комфорт і гармонія
                </h3>
                <p className="article__text">
                  Інтер’єр — це не набір меблів. Це — відчуття комфорту, тепла,
                  гармонії. Простір має бути продовженням вашого світу.
                </p>
              </article>
              <article className="about-section__article grid--onDesktop-9-12">
                <h3 className="article__title h3--semibold">
                  Якість і надійність
                </h3>
                <p className="article__text">
                  Усе, що ми робимо, — продумано до деталей. Від вибору
                  матеріалів до фінального штриха — ми прагнемо до досконалості.
                </p>
              </article>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      <FadeInWhenVisible direction="up">
        <section className="home__services-section">
          <SectionHeader
            title="Послуги"
            slogan="“Перший крок до інтер’єру мрії”"
          />
          <div className="container">
            <ul className="home__services-list">
              {homeServicesData.map((service) => (
                <HomeServiceItem key={service.id} service={service} />
              ))}
            </ul>
          </div>
          <div className="centered-block">
            <CtaButtonSecondary
              title="Всі послуги"
              link="/services"
              type="with-arrow"
              size="small"
            />
          </div>
        </section>
      </FadeInWhenVisible>

      <FadeInWhenVisible direction="up">
        <section className="home__projects-section">
          <SectionHeader title="Проєкти" slogan="“Інтер’єр, що живе з вами”" />
          <div className="container">
            <ul
              className="home__projects-list"
              style={{ display: 'flex', gap: '1rem' }}
            >
              {shownProjects.map((project, idx) => (
                <motion.li
                  key={project.id}
                  className="projects-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: fadeState[idx] ? 0 : 1 }}
                  transition={{
                    duration: fadeDuration / 1000,
                    ease: 'easeInOut',
                  }}
                  style={{ listStyle: 'none', flex: '1 1 45%' }}
                >
                  {idx === 0 ? (
                    <FadeInWhenVisible direction="right">
                      <ProjectCard project={project} parentName="Головна" />
                    </FadeInWhenVisible>
                  ) : (
                    <FadeInWhenVisible direction="left">
                      <ProjectCard project={project} parentName="Головна" />
                    </FadeInWhenVisible>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="centered-block">
              <CtaButtonSecondary
                title="Портфоліо"
                link="/projects"
                type="with-arrow"
                size="small"
              />
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
    </motion.main>
  );
};

function getInitialProjects(projects) {
  const shuffled = [...projects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

function getNextProject(projects, excludeIds = []) {
  const candidates = projects.filter((p) => !excludeIds.includes(p.id));
  if (candidates.length === 0) return projects[0];
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
