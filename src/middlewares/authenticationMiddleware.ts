import { Request, Response, NextFunction } from 'express';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Aqui, você deve implementar a lógica de autenticação, como verificar o token JWT.
  // Se o token for válido, chame next() para permitir que a solicitação continue.
  // Caso contrário, responda com um erro 401 (Não Autorizado).
};