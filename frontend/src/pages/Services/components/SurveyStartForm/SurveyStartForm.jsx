import PropTypes from 'prop-types';

export const SurveyStartForm = ({ setIsSurveyStarted }) => {
  return (
    <div className="services-survey__start-form">
      <h4 className="start-form__title h4--bold">
        Розрахуй вартість свого дизайн-проєкту за 1 хвилину!
      </h4>
      <div className="start-form__text">
        Заповни кілька простих питань і отримай:
        <br />
        Орієнтовну вартість
        <br />
        Приклад повного дизайн-проєкту у PDF
        <br />
        Можливість записатись на консультацію
      </div>
      <button
        className="survey-start__button button button--text"
        onClick={() => setIsSurveyStarted(true)}
      >
        Розрахувати вартість
      </button>
    </div>
  );
};

SurveyStartForm.propTypes = {
  setIsSurveyStarted: PropTypes.func.isRequired,
};
