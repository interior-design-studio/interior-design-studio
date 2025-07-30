import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const CtaButtonPrimary = ({
  title,
  link,
  type = '',
  size = 'large',
}) => {
  return (
    <Link
      to={link}
      className={
        type === 'with-arrow'
          ? `cta-button-primary__arrow-type cta-button-primary button--text ${size}-button`
          : `cta-button-primary button--text ${size}-button`
      }
    >
      {title}
    </Link>
  );
};

CtaButtonPrimary.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
