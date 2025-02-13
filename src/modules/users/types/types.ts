import type UserRole from "./role.enum";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
}
