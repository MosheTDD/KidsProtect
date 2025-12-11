import os from 'os';
import { promises as fs } from 'fs';
import { runAsAdminScript } from './macos-utils.js';
import { normalizeDomain } from '../../utils/domain.js';

const TAG = '# KidsProtect managed';

const buildEntries = (domain: string): string[] => {
  const normalized = normalizeDomain(domain);
  if (!normalized) return [];
  return [`127.0.0.1 ${normalized} ${TAG}`, `::1 ${normalized} ${TAG}`];
};

function getHostsPath(): string {
  const platform = os.platform();
  if (platform === 'win32') {
    return 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  }
  if (platform === 'darwin') {
    return '/etc/hosts';
  }
  throw new Error(`Unsupported platform for hosts file: ${platform}`);
}

async function readHostsLines(): Promise<{ path: string; lines: string[] }> {
  const hostsPath = getHostsPath();
  const text = await fs.readFile(hostsPath, 'utf8').catch((err) => {
    throw new Error(`Failed to read hosts file: ${err.message}`);
  });
  const lines = text.split(/\r?\n/);
  return { path: hostsPath, lines };
}

async function writeHostsLines(
  pathStr: string,
  lines: string[]
): Promise<void> {
  const text = lines.join('\n') + '\n';
  await fs.writeFile(pathStr, text, 'utf8').catch((err) => {
    throw new Error(`Failed to write hosts file: ${err.message}`);
  });
}

export async function addBlockedDomain(domain: string): Promise<void> {
  const { path: hostsPath, lines } = await readHostsLines();
  const entries = buildEntries(domain);
  if (!entries.length) return;

  let changed = false;
  for (const entry of entries) {
    if (!lines.includes(entry)) {
      lines.push(entry);
      changed = true;
    }
  }

  if (changed) {
    await writeHostsSafe(hostsPath, lines);
  }
}

export async function removeBlockedDomain(domain: string): Promise<void> {
  const { path: hostsPath, lines } = await readHostsLines();
  const normalized = normalizeDomain(domain);
  if (!normalized) return;

  const filtered = lines.filter((line) => {
    if (!line.includes(TAG)) return true;
    const lower = line.toLowerCase();
    return !lower.includes(normalized);
  });

  await writeHostsSafe(hostsPath, filtered);
}

export async function clearAllKidsProtectEntries(): Promise<void> {
  const { path: hostsPath, lines } = await readHostsLines();
  const filtered = lines.filter((line) => !line.includes(TAG));
  await writeHostsSafe(hostsPath, filtered);
}

async function writeHostsSafe(
  hostsPath: string,
  lines: string[]
): Promise<void> {
  const content = lines.join('\n') + '\n';
  if (os.platform() === 'darwin') {
    const script =
      `printf "%s" "${content.replace(/"/g, '\\"')}" > "${hostsPath.replace(
        /"/g,
        '\\"'
      )}"\n` +
      'dscacheutil -flushcache || true\n' +
      'killall -HUP mDNSResponder || true';
    await runAsAdminScript(script, 'write hosts');
    return;
  }

  await writeHostsLines(hostsPath, lines);
}
