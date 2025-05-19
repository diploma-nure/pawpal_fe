export const HOUSING_OPTIONS = [
  { value: '1', label: 'Приватний будинок' },
  { value: '2', label: 'Квартира' },
];

export const YES_NO_OPTIONS = [
  { value: 'true', label: 'Так' },
  { value: 'false', label: 'Ні' },
];

export const PET_ALLOWED_OPTIONS = [
  { value: '2', label: 'Так' },
  { value: '1', label: 'Ні' },
  { value: '0', label: 'Не впевнений' },
];

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: '0', label: 'Спокійний' },
  { value: '1', label: 'Помірно активний' },
  { value: '2', label: 'Активний' },
];

export const lifeConditionSection = [
  {
    title: 'Де ви проживаєте?',
    name: 'housingType',
    options: HOUSING_OPTIONS,
  },
  {
    title: 'Чи є у вас двір або безпечне місце для вигулу?',
    name: 'hasYard',
    options: YES_NO_OPTIONS,
  },
  {
    title: 'Чи дозволено у вашому житлі утримувати тварин?',
    name: 'allowPets',
    options: PET_ALLOWED_OPTIONS,
  },
  {
    title: 'Чи є у вас інші домашні тварини',
    name: 'hasOtherPets',
    options: YES_NO_OPTIONS,
  },
  {
    title: "Чи є в сім'ї маленькі діти?",
    name: 'hasChildren',
    options: YES_NO_OPTIONS,
  },
];

export const experienceSection = [
  {
    title: 'Чи були у вас домашні тварини раніше?',
    name: 'hadPetsBefore',
    options: YES_NO_OPTIONS,
  },
  {
    title: 'Який рівень активності вам підходить?',
    name: 'activityLevel',
    options: ACTIVITY_LEVEL_OPTIONS,
  },
  {
    title:
      'Чи готові ви взяти тварину з особливими потребами (інвалідність, хронічні захворювання)?',
    name: 'willingToAdoptSpecialNeeds',
    options: YES_NO_OPTIONS,
  },
];

export const responsibilitySection = [
  {
    title:
      'Чи розумієте ви всю відповідальність за догляд за домашньою тваринкою?',
    name: 'understandsResponsibility' as const,
    options: YES_NO_OPTIONS,
  },
  {
    title: 'Чи маєте ви достатньо фінансових ресурсів для утримання тварини?',
    name: 'hasSufficientFinancialResources' as const,
    options: YES_NO_OPTIONS,
  },
];
