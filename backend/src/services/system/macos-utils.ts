import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export const escapeForAppleScript = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

export const runAsAdminScript = async (command: string, label: string): Promise<void> => {
  const escaped = escapeForAppleScript(command);
  const script = `do shell script "${escaped}" with administrator privileges`;

  try {
    await execFileAsync('/usr/bin/osascript', ['-e', script]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[macos] ${label} failed:`, message);
    throw new Error(`${label} failed: ${message}`);
  }
};
