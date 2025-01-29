import { hashSync, compareSync } from 'bcryptjs';

export const createHash = (password: string): string => hashSync(password, 10);

export const isValidPassword = (password: string, hashPass: string): boolean =>
  compareSync(password, hashPass);
