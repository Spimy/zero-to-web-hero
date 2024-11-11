import { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model';

export const extractBearerToken = (request: Request) => {
  const bearerToken = request.header('Authorization');
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) return null;

  const accessToken = bearerToken.split('Bearer ').pop();
  if (!accessToken) return null;

  return accessToken;
};

export const authenticate = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = extractBearerToken(request);
  if (!accessToken) return response.status(401).json({ message: 'No valid authorization token provided.' });

  jwt.verify(accessToken, process.env.JWT_SECRET, async (error, decoded: JwtPayload) => {
    if (error) return response.status(401).json(error);

    const user = await User.findOne({ _id: decoded._id });
    if (!user) return response.status(403).json(error);

    request.user = user;
    next();
  });
};
