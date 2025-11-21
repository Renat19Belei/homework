export interface RegisterUserDTO {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}