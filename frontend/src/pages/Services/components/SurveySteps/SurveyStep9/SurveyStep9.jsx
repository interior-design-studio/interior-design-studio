import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';
import { BonusInfo } from '../../BonusInfo';

export const SurveyStep9 = () => {
  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-9">
        <h3 className="survey-step__title h3--semibold">
          Дякуємо за проходження анкети!
        </h3>
        <h4 className="survey-step__subtitle h4--regular">
          {`Скоро з вами зв'яжеться наш дизайнер.`}
        </h4>
        <BonusInfo />
      </div>
    </FadeInWhenVisible>
  );
};
