import PropTypes from 'prop-types';
import { ServiceContentItem } from '../ServiceContetnItem';

export const ServiceContentList = ({ services }) => {
  return (
    <div className="grid-wrapper grid--onDesktop-8-12">
      <ul className="service-content__list">
        {services.map((service, index) => (
          <ServiceContentItem key={index} content={service} />
        ))}
      </ul>
    </div>
  );
};

ServiceContentList.propTypes = {
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
};
