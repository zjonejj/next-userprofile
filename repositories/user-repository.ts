import { User } from "@prisma/client";
import { getPrisma } from "../prisma/prisma";

class UserRepository {
  async getUserById(id: number): Promise<User | null> {
    return getPrisma().user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, fields: Partial<User>): Promise<User | null> {
    return getPrisma().user.update({
      where: {
        id,
      },
      data: fields,
    });
  }
}

export const userRepository = new UserRepository();
