import { motion } from 'framer-motion';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { ContactInfo } from './components/ContactInfo';
import { ContactForm } from './components/ContactForm';
import { useMainContext } from '../../context/MainContext';
import { GoBackButton } from '../../components/ui/GoBackButton';

export const Contact = () => {
  const currentPage = 'Контакти';
  const { width } = useMainContext();
  const isMobile = width < 767;

  return (
    <motion.main
      className="page contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <BreadCrumb
          items={[
            { title: 'Головна', href: '/' },
            { title: currentPage, href: '/contacts' },
          ]}
        />
        {isMobile && <GoBackButton />}
        <div className="contact-page__content grid">
          <h1 className="contact-page__title h2--bold grid--onDesktop-2-11">
            Кожен простір має свою історію. Давай напишемо твою разом.
          </h1>
          <p className="contact-page__text grid--onDesktop-2-11">
            Залиши повідомлення , і ми зв’яжемося з тобою, щоб обговорити
            деталі.
          </p>
          <div className="contact-form__wrapper grid--onDesktop-2-11">
            <ContactForm />
          </div>
        </div>
        <div className="contact-page__details">
          <h3 className="details__title h3--semibold">або напишіть нам</h3>
          <ContactInfo />
        </div>
      </div>
    </motion.main>
  );
};
