import { FadeInWhenVisible } from '../../../../components/ui/FadeInWhenVisible';
import PropTypes from 'prop-types';

export const HomeServiceItem = ({ service }) => {
  const { title, description, id } = service;
  return (
    <li className="home-services-item">
      <article className="service-article">
        <h4 className="service-article__title h4--bold">{title}</h4>
        <p className="service-article__description">{description}</p>
      </article>
      <FadeInWhenVisible direction="left">
        <div
          className={`home-services__poster service-article__poster-${id} bg-image`}
        ></div>
      </FadeInWhenVisible>
    </li>
  );
};

HomeServiceItem.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
