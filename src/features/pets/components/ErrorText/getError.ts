type FormattedError = {
  message: string;
  redirectUrl?: string;
};

export const getError = (message: string): FormattedError => {
  if (['Анкета не заповнена', 'Анкетування не знайдено'].includes(message)) {
    return {
      message:
        'От халепа, анкетування не пройдене для отримання рекомендацій. Пройдіть, будь ласка анкетування',
      redirectUrl: '/survey',
    };
  }

  return {
    message: 'От халепа, сталась помилка. Поверніться до головної сторінки.',
    redirectUrl: '/',
  };
};
