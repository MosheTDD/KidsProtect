import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { resolveConfigFilePath } from '../utils/storage-paths.js';

const CONFIG_FILE = resolveConfigFilePath();
const AUTH_TOKEN_KEY = 'token';

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
    if (code !== 'ENOENT') {
      console.warn('[auth] Failed to read auth token, regenerating.', error);
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
