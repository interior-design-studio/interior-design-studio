import PropTypes from 'prop-types';
import { useMainContext } from '../../../../../context/MainContext';
import { useState, useEffect } from 'react';
import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';

export const SurveyStep1 = ({ surveyStep1 }) => {
  const { formData, setFormData, setIsValid, width } = useMainContext();
  const [inputValue, setInputValue] = useState('');

  const isMobile = width < 767;

  useEffect(() => {
    const initialValue = formData.chosen_answers?.[0]?.custom_answer || '';
    setInputValue(initialValue);
    setIsValid(/^\d+$/.test(initialValue));
  }, [formData]);

  if (!surveyStep1) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (/^\d+$/.test(value) && value >= 20) {
      setIsValid(true);

      setFormData((prevData) => {
        const updatedAnswers = [...prevData.chosen_answers];
        updatedAnswers[0] = {
          question: surveyStep1.id,
          custom_answer: value,
        };

        return { ...prevData, chosen_answers: updatedAnswers };
      });
    } else {
      setIsValid(false);
    }
  };

  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-1">
        <h4 className="survey-step__title h4--bold">{surveyStep1.text}</h4>
        <div className="survey-step-1__content">
          <input
            type="text"
            name="area"
            placeholder="Вкажіть площу у м²"
            aria-label="Area"
            className="survey-step-1__input"
            value={inputValue}
            onChange={handleChange}
          />
          {!isMobile ? (
            <p className="survey-step-1__note">
              Мінімальна площа для розрахунку - 20 м²
            </p>
          ) : (
            <p className="survey-step-1__note">
              Мін. площа для розрахунку - 20 м²
            </p>
          )}
          {inputValue.length > 0 && !/^\d+$/.test(inputValue) && (
            <p style={{ color: '#8e3a1b' }}>Введіть лише цифри</p>
          )}

          {inputValue.length > 0 &&
            /^\d+$/.test(inputValue) &&
            +inputValue < 20 && (
              <p style={{ color: '#8e3a1b' }}>Мінімальна площа — 20 м²</p>
            )}
        </div>
      </div>
    </FadeInWhenVisible>
  );
};

SurveyStep1.propTypes = {
  surveyStep1: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
