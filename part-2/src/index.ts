import { appFactory } from './app.factory';

const app = appFactory();

// eslint-disable-next-line no-console
console.log(`Listening on ${app.server!.url}`);
