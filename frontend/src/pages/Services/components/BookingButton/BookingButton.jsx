import PropTypes from 'prop-types';

export const BookingButton = ({ setCurrentSurveyStep }) => {
  return (
    <button
      className="booking-button button button--text"
      onClick={() => setCurrentSurveyStep(8)}
    >
      Забронювати консультацію
    </button>
  );
};

BookingButton.propTypes = {
  setCurrentSurveyStep: PropTypes.func.isRequired,
};
