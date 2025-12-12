import os from 'os';
import path from 'path';

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

export const resolveStateFilePath = (): string => {
  const customPath = process.env.KIDSPROTECT_STATE_FILE;
  if (customPath) {
    return path.resolve(customPath);
  }

  return path.join(getDataDir(), 'state.json');
};

export const resolveConfigFilePath = (): string => {
  const customPath = process.env.KIDSPROTECT_CONFIG_FILE;
  if (customPath) {
    return path.resolve(customPath);
  }

  return path.join(getDataDir(), 'config.json');
};
