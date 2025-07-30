import { useState } from 'react';
import { useMainContext } from '../../../../context/MainContext';

export const ContactForm = () => {
  const { formData, setFormData } = useMainContext();

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customer_name: formData.name,
      phone_number: formData.phone,
      customer_question: formData.customer_question,
      chosen_answers: [],
    };

    try {
      const response = await fetch(
        'https://tavrdesing.com.ua/api/consultations/requests/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Помилка сервера:', errorText);
        throw new Error(`Помилка: ${response.status}`);
      }

      setStatus('success');
      setFormData({ name: '', phone: '', customer_question: '' });
    } catch (error) {
      console.error('Помилка при відправленні:', error);
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="name-input"
          placeholder="Ім’я*"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          className="phone-input"
          placeholder="Телефон*"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          name="customer_question"
          className="message-input"
          placeholder="Повідомлення"
          rows="5"
          value={formData.customer_question}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button button button--text">
        Відправити
      </button>

      {status === 'success' && (
        <p className="success-msg">Повідомлення успішно надіслано!</p>
      )}
      {status === 'error' && (
        <p className="error-msg">Помилка при надсиланні. Спробуйте пізніше.</p>
      )}
    </form>
  );
};
