import { StepperContainer } from '@/features/surveys/components/StepperContainer/StepperContainer';
import { SurveyForm } from '@/features/surveys/components/SurveyForm';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function SurveyPage({ searchParams }: PageProps) {
  const currentStep = (await searchParams).currentStep;

  if (!currentStep || isNaN(Number(currentStep))) {
    redirect('/survey?currentStep=1');
  }

  return (
    <>
      <StepperContainer currentStep={Number(currentStep)} />
      <SurveyForm currentStep={Number(currentStep)} />
    </>
  );
}
