export type LoginRequestBodyType = {
  email: string;
  password: string;
};

export type UserCreationType = LoginRequestBodyType & {
  name: string;
};

export type UserSignupBodyType = UserCreationType & {
  passwordConfirmation: string;
};

export type JWTPayload = {
  userId: string;
  type: 'access' | 'refresh';
};
