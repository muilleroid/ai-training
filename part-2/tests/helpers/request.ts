import { baseUrl } from '../constants';
import { app, authToken } from '../setup';

type RequestParams = {
  authenticated?: boolean;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  path: string;
  payload?: Record<string, unknown>;
  query?: Record<string, string>;
};

export const request = async ({ authenticated = false, method = 'GET', path, payload, query }: RequestParams) => {
  const urlSearchParams = new URLSearchParams(query || {});

  const url = `${baseUrl}${!path.startsWith('/') ? '/' : ''}${path}?${urlSearchParams}`;

  const response = await app.handle(
    new Request(url, {
      body: payload ? JSON.stringify(payload) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...(authenticated && { Authorization: `Bearer ${authToken}` }),
      },
      method,
    }),
  );
  const data = await response.json();

  return {
    data,
    status: response.status,
  };
};
