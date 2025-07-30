import PropTypes from 'prop-types';
import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';
import { useState } from 'react';

export const SurveyStep8 = ({
  setCurrentSurveyStep,
  formData,
  setFormData,
}) => {
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://tavrdesing.com.ua/api/consultations/requests/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Помилка сервера:', errorText);
        throw new Error(`Помилка: ${response.status}`);
      }

      setStatus('success');
      setFormData({
        customer_name: '',
        phone_number: '',
        customer_question: '',
        chosen_answers: [],
      });

      setCurrentSurveyStep(9);
    } catch (error) {
      console.error('Помилка при відправленні:', error);
      setStatus('error');
    }
  };

  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-8">
        <h4 className="survey-step__title h4--bold">
          Давай творити разом. Напиши, як з тобою зв’язатися.
        </h4>
        <form className="survey-step-8__form-field" onSubmit={handleSubmit}>
          <input
            className="survey-step-8__input text-secondary--regular"
            type="text"
            id="name"
            name="customer_name"
            placeholder="Ім'я*"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />

          <input
            className="survey-step-8__input text-secondary--regular"
            type="tel"
            id="phone"
            name="phone_number"
            placeholder="Телефон*"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <button
            className="survey-step-8__button button button--text"
            type="submit"
          >
            Відправити
          </button>
        </form>
        {status === 'success' && (
          <p style={{ color: 'green' }}>Дякуємо! Ваші дані відправлено.</p>
        )}
        {status === 'error' && (
          <p style={{ color: 'red' }}>
            Помилка при відправленні. Будь ласка, спробуйте пізніше.
          </p>
        )}
      </div>
    </FadeInWhenVisible>
  );
};

SurveyStep8.propTypes = {
  setCurrentSurveyStep: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    chosen_answers: PropTypes.arrayOf(
      PropTypes.shape({
        option: PropTypes.number,
      })
    ).isRequired,
    customer_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    customer_question: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};
