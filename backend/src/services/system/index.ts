import type { SystemController } from './base.js';
import { MacOSController } from './macos.js';
import { WindowsController } from './windows.js';

class NoopController implements SystemController {
  async blockAll(): Promise<void> {
    console.warn('[system] Unsupported platform - blockAll is a no-op');
  }

  async unblockAll(): Promise<void> {
    console.warn('[system] Unsupported platform - unblockAll is a no-op');
  }

  async blockDomain(domain: string): Promise<void> {
    console.warn(`[system] Unsupported platform - blockDomain ${domain} is a no-op`);
  }

  async unblockDomain(domain: string): Promise<void> {
    console.warn(`[system] Unsupported platform - unblockDomain ${domain} is a no-op`);
  }

  async allowDomain(domain: string): Promise<void> {
    console.warn(`[system] Unsupported platform - allowDomain ${domain} is a no-op`);
  }

  async clearAll(): Promise<void> {
    console.warn('[system] Unsupported platform - clearAll is a no-op');
  }
}

const createSystemController = (): SystemController => {
  if (process.platform === 'win32') {
    return new WindowsController();
  }

  if (process.platform === 'darwin') {
    return new MacOSController();
  }

  return new NoopController();
};

let cachedController: SystemController | null = null;

export const getSystemController = (): SystemController => {
  if (!cachedController) {
    cachedController = createSystemController();
  }

  return cachedController;
};
