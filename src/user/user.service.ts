import bcrypt from "bcrypt";
import { userRepository } from "./user.repository";
import { CreateUserDTO } from "./user.types";

export class UserService {
  async getAllUsers() {
    return userRepository.getAll();
  }

  async getUserById(id: number) {
    return userRepository.findById(id);
  }

  async register(data: CreateUserDTO) {
    const { name, email, password } = data;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Користувач з таким Email вже є");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return userRepository.create(name, email, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("користувача не знайдено");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Невірний пароль");
    }

    return user;
  }
}

export const userService = new UserService();
