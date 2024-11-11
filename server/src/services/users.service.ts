import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { extractBearerToken } from '../middlewares/auth.middleware';
import { IUser, User } from '../models/user.model';

export type UserBody = Omit<IUser, 'sessions'>;

export const createUser = async (credentials: UserBody) => {
  return await User.create(credentials);
};

export const authenticateUser = async ({ email, password }: UserBody) => {
  const user = await User.findOne({ email: email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return await user.createSession().then(async (refreshToken) => {
    return await user.generateAccessToken().then((accessToken) => {
      return { accessToken, refreshToken };
    });
  });
};

export const getSessionUser = async (request: Request) => {
  const refreshToken = request.header('X-Refresh-Token');

  const accessToken = extractBearerToken(request);
  if (!accessToken) throw new Error('No access token provided.');

  const decoded = jwt.decode(accessToken) as JwtPayload;

  const user = await User.findOne({ _id: decoded._id, 'sessions.token': refreshToken });
  if (!user) throw new Error('Invalid or expired refresh token provided.');

  const session = user.sessions.find((session) => session.token === refreshToken);
  if (Date.now() >= session.expiresAt) {
    // Since the token has expired and we already checked so, we don't need to keep it in the database anymore
    user.sessions = user.sessions.filter((s) => s.token !== session.token);
    await user.save();

    throw new Error('Invalid or expired refresh token provided.');
  }

  return user;
};
