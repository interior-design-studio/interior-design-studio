import PropTypes from 'prop-types';
import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';
import { useMainContext } from '../../../../../context/MainContext';
import { useEffect } from 'react';

export const SurveyStep5 = ({ surveyStep5 }) => {
  const { formData, setFormData, setIsValid } = useMainContext();
  const { id: questionId, text, choices } = surveyStep5;

  const selectedValue = formData.chosen_answers?.[4]?.option ?? '';

  useEffect(() => {
    setIsValid(!!selectedValue);
  }, [selectedValue, setIsValid]);

  const handleChange = (e) => {
    const selectedChoiceId = Number(e.target.value);

    setFormData((prevData) => {
      const updatedAnswers = [...prevData.chosen_answers];
      updatedAnswers[4] = {
        question: questionId,
        option: selectedChoiceId,
      };

      return { ...prevData, chosen_answers: updatedAnswers };
    });
  };

  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-5">
        <h4 className="survey-step__title h4--bold">{text}</h4>
        <ul className="survey-step-5__types-list">
          {choices?.map((item) => (
            <li className="survey-step-5__types-item" key={item.id}>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  className="survey-step-5__input"
                  value={item.id}
                  checked={selectedValue === item.id}
                  onChange={handleChange}
                />
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </FadeInWhenVisible>
  );
};

SurveyStep5.propTypes = {
  surveyStep5: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        text: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
