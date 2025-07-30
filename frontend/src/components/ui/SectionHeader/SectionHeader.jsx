import PropTypes from 'prop-types';

export const SectionHeader = ({ title, slogan }) => {
  return (
    <div className="section-header">
      <div className="container">
        <div className="section-header__content-wrapper">
          <h4 className="section-header__title h4--regular">{title}</h4>
          <p className="section-header__slogan h2--bold">{slogan}</p>
        </div>
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string,
};
