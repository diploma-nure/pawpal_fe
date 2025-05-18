/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

type FormData = {
  [key: string]: any;
};

export const useFormData = (formStep: number | string) => {
  // Initialize state from localStorage or empty object
  const [data, setData] = useState<FormData>({});
  const storageKey = `surveyForm_${formStep}`;

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    }
  }, [storageKey]);

  // Save data function
  const saveData = (formData: FormData) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
      setData(formData);
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  };

  return { data, saveData };
};

// Hook to get all survey data across all steps
export const useSurveyData = () => {
  const [allData, setAllData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    try {
      const combinedData: { [key: string]: any } = {};

      // Loop through possible form steps (1-5)
      for (let i = 1; i <= 5; i++) {
        const storageKey = `surveyForm_${i}`;
        const stepData = localStorage.getItem(storageKey);

        if (stepData) {
          Object.assign(combinedData, JSON.parse(stepData));
        }
      }

      setAllData(combinedData);
    } catch (error) {
      console.error('Error loading combined survey data:', error);
    }
  }, []);

  return allData;
};
