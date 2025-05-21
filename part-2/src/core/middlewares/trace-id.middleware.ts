import { Elysia } from 'elysia';
import { getCurrentSpan } from '@elysiajs/opentelemetry';

export const traceIdMiddleware = new Elysia({ name: 'traceId' }).onRequest(function traceIdMiddleware({ set }) {
  const currentSpan = getCurrentSpan();
  const traceId = currentSpan?.spanContext().traceId;

  if (traceId) {
    set.headers['x-trace-id'] = traceId;
  }
});
