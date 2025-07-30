import PropTypes from 'prop-types';

export const BlogPostItem = ({ details }) => {
  const { number, title, description, advantages, features, image } = details;
  return (
    <div className="post-item">
      <h2 className="post-item__title h2--medium">{`${number}. ${title}`}</h2>
      <div className="post-item__description">{description}</div>

      <div className="post-item__details">
        {advantages.length > 0 && (
          <div className="post-item__advantages">
            <p className="post-item__advantages-title text-main--extrabold">
              Переваги:
            </p>
            <ul>
              {advantages.map((adv, index) => (
                <li key={`adv-${index}`}>{adv}</li>
              ))}
            </ul>
          </div>
        )}
        {features.length > 0 && (
          <div className="post-item__features">
            <p className="post-item__features-title text-main--extrabold">
              Особливості:
            </p>
            <ul>
              {features.map((feat, index) => (
                <li key={`feat-${index}`}>{feat}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className="post-item__image bg-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
    </div>
  );
};

BlogPostItem.propTypes = {
  details: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    advantages: PropTypes.arrayOf(PropTypes.string).isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
