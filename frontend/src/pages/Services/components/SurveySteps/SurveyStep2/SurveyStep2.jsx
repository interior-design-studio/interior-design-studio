import PropTypes from 'prop-types';
import { useMainContext } from '../../../../../context/MainContext';
import { useEffect } from 'react';
import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';

export const SurveyStep2 = ({ surveyStep2 }) => {
  const { formData, setFormData, setIsValid } = useMainContext();

  const selectedValue = formData.chosen_answers?.[1]?.option ?? null;

  useEffect(() => {
    setIsValid(!!selectedValue);
  }, [selectedValue, setIsValid]);

  if (!surveyStep2) return null;

  const { id: questionId, text, choices } = surveyStep2;

  const handleChange = (e) => {
    const selectedChoiceId = Number(e.target.value);

    setFormData((prevData) => {
      const updatedAnswers = [...prevData.chosen_answers];
      updatedAnswers[1] = {
        question: questionId,
        option: selectedChoiceId,
      };

      return {
        ...prevData,
        chosen_answers: updatedAnswers,
      };
    });
  };

  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-2">
        <h4 className="survey-step__title h4--bold">{text}</h4>
        <ul className="survey-step-2__types-list">
          {choices?.map((item) => (
            <li className="survey-step-2__types-item" key={item.id}>
              <label>
                <input
                  type="radio"
                  name="projectType"
                  className="survey-step-2__input"
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

SurveyStep2.propTypes = {
  surveyStep2: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
