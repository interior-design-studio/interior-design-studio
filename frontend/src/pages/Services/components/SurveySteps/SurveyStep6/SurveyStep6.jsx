import { surveyStepsList } from '../../../../../data/surveyStepsList';
import { FadeInWhenVisible } from '../../../../../components/ui/FadeInWhenVisible';

export const SurveyStep6 = () => {
  return (
    <FadeInWhenVisible direction="left">
      <div className="survey-step survey-step-6">
        <h4 className="survey-step__title h4--bold">
          {surveyStepsList[5].title}
        </h4>
        <p className="survey-step-6__text text-secondary--regular">
          Щоб отримати детальну консультацію - залиш свої контакти. Якщо
          консультація не потрібна - просто переглянь результат!
        </p>
      </div>
    </FadeInWhenVisible>
  );
};
