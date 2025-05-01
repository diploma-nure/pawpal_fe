'use client';

import { Button } from '@/components/ui';
import { uk } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './styles.module.scss';

interface DateFormProps {
  disabledDates?: Date[];
  onDateSelect?: (date: Date | undefined) => void;
  onTimeSelect?: (time: string) => void;
}

export function DateForm({
  disabledDates = [],
  onDateSelect,
  onTimeSelect,
}: DateFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return true;
    }

    return disabledDates.some(
      (disabledDate) =>
        dayjs(disabledDate).format('YYYY-MM-DD') ===
        dayjs(date).format('YYYY-MM-DD'),
    );
  };

  return (
    <div className={styles['date-form']}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        locale={uk}
        disabled={isDateDisabled}
        weekStartsOn={1}
      />

      {selectedDate && (
        <div className={styles['time-slots']}>
          <h4 className="heading4">
            {dayjs(selectedDate).locale('uk').format('DD MMMM')}
          </h4>
          <div className={styles['time-buttons']}>
            {timeSlots.map((time) => (
              <Button
                variant="outline"
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={selectedTime === time ? styles.selected : ''}
                type="button"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
