import jwt, { SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string, secret: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Decode a JWT token without verification (for client-side)
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.decode(token) as TokenPayload | null;
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Generate a JWT token (server-side only)
 */
export const generateToken = (
  payload: TokenPayload,
  secret: string,
  expiresIn: SignOptions['expiresIn'] = '7d'
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};
