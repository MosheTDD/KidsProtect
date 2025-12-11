export const normalizeDomain = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return null;
  }

  const candidate = trimmed.includes('://') ? trimmed : `http://${trimmed}`;

  try {
    const url = new URL(candidate);
    const hostname = url.hostname.replace(/^\.+|\.+$/g, '');
    return hostname || null;
  } catch {
    const withoutScheme = trimmed.replace(/^[a-z]+:\/\//, '');
    const hostWithPort = withoutScheme.split(/[/?#\s]/)[0] ?? '';
    const hostOnly = hostWithPort.split(':')[0] ?? '';
    const hostname = hostOnly.replace(/^\.+|\.+$/g, '');

    return hostname || null;
  }
};
