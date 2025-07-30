import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProjectCard = ({ project, parentName }) => {
  const { id, name, short_description, main_image } = project;

  return (
    <div
      className="project-card image-hover-scale image-hover bg-image"
      style={{
        backgroundImage: `url(${main_image})`,
      }}
    >
      <Link to={`/projects/${id}`} className="project-card__link">
        <div className="project-card__text-content">
          <div className="text-content__wrapper">
            <h3 className="project-card__title h3--semibold">{name}</h3>
            {parentName !== 'Головна' && (
              <p className="project-card__short-description">
                {short_description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    main_image: PropTypes.string.isRequired,
  }).isRequired,
  parentName: PropTypes.string.isRequired,
};
