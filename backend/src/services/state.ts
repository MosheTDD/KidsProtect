import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { AppState } from '../models/state.js';
import { normalizeDomain } from '../utils/domain.js';
import { resolveStateFilePath } from '../utils/storage-paths.js';

const defaultState: AppState = {
  lockdown: false,
  whitelist: [],
  blacklist: [],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEGACY_STATE_FILE = path.resolve(__dirname, '..', '..', 'state.json');

const STATE_FILE = resolveStateFilePath();

const ensureStateDir = async (): Promise<void> => {
  await fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
};

const normalizeDomains = (domains: string[] | undefined): string[] =>
  Array.from(
    new Set(
      (domains ?? [])
        .map((domain) => normalizeDomain(domain))
        .filter((domain): domain is string => Boolean(domain))
    )
  );

const normalizeState = (state: Partial<AppState>): AppState => ({
  lockdown: Boolean(state.lockdown),
  whitelist: normalizeDomains(state.whitelist),
  blacklist: normalizeDomains(state.blacklist),
});

const writeState = async (state: AppState): Promise<void> => {
  await ensureStateDir();
  await fs.writeFile(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
};

const loadLegacyState = async (): Promise<AppState | null> => {
  try {
    const fileContents = await fs.readFile(LEGACY_STATE_FILE, 'utf8');
    const parsed = JSON.parse(fileContents) as Partial<AppState>;
    const normalized = normalizeState({ ...defaultState, ...parsed });
    await writeState(normalized);
    return normalized;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code && code !== 'ENOENT') {
      console.warn('[state] Failed to read legacy state file.', error);
    }
    return null;
  }
};

export const loadState = async (): Promise<AppState> => {
  try {
    await ensureStateDir();
    const fileContents = await fs.readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(fileContents) as Partial<AppState>;
    return normalizeState({ ...defaultState, ...parsed });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code === 'ENOENT') {
      const legacyState = await loadLegacyState();
      if (legacyState) {
        return legacyState;
      }
    }

    if (code !== 'ENOENT') {
      console.warn(
        '[state] Failed to read state file, resetting to defaults.',
        error
      );
    }

    await writeState(defaultState);
    return defaultState;
  }
};

export const saveState = async (state: AppState): Promise<AppState> => {
  const normalized = normalizeState(state);
  await writeState(normalized);
  return normalized;
};

export const resetState = async (): Promise<AppState> => {
  await writeState(defaultState);
  return defaultState;
};
