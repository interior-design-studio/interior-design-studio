import PropTypes from 'prop-types';

export const ResultActions = ({ setCurrentSurveyStep }) => {
  return (
    <div className="result-actions">
      <button
        type="button"
        className="result-button button button--text"
        onClick={() => setCurrentSurveyStep(7)}
      >
        Результат
      </button>
      <button
        type="button"
        className="consultation-button button button--text"
        onClick={() => setCurrentSurveyStep(8)}
      >
        Консультація
      </button>
    </div>
  );
};

ResultActions.propTypes = {
  setCurrentSurveyStep: PropTypes.func.isRequired,
};
