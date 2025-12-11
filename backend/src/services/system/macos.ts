// backend/src/services/system/macos.ts
import type { SystemController } from './base.js';
import { runAsAdminScript, escapeForAppleScript } from './macos-utils.js';
import {
  addBlockedDomain,
  removeBlockedDomain,
  clearAllKidsProtectEntries,
} from './hosts.js';
import { expandWhitelistDomains, resolveDomainsToIps } from './resolve.js';

const PF_ANCHOR_PATH = '/etc/pf.anchors/kidsprotect';

export class MacOSController implements SystemController {
  /**
   * Lockdown ON
   * One admin prompt for:
   *  - writing anchor
   *  - loading pf rules
   *  - enabling pf
   */
  async blockAll(whitelist?: string[]): Promise<void> {
    console.log('[macos] blockAll()');

    const safeWhitelist = Array.isArray(whitelist) ? whitelist : [];

    const expanded = expandWhitelistDomains(safeWhitelist);
    const allowIps = expanded.length ? await resolveDomainsToIps(expanded) : [];

    const rules = [
      'set skip on lo0',
      'pass out quick on lo0 all',
      'pass out quick proto { tcp udp } from any to any port 53',
      ...(allowIps.length
        ? [
            `table <kidsprotect_allow> persist { ${allowIps.join(' ')} }`,
            'pass out quick to <kidsprotect_allow>',
          ]
        : []),
      'block out all',
      '',
    ].join('\n');

    const script = `
printf "%s\n" "${escapeForAppleScript(
      rules
    )}" | tee ${PF_ANCHOR_PATH} >/dev/null 2>&1
pfctl -f ${PF_ANCHOR_PATH}
pfctl -e || true
`;

    await runAsAdminScript(script, 'blockAll rules');
  }

  async unblockAll(): Promise<void> {
    console.log('[macos] unblockAll()');

    const script = `
pfctl -F all || true
printf "" | tee ${PF_ANCHOR_PATH} >/dev/null 2>&1
`;

    await runAsAdminScript(script, 'unblockAll rules');
  }

  async blockDomain(domain: string): Promise<void> {
    console.log('[macos] blockDomain(%s)', domain);
    await addBlockedDomain(domain);
  }

  async unblockDomain(domain: string): Promise<void> {
    console.log('[macos] unblockDomain(%s)', domain);
    await removeBlockedDomain(domain);
  }

  async allowDomain(domain: string): Promise<void> {
    console.log(
      '[macos] allowDomain(%s) – no-op (handled by blockAll whitelist)',
      domain
    );
  }

  async clearAll(): Promise<void> {
    console.log('[macos] clearAll()');
    await this.unblockAll();
    await clearAllKidsProtectEntries();
  }
}
