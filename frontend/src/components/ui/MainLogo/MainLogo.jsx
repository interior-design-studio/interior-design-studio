import { ScrollToTop } from '../../../components/routing/ScrollToTop';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const MainLogo = ({ className }) => {
  const handleClick = () => {
    ScrollToTop();
  };

  return (
    <Link
      to="/"
      className={`main-logo ${className} bg-image`}
      onClick={handleClick}
    />
  );
};

MainLogo.propTypes = {
  className: PropTypes.string,
};
