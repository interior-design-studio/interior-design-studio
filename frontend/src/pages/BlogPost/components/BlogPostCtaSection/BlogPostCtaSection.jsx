import { CtaButtonSecondary } from '../../../../components/ui/CtaButtonSecondary';

export const BlogPostCtaSection = () => {
  return (
    <section className="blog-post-cta-section">
      <div className="container">
        <div className="blog-post-cta__wrapper grid">
          <div className="blog-post-cta__text-content grid--onDesktop-1-5">
            <h3 className="blog-post-cta__title h3--semibold">
              Не знаєш, який стиль підійде саме тобі?
            </h3>
            <p className="blog-post-cta__text">
              Залиши заявку - ми підберемо інтер’єр, який буде дійсно твоїм
            </p>
            <CtaButtonSecondary title="Залишити заявку" link="/contact" />
          </div>
          <div className="blog-post-cta__image bg-image grid--onDesktop-8-12"></div>
        </div>
      </div>
    </section>
  );
};
