import { CreateUserDTO } from '../DTO/CreateUserDTO';

const createUser = async (userData: CreateUserDTO) => {
  try {
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

export const authUserService = {
  createUser,
};
