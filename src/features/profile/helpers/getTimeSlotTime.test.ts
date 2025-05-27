import dayjs from 'dayjs';
import { getTimeSlotTime } from './getTimeSlotTIme';

describe('getTimeSlotTime', () => {
  it('should convert UTC time to local time correctly', () => {
    // Mock the current date to ensure consistent test results
    jest
      .spyOn(dayjs, 'utc')
      .mockImplementation(() => dayjs('2025-05-27T00:00:00Z'));

    const utcTime = '12:00:00'; // 12 PM UTC
    const expectedLocalTime = dayjs
      .utc('2025-05-27T12:00:00Z')
      .local()
      .format('HH:mm');

    const result = getTimeSlotTime(utcTime);

    expect(result).toBe(expectedLocalTime);

    // Restore the original implementation
    jest.restoreAllMocks();
  });

  it('should handle edge cases like midnight UTC', () => {
    jest
      .spyOn(dayjs, 'utc')
      .mockImplementation(() => dayjs('2025-05-27T00:00:00Z'));

    const utcTime = '00:00:00'; // Midnight UTC
    const expectedLocalTime = dayjs
      .utc('2025-05-27T00:00:00Z')
      .local()
      .format('HH:mm');

    const result = getTimeSlotTime(utcTime);

    expect(result).toBe(expectedLocalTime);

    jest.restoreAllMocks();
  });
});
