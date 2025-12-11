// backend/src/services/system/windows.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import type { SystemController } from './base.js';
import {
  addBlockedDomain,
  removeBlockedDomain,
  clearAllKidsProtectEntries,
} from './hosts.js';
import { expandWhitelistDomains, resolveDomainsToIps } from './resolve.js';

const execAsync = promisify(exec);

const BLOCK_RULE_NAME = 'KidsProtect_BlockAll';
const ALLOW_LOOPBACK_RULE_NAME = 'KidsProtect_AllowLoopback';
const ALLOW_LIST_RULE_NAME = 'KidsProtect_AllowList';
const ALLOW_DNS_RULE_NAME = 'KidsProtect_AllowDNS';

async function runNetsh(args: string): Promise<void> {
  try {
    await execAsync(`netsh ${args}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[windows] netsh failed:', message);
    throw new Error(`netsh failed: ${message}`);
  }
}

export class WindowsController implements SystemController {
  async blockAll(whitelist: string[]): Promise<void> {
    console.log('[windows] blockAll()');
    await this.unblockAll();

    await runNetsh(
      `advfirewall firewall add rule name="${ALLOW_LOOPBACK_RULE_NAME}" dir=out action=allow remoteip=127.0.0.1`
    );

    const expanded = expandWhitelistDomains(whitelist);
    const allowIps = await resolveDomainsToIps(expanded);
    if (allowIps.length) {
      await runNetsh(
        `advfirewall firewall add rule name="${ALLOW_LIST_RULE_NAME}" dir=out action=allow remoteip=${allowIps.join(
          ','
        )}`
      );
    }
    await runNetsh(
      `advfirewall firewall add rule name="${BLOCK_RULE_NAME}" dir=out action=block remoteip=any`
    );
    try {
      await runNetsh(
        `advfirewall firewall add rule name="${ALLOW_DNS_RULE_NAME}" dir=out action=allow protocol=udp remoteport=53`
      );
    } catch {
      // ignore
    }
  }

  async unblockAll(): Promise<void> {
    console.log('[windows] unblockAll()');
    await runNetsh(
      `advfirewall firewall delete rule name="${BLOCK_RULE_NAME}"`
    );
    await runNetsh(
      `advfirewall firewall delete rule name="${ALLOW_LOOPBACK_RULE_NAME}"`
    );
    await runNetsh(
      `advfirewall firewall delete rule name="${ALLOW_LIST_RULE_NAME}"`
    );
    await runNetsh(
      `advfirewall firewall delete rule name="${ALLOW_DNS_RULE_NAME}"`
    );
  }

  async blockDomain(domain: string): Promise<void> {
    console.log('[windows] blockDomain(%s)', domain);
    await addBlockedDomain(domain);
  }

  async unblockDomain(domain: string): Promise<void> {
    console.log('[windows] unblockDomain(%s)', domain);
    await removeBlockedDomain(domain);
  }

  async allowDomain(domain: string): Promise<void> {
    console.log(
      '[windows] allowDomain(%s) – TODO implement IP-based allow',
      domain
    );
  }

  async clearAll(): Promise<void> {
    console.log('[windows] clearAll()');
    await this.unblockAll();
    await clearAllKidsProtectEntries();
  }
}
