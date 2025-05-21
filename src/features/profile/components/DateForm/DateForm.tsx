'use client';

import { Button } from '@/components/ui';
import { useGetMeetingsSlots } from '@/features/profile/api/getMeetingsSlots';
import { useScheduleMeeting } from '@/features/profile/api/scheduleMeeting';
import { uk } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import utc from 'dayjs/plugin/utc';
import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './styles.module.scss';

dayjs.extend(utc);

type Props = {
  onSuccess?: () => void;
  applicationId: number;
  handleChangeDate: ({
    selectedDate,
    selectedTime,
  }: {
    selectedDate: Date | undefined;
    selectedTime: string;
  }) => void;
};

export function DateForm({
  onSuccess,
  applicationId,
  handleChangeDate,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visibleMonth, setVisibleMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const scheduleMutation = useScheduleMeeting();

  const getMonthRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    let startDate: Date;
    if (year === new Date().getFullYear() && month === new Date().getMonth()) {
      startDate = new Date();
    } else {
      startDate = new Date(year, month, 1);
    }
    const endDate = new Date(year, month + 1, 0);
    return {
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    };
  };

  const { startDate, endDate } = useMemo(
    () => getMonthRange(visibleMonth),
    [visibleMonth],
  );

  const { data } = useGetMeetingsSlots({
    payload: { startDate, endDate, applicationId },
  });

  const slotsByDate = useMemo(() => {
    const map = new Map<
      string,
      {
        isAvailable: boolean;
        timeSlots: { isAvailable: boolean; time: string }[];
      }
    >();
    data?.data.forEach((slot) => {
      map.set(slot.date, slot);
    });
    return map;
  }, [data]);

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const slot = slotsByDate.get(dateStr);
    if (!slot) return true; // No slot info, disable
    return !slot.isAvailable;
  };

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = dayjs(selectedDate).format('YYYY-MM-DD');
    const slot = slotsByDate.get(dateStr);
    if (!slot || !slot.isAvailable) return [];
    return slot.timeSlots.filter((t) => t.isAvailable);
  }, [selectedDate, slotsByDate]);

  const handleMonthChange = (month: Date) => {
    setVisibleMonth(month);
    setSelectedDate(undefined);
    setSelectedTime('');
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleScheduleMeeting = async () => {
    if (!selectedDate || !selectedTime) return;
    const start = dayjs(selectedDate)
      .set('hour', Number(selectedTime.slice(0, 2)))
      .set('minute', Number(selectedTime.slice(3, 5)))
      .utc()
      .toISOString();
    const end = dayjs(start).add(1, 'hour').utc().toISOString();

    const res = await scheduleMutation.mutateAsync({
      applicationId,
      start,
      end,
    });
    handleChangeDate({
      selectedDate,
      selectedTime,
    });

    if (!res.errors) {
      onSuccess?.();
    }
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
        month={visibleMonth}
        onMonthChange={handleMonthChange}
      />

      {selectedDate && (
        <div className={styles['time-slots']}>
          <h4 className="heading4">
            {dayjs(selectedDate).locale('uk').format('DD MMMM')}
          </h4>
          <div className={styles['time-buttons']}>
            {availableTimeSlots.length === 0 && (
              <span style={{ color: '#888' }}>Немає доступних слотів</span>
            )}
            {availableTimeSlots.map((slot) => (
              <Button
                variant="outline"
                key={slot.time}
                onClick={() => handleTimeSelect(slot.time)}
                className={selectedTime === slot.time ? styles.selected : ''}
                type="button"
              >
                {slot.time.slice(0, 5)}
              </Button>
            ))}
          </div>

          <div className={styles.actionWrapper}>
            <Button
              disabled={!selectedDate || !selectedTime}
              type="button"
              onClick={handleScheduleMeeting}
            >
              Записатись на відеозустріч
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
