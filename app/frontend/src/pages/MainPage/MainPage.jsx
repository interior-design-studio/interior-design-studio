import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div className="page main-page">
      <section className="hero bg-image">
        <div className="container">
          <div className="hero-section__title">
            МИ СТВОРЮЄМО ІНТЕР’ЄРИ,
            <br /> В ЯКИХ ХОЧЕТЬСЯ ЖИТИ
          </div>
          <Link
            to="/contacts"
            className="hero-section__button button button--text"
          >
            Зв’язатися з нами
          </Link>
        </div>
      </section>
      <section className="about">
        <div className="container">
          <div className="about__top">
            <h4 className="about__title h4--regular">Про нас</h4>
            <h1 className="about__tagline h1--bold">
              “Наші корені — наша сила”
            </h1>
          </div>
          <div className="about__content grid">
            <div className="about__subtitle grid--design-5-12 h4--bold">
              Tavr Design House — це не просто студія інтер’єру. Це історія,
              вкорінена в землі Таврії — давньої назви нашого рідного Херсона
            </div>
            <div className="about__text grid--design-4-8 ">
              У своїй роботі ми поєднуємо архітектурну міцність і візуальну
              виразність. Надихаючись символом таврового профілю —
              конструктивного елементу, що уособлює витривалість і практичність,
              — ми створюємо інтер’єри, які служать роками.
            </div>
            <div className="about__poster-1 grid--design-1-3 bg-image"></div>
            <div className="about__poster-2 grid--design-9-12 bg-image"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
