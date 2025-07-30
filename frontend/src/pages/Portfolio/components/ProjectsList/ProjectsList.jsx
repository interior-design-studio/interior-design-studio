import PropTypes from 'prop-types';
import { ProjectCard } from '../../../../components/ui/ProjectCard';

export const ProjectsList = ({ projects, parentName }) => {
  const getGridClass = (index) => {
    if (index % 3 === 0) return 'grid--onDesktop-1-6';
    if (index % 3 === 1) return 'grid--onDesktop-7-12';
    return 'grid--onDesktop-1-12';
  };

  return (
    <ul className="projects-list grid">
      {projects.map((item, index) => (
        <li className={`projects-item ${getGridClass(index)}`} key={item.id}>
          <ProjectCard project={item} parentName={parentName} />
        </li>
      ))}
    </ul>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      short_description: PropTypes.string.isRequired,
      style: PropTypes.string.isRequired,
      main_image: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  parentName: PropTypes.string.isRequired,
};
