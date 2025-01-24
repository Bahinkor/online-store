import type { RegisterUserData } from "./types/types";

import usersService from "../users/users.service";

const register = (userData: RegisterUserData) => {
  return usersService.create(userData);
};

export default { register };
