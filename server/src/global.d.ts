declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      JWT_SECRET: string;
    }
  }

  namespace Express {
    export interface Request {
      user: import('./models/user.model').IUser;
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    _id: string;
  }
}

export {};
