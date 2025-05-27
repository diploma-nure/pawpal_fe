import { client } from '@/lib/api-client';
import { LoginResponse } from '../types/LoginResponse';
import { login } from './login';

jest.mock('@/lib/api-client', () => ({
  client: {
    post: jest.fn(),
  },
}));

describe('login', () => {
  it('should call the API with the correct payload and return the response data', async () => {
    const mockResponse: LoginResponse = {
      data: {
        token: 'mockToken',
        isNewUser: false,
      },
      errors: null,
      message: 'Success',
    };

    (client.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const payload = { email: 'test@example.com', password: 'password123' };
    const result = await login(payload);

    expect(client.post).toHaveBeenCalledWith('/auth/login', payload);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'Network Error';
    (client.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const payload = { email: 'test@example.com', password: 'password123' };

    await expect(login(payload)).rejects.toThrow(errorMessage);
  });
});
