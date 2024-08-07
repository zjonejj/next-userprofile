import { userRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";

class UserService {
  private userRepository = userRepository;

  getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  updateUser(id: number, fields: Partial<User>) {
    return this.userRepository.updateUser(id, fields);
  }
}

export const userService = new UserService();
