import { Request, Response } from 'express';
import type { UserBody } from '../services/users.service';
import * as UsersService from '../services/users.service';

export const createUser = async (request: Request<{}, {}, UserBody>, response: Response) => {
  return await UsersService.createUser(request.body)
    .then(() => response.status(201).json({ message: 'Successfully registered.' }))
    .catch((error) => response.status(400).json(error));
};

export const authenticateUser = async (request: Request<{}, {}, UserBody>, response: Response) => {
  const authTokens = await UsersService.authenticateUser(request.body);
  if (!authTokens) return response.status(401).json({ message: 'Wrong email or password.' });
  return response.status(200).json(authTokens);
};

export const refreshAuth = async (request: Request, response: Response) => {
  return await UsersService.getSessionUser(request)
    .then(async (user) => response.status(200).json({ accessToken: await user.generateAccessToken() }))
    .catch((error) => response.status(403).json({ message: error.message }));
};

export const getAuthUser = async (request: Request, response: Response) => {
  const user = request.user.toJSON();
  return response.status(200).json({ user });
};
