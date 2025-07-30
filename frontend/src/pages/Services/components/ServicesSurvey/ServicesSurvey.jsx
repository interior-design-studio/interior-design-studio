import { useState } from 'react';
import { SurveyStartForm } from '../SurveyStartForm/SurveyStartForm';
import { SurveyQuestionsList } from '../SurveyQuestionsList';
import { SurveyStatusBar } from '../SurveyStatusBar';
import { NextSurveyStepButton } from '../NextSurveyStepButton';
import { ResultActions } from '../ResultActions';
import { BookingButton } from '../BookingButton';
import { useMainContext } from '../../../../context/MainContext';

export const ServicesSurvey = () => {
  const { width } = useMainContext();
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);
  const [currentSurveyStep, setCurrentSurveyStep] = useState(1);

  const isMobile = width < 767;

  return (
    <div className="services-survey__content grid">
      {currentSurveyStep <= 8 && isMobile && isSurveyStarted && (
        <SurveyStatusBar
          currentSurveyStep={currentSurveyStep}
          setCurrentSurveyStep={setCurrentSurveyStep}
        />
      )}
      <div className="services-survey__poster bg-image grid--onDesktop-1-6"></div>
      <div className="services-survey__info grid--onDesktop-8-11">
        <div className="container flex-block-column">
          {isSurveyStarted ? (
            <>
              {currentSurveyStep <= 8 && !isMobile && (
                <SurveyStatusBar
                  currentSurveyStep={currentSurveyStep}
                  setCurrentSurveyStep={setCurrentSurveyStep}
                />
              )}
              <SurveyQuestionsList
                currentSurveyStep={currentSurveyStep}
                setCurrentSurveyStep={setCurrentSurveyStep}
              />
              {currentSurveyStep < 6 && (
                <NextSurveyStepButton
                  currentSurveyStep={currentSurveyStep}
                  setCurrentSurveyStep={setCurrentSurveyStep}
                />
              )}
              {currentSurveyStep === 6 && (
                <ResultActions setCurrentSurveyStep={setCurrentSurveyStep} />
              )}
              {currentSurveyStep === 7 && (
                <BookingButton setCurrentSurveyStep={setCurrentSurveyStep} />
              )}
            </>
          ) : (
            <SurveyStartForm setIsSurveyStarted={setIsSurveyStarted} />
          )}
        </div>
      </div>
    </div>
  );
};
