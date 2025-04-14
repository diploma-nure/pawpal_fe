export type LoginResponse = {
  data: {
    token: string;
    isNewUser: boolean;
  };
  message: string;
  errors: string[] | null;
};
