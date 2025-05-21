FROM oven/bun:1.2.13-alpine AS base

WORKDIR /usr/src/app

###

FROM base AS install

RUN mkdir -p /temp/prod

COPY package.json bun.lock /temp/prod/

WORKDIR /temp/prod

RUN bun install --frozen-lockfile --production

###

FROM base AS release

COPY --from=install /temp/prod/node_modules node_modules
COPY . .

ENV NODE_ENV=production

USER bun

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "run", "./src/index.ts" ]
