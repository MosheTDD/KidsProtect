export const normalizeDomainInput = (value: string): string | null => {
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
    const hostname = trimmed
      .replace(/^[a-z]+:\/\//, '')
      .split(/[/?#\s]/)[0]
      .split(':')[0]
      .replace(/^\.+|\.+$/g, '');

    return hostname || null;
  }
};
