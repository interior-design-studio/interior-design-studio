import { Link } from 'react-router-dom';
import { CtaButtonPrimary } from '../CtaButtonPrimary';

export const CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-section__grid-wrapper grid">
          <div className="cta-section__poster bg-image grid--onDesktop-1-5"></div>
          <div className="cta-section__content grid--onDesktop-7-12">
            <div className="cta-section__text-content">
              <h1 className="cta-section__title h1--medium">
                Створіть дім своєї мрії
              </h1>
              <h4 className="cta-section__text h4--bold">
                Розкажіть нам про свій проєкт
              </h4>
            </div>
            <CtaButtonPrimary title={`Зв'язатися з нами`} link="/contact" />
          </div>
        </div>
      </div>
    </section>
  );
};
