import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const AUTH_TOKEN_KEY = 'token';
export const AUTH_HEADER_NAME = 'x-kidsprotect-token';

const getDataDir = (): string => {
  if (process.platform === 'win32') {
    const appData =
      process.env.APPDATA ?? path.join(os.homedir(), 'AppData', 'Roaming');
    return path.join(appData, 'KidsProtect');
  }

  if (process.platform === 'darwin') {
    return path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'KidsProtect',
    );
  }

  const xdgDataHome =
    process.env.XDG_DATA_HOME ?? path.join(os.homedir(), '.local', 'share');

  return path.join(xdgDataHome, 'KidsProtect');
};

const CONFIG_FILE = (() => {
  const customPath = process.env.KIDSPROTECT_CONFIG_FILE;
  if (customPath) {
    return path.resolve(customPath);
  }

  return path.join(getDataDir(), 'config.json');
})();

const generateToken = (): string => crypto.randomBytes(32).toString('hex');

const ensureConfigDir = async (): Promise<void> => {
  await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
};

const readTokenFromDisk = async (): Promise<string | null> => {
  try {
    const raw = await fs.readFile(CONFIG_FILE, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    const token =
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as Record<string, unknown>)[AUTH_TOKEN_KEY] === 'string'
        ? ((parsed as Record<string, string>)[AUTH_TOKEN_KEY] || '').trim()
        : '';

    return token || null;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code && code !== 'ENOENT') {
      console.warn('[desktop] Failed to read auth token, regenerating.', error);
    }
    return null;
  }
};

const writeTokenToDisk = async (token: string): Promise<string> => {
  await ensureConfigDir();
  const payload = { [AUTH_TOKEN_KEY]: token };
  const serialized = `${JSON.stringify(payload, null, 2)}\n`;

  try {
    await fs.writeFile(CONFIG_FILE, serialized, {
      encoding: 'utf8',
      flag: 'wx',
    });
    return token;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code && code !== 'EEXIST') {
      throw error;
    }
  }

  const existing = await readTokenFromDisk();
  if (existing) {
    return existing;
  }

  await fs.writeFile(CONFIG_FILE, serialized, 'utf8');
  const stored = (await readTokenFromDisk()) ?? token;
  return stored;
};

let cachedToken: string | null = null;
let tokenPromise: Promise<string> | null = null;

export const getAuthToken = async (): Promise<string> => {
  if (cachedToken) {
    return cachedToken;
  }

  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    const existing = await readTokenFromDisk();
    if (existing) {
      cachedToken = existing;
      return existing;
    }

    const token = generateToken();
    const persisted = await writeTokenToDisk(token);
    cachedToken = persisted;
    return persisted;
  })();

  try {
    return await tokenPromise;
  } finally {
    tokenPromise = null;
  }
};
