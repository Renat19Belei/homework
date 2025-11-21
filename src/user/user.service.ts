import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "./user.repository";
import { RegisterUserDTO, LoginUserDTO } from "./user.types";
import { env } from "../config/env";
import { User } from "@prisma/client";

const generateToken = (user: User) => {
  const payload = { userId: user.id, isAdmin: user.isAdmin };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' }); 
};

export class UserService {

  async register(data: RegisterUserDTO) {
    const { email, password, firstName, secondName, avatar } = data;

    const existingUser = await userRepository.findByEmailForAuth(email);
    if (existingUser) {
      throw new Error("Користувач з таким email вже існує");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      firstName,
      secondName,
      email,
      avatar,
      password: hashedPassword,
    });
    
    const token = generateToken(newUser as User);
    
    return { user: newUser, token };
  }

  async login(data: LoginUserDTO) {
    const { email, password } = data;

    const user = await userRepository.findByEmailForAuth(email);
    if (!user) {
      throw new Error("Невірний email або пароль");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Невірний email або пароль");
    }

    const token = generateToken(user);

    return { user: { id: user.id, email: user.email, isAdmin: user.isAdmin }, token }; 
  }

  async getMe(id: number) {
    return userRepository.findByIdWithoutPassword(id);
  }
}

export const userService = new UserService();