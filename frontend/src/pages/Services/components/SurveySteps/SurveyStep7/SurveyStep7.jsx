import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';
import { BonusInfo } from '../../BonusInfo';
import { useMainContext } from '../../../../../context/MainContext';

export const SurveyStep7 = () => {
  const { formData } = useMainContext();

  const projectArea = Number(formData.chosen_answers?.[0]?.custom_answer) || 0;
  const projectTypeOption = formData.chosen_answers?.[1]?.option;

  let pricePerSquareMeter = 0;

  switch (projectTypeOption) {
    case 1:
      pricePerSquareMeter = 9;
      break;
    case 2:
      pricePerSquareMeter = 22;
      break;
    case 3:
      pricePerSquareMeter = 14;
      break;
    case 4:
      pricePerSquareMeter = 26;
      break;
    case 5:
      pricePerSquareMeter = 32;
      break;
    default:
      pricePerSquareMeter = 0;
  }

  const totalPrice = projectArea * pricePerSquareMeter;

  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-7">
        <h4 className="survey-step__title h4--bold">
          Результат розрахунку проекту
        </h4>
        <h1 className="result__title h1--bold">
          {totalPrice > 0 ? `від ${totalPrice.toLocaleString('uk-UA')} $` : '—'}
        </h1>
        <BonusInfo />
        <p className="survey-step-7__secondary-text text-secondary--regular">
          Бажаєш обговорити проєкт? Запишись на консультацію
        </p>
      </div>
    </FadeInWhenVisible>
  );
};
