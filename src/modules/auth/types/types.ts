export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateMeData {
  firstName: string;
  lastName: string;
}

export interface UpdatePasswordData {
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}
