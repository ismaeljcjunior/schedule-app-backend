import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email ou nome de usuário já existem.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário.' });
  } finally {
    await prisma.$disconnect();
  }
};
