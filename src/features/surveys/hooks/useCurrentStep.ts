import { useEffect, useState } from 'react';

const CURRENT_STEP_KEY = 'survey_current_step';

export const useCurrentStep = (initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  useEffect(() => {
    // Load current step from localStorage on mount
    try {
      const savedStep = localStorage.getItem(CURRENT_STEP_KEY);
      if (savedStep) {
        setCurrentStep(Number(savedStep));
      }
    } catch (error) {
      console.error('Error loading current step from localStorage:', error);
    }
  }, []);

  const updateStep = (step: number) => {
    try {
      localStorage.setItem(CURRENT_STEP_KEY, String(step));
      setCurrentStep(step);
    } catch (error) {
      console.error('Error saving current step to localStorage:', error);
    }
  };

  return { currentStep, updateStep };
};
