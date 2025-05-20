type Config = {
  application: { port: number };
  database: { url: string };
};

export const config: Config = {
  application: {
    port: parseInt(Bun.env.PORT || '3000', 10),
  },
  database: {
    url: Bun.env.DATABASE_URL!,
  },
};
