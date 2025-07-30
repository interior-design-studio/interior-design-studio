import PropTypes from 'prop-types';

export const ServiceContentItem = ({ content }) => {
  return <li className="service-content__item">{content}</li>;
};

ServiceContentItem.propTypes = {
  content: PropTypes.string.isRequired,
};
