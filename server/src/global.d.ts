declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
    }
  }
}

export {};
