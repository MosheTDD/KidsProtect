import { app, BrowserWindow } from 'electron';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;

let backendProcess: ReturnType<typeof spawn> | null = null;
let backendStarted = false;
let mainWindow: BrowserWindow | null = null;

const getProdFrontendUrl = (): string => {
  const indexPath = path.join(
    process.resourcesPath,
    'app',
    'frontend',
    'index.html'
  );
  return pathToFileURL(indexPath).toString();
};

const loadFrontend = async (win: BrowserWindow): Promise<void> => {
  if (isDev) {
    const devUrl = process.env.FRONTEND_DEV_URL ?? 'http://localhost:5173';
    try {
      await win.loadURL(devUrl);
      return;
    } catch (error) {
      console.warn(
        '[desktop] Dev server unavailable, falling back to packaged frontend',
        error
      );
    }
  }

  await win.loadURL(getProdFrontendUrl());
};

const startBackend = async (): Promise<void> => {
  if (backendStarted) return;
  if (isDev) {
    backendStarted = true; // assume running separately
    return;
  }

  const backendEntry = path.join(
    process.resourcesPath,
    'app',
    'backend',
    'index.js'
  );

  try {
    // Import the backend directly in-process to avoid launching a separate Electron process.
    await import(pathToFileURL(backendEntry).toString());
    backendStarted = true;
    console.log('[desktop] backend started in-process');
  } catch (error) {
    console.error('[desktop] failed to start backend', error);
  }
};

const stopBackend = (): void => {
  if (backendProcess && !backendProcess.killed) {
    backendProcess.kill();
    backendProcess = null;
  }
  // Elevated launches on mac/windows are detached; no stop hook.
  backendStarted = false;
};

const createWindow = async (): Promise<void> => {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    title: 'KidsProtect',
    width: 1280,
    height: 775,
    icon:
      process.platform === 'darwin'
        ? path.join(__dirname, 'assets', 'icon.icns')
        : path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      contextIsolation: true,
    },
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  await loadFrontend(mainWindow);
};

const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    void startBackend();
    void createWindow();
  });

  app.on('activate', () => {
    void createWindow();
  });

  app.on('before-quit', () => {
    stopBackend();
  });

  app.on('window-all-closed', () => {
    stopBackend();
    if (process.platform !== 'darwin') app.quit();
  });
}
