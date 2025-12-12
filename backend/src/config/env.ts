const DEFAULT_PORT = 8787;
const DEFAULT_HOST = '127.0.0.1';

export const getPort = (): number => {
  const parsed = Number(process.env.PORT);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return DEFAULT_PORT;
};

export const getHost = (): string => {
  const host = (process.env.HOST ?? '').trim();

  if (host === '127.0.0.1' || host === '::1' || host === 'localhost') {
    return host === 'localhost' ? DEFAULT_HOST : host;
  }

  if (host) {
    console.warn(
      `[backend] Ignoring non-loopback HOST value "${host}", binding to ${DEFAULT_HOST} instead.`,
    );
  }

  return DEFAULT_HOST;
};
