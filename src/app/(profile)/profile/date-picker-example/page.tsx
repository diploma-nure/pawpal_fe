'use client';

import { DateForm } from '@/features/profile/components/DateForm';
import { useState } from 'react';

export default function DatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Example of disabled dates (e.g., holidays or already booked dates)
  const disabledDates = [
    new Date(2025, 4, 5), // May 5, 2025
    new Date(2025, 4, 10), // May 10, 2025
    new Date(2025, 4, 15), // May 15, 2025
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Виберіть дату та час</h1>

      <DateForm
        disabledDates={disabledDates}
        onDateSelect={(date) => setSelectedDate(date)}
        onTimeSelect={(time) => setSelectedTime(time)}
      />

      {selectedDate && selectedTime && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            border: '1px solid #eee',
          }}
        >
          <h2>Вибрано:</h2>
          <p>Дата: {selectedDate.toLocaleDateString('uk-UA')}</p>
          <p>Час: {selectedTime}</p>
        </div>
      )}
    </div>
  );
}
