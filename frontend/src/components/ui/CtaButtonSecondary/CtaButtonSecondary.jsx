import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CtaButtonSecondary = ({
  title,
  link,
  onClick,
  type = '',
  size = 'large',
  buttonType = 'button',
}) => {
  const classNames =
    type === 'with-arrow'
      ? `cta-button-secondary__arrow-type cta-button-secondary button--text ${size}-button`
      : `cta-button-secondary button--text ${size}-button`;

  return (
    <Link to={link} type={buttonType} className={classNames} onClick={onClick}>
      <span>{title}</span>
    </Link>
  );
};

CtaButtonSecondary.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  buttonType: PropTypes.string,
};
