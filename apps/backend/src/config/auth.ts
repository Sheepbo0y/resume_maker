import dotenv from 'dotenv';

dotenv.config();

// Centralized JWT and password hashing configuration
export const authConfig = {
  // JWT secret key, loaded from environment variable or fallback to a strong default (not recommended for production).
  jwtSecret: process.env.JWT_SECRET || 'default_super_secret_key_change_me',
  // JWT expiration duration (e.g., '1h', '7d')
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  // bcrypt hashing rounds (cost factor)
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
};

export default authConfig;
