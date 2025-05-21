type Config = {
  application: { port: number };
  database: { url: string };
  jwt: {
    expiration: string;
    secret: string;
  };
  logger: { level: string };
};

export const config: Config = {
  application: { port: parseInt(Bun.env.PORT || '3000', 10) },
  database: { url: Bun.env.DATABASE_URL! },
  jwt: {
    expiration: Bun.env.JWT_EXPIRATION || '7d',
    secret: Bun.env.JWT_SECRET!,
  },
  logger: { level: Bun.env.LOG_LEVEL || 'info' },
};
