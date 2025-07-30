import PropTypes from 'prop-types';
import { ServiceContentList } from '../ServiceContentList';
import { CtaButtonSecondary } from '../../../../components/ui/CtaButtonSecondary';
import { useMainContext } from '../../../../context/MainContext';

export const ServicesItem = ({ configuration, onScrollToSurvey }) => {
  const { width } = useMainContext();
  const isMobile = width < 767;
  const { name, price, min_price, services } = configuration;

  return (
    <li className="services__item">
      <article className="service">
        <div className="service-top">
          <div className="service-top__content-wrapper container">
            <h2 className="service__title h2--medium">{`Проєкт "${name}"`}</h2>
            {!isMobile && (
              <CtaButtonSecondary
                title="Розрахувати вартість"
                onClick={onScrollToSurvey}
              />
            )}
          </div>
        </div>
        <div className="service-content grid container">
          <div className="service-prices grid--onDesktop-1-7">
            <div className="service-price">
              <p className="service-price__title text-main--extrabold">
                Вартість:
              </p>
              <p className="service-price__value">{`$${price}/ м²`}</p>
            </div>
            <div className="service-min-price">
              <p className="service-min-price__title text-main--extrabold">
                *мінімальна вартість:
              </p>
              <p className="service-min-price__value">{`$${min_price}`}</p>
            </div>
          </div>
          <ServiceContentList services={services} />
        </div>
        <div className="service-bottom">
          <div className="container">
            <div className="centered-block">
              {isMobile && (
                <CtaButtonSecondary
                  title="Розрахувати вартість"
                  onClick={onScrollToSurvey}
                />
              )}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

ServicesItem.propTypes = {
  configuration: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    price: PropTypes.shape({
      value: PropTypes.number.isRequired,
      unit: PropTypes.string,
      currency: PropTypes.string,
    }).isRequired,
    min_price: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onScrollToSurvey: PropTypes.func.isRequired,
};
