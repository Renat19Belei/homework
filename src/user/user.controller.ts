import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { CustomRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10; 

const generateToken = (userId: number): string => {
    return jwt.sign({ id: userId }, env.JWT_SECRET.toString(), { expiresIn: '1d' });
};
export const registerUser = async (req: CustomRequest, res: Response) => {
    const { email, password, firstName, secondName, avatar } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач з таким email вже існує.' });
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                secondName,
                avatar,
            }
        });

        const token = generateToken(newUser.id);

        return res.status(201).json({ 
            id: newUser.id,
            email: newUser.email,
            token 
        });

    } catch (error) {
        console.error("ПОмилка реєстрації:", error);
        return res.status(500).json({ message: 'Помилка серверу при реєстрації.' });
    }
};

export const loginUser = async (req: CustomRequest, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Невірні дані' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Невірні дані' });
        }

        const token = generateToken(user.id);

        return res.status(200).json({ 
            id: user.id,
            email: user.email,
            token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Помилка серверу при вході' });
    }
};

export const getMe = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(401).json({ message: 'ID користувача не знайдено' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                secondName: true,
                email: true,
                avatar: true,
                isAdmin: true,
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Помилка серверу при отриманні даних' });
    }
};