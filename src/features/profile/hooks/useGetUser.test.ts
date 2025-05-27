import { User } from '@/features/profile/types';
import Cookies from 'js-cookie';
import { useGetUser } from './useGetUser';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('useGetUser', () => {
  it('should return null if no token is present', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);

    const result = useGetUser();

    expect(result).toBeNull();
  });

  it('should return the decoded user if a valid token is present', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      role: 'User',
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const mockToken = `header.${btoa(JSON.stringify(mockUser))}.signature`;

    (Cookies.get as jest.Mock).mockReturnValueOnce(mockToken);

    const result = useGetUser();

    expect(result).toEqual(mockUser);
  });

  it('should return null if the token is invalid', () => {
    const invalidToken = 'invalid.token.payload';

    (Cookies.get as jest.Mock).mockReturnValueOnce(invalidToken);

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = useGetUser();

    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });
});
