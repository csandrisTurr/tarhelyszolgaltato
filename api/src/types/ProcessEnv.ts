interface ProcessEnvDecl {
  NODE_ENV?: string;
  PORT?: string;
  DATABASE_PORT?: number;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
  DATABASE_MAIN_DATABASE?: string;
  SECRET_KEY?: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnvDecl {}
  }
}

export default ProcessEnvDecl;