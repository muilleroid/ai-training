type Config = {
  application: { port: number };
  database: { url: string };
  jwt: {
    secret: string;
    expiration: string;
  };
};

export const config: Config = {
  application: {
    port: parseInt(Bun.env.PORT || '3000', 10),
  },
  database: {
    url: Bun.env.DATABASE_URL!,
  },
  jwt: {
    secret: Bun.env.JWT_SECRET!,
    expiration: Bun.env.JWT_EXPIRATION || '7d',
  },
};
