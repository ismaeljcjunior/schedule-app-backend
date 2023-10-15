import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar todos os usuários.' });
  } finally {
    await prisma.$disconnect();
  }
};
