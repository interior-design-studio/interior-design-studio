import { CtaButtonPrimary } from '../../components/ui/CtaButtonPrimary';

export const PageNotFound = () => {
  return (
    <div className="page page-not-found">
      <div className="page-not-found__text-content">
        <p className="display-status">404</p>
        <h1 className="page-not-found__title h1--bold">
          Ой! Ми не знайшли цієї сторінки
        </h1>
        <h3 className="page-not-found__subtitle h3--semibold">
          Але ми завжди знайдемо рішення для твого простору.
        </h3>
      </div>
      <CtaButtonPrimary title="Повернутися на головну" link="/" />
    </div>
  );
};
