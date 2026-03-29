import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

export class AuthService {
  private prisma = new PrismaClient();

  // Register a new user with hashed password
  async register(input: any) {
    const email = input?.email;
    const password = input?.password;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('User already exists');
    }

    const hashed = await bcrypt.hash(password, authConfig.bcryptSaltRounds);
    const user = await this.prisma.user.create({ data: { email, password: hashed } });
    return { id: user.id, email: user.email };
  }

  // Login and return JWT
  async login(input: any) {
    const email = input?.email;
    const password = input?.password;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, authConfig.jwtSecret, {
      expiresIn: authConfig.expiresIn,
    });

    return {
      token,
      user: { id: user.id, email: user.email },
    };
  }

  // Verify a JWT and return user info
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, authConfig.jwtSecret) as {
        userId: number;
        email: string;
      };
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user) {
        throw new Error('Invalid token');
      }
      return { id: user.id, email: user.email };
    } catch (err) {
      throw err;
    }
  }
}

export default new AuthService();
