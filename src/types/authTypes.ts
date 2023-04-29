export type UserCreationType = {
  name: string;
  email: string;
  password: string;
};

export type UserSignupBodyType = UserCreationType & {
  passwordConfirmation: string;
};
