const DEFAULT_PORT = 8787;

export const getPort = (): number => {
  const parsed = Number(process.env.PORT);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return DEFAULT_PORT;
};
