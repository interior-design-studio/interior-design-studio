import PropTypes from 'prop-types';
import { useMainContext } from '../../../../context/MainContext';
import classNames from 'classnames';

export const NextSurveyStepButton = ({
  currentSurveyStep,
  setCurrentSurveyStep,
}) => {
  const { isValid } = useMainContext();

  return (
    <button
      className={classNames('next-survey-step-button button button--text', {
        'next-survey-step-button--disabled': !isValid,
      })}
      onClick={() => setCurrentSurveyStep(currentSurveyStep + 1)}
      disabled={!isValid}
    >
      <p>Далі</p>
    </button>
  );
};

NextSurveyStepButton.propTypes = {
  currentSurveyStep: PropTypes.number.isRequired,
  setCurrentSurveyStep: PropTypes.func.isRequired,
};
