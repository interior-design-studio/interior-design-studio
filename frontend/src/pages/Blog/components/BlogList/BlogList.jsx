import PropTypes from 'prop-types';
import { BlogCard } from '../BlogCard';

export const BlogList = ({ articles }) => {
  return (
    <ul className="blogs-list">
      {articles.map((item) => (
        <li className="blogs-list__item" key={item.id}>
          <BlogCard article={item} />
        </li>
      ))}
    </ul>
  );
};

BlogList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};
