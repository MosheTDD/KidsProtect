import dns from 'dns/promises';
import { normalizeDomain } from '../../utils/domain.js';

const ALLOW_EXPANSIONS: Record<string, string[]> = {
  'youtube.com': ['googlevideo.com', 'ytimg.com', 'gstatic.com', 'googleapis.com'],
};

export const expandWhitelistDomains = (domains: string[]): string[] => {
  const normalized = domains
    .map((domain) => normalizeDomain(domain))
    .filter((domain): domain is string => Boolean(domain));
  const expanded = new Set<string>();

  for (const domain of normalized) {
    expanded.add(domain);
    const extras = ALLOW_EXPANSIONS[domain];
    if (extras) {
      extras.forEach((extra) => expanded.add(extra));
    }
  }

  return Array.from(expanded);
};

export const resolveDomainsToIps = async (domains: string[]): Promise<string[]> => {
  const normalized = domains
    .map((domain) => normalizeDomain(domain))
    .filter((domain): domain is string => Boolean(domain));

  const lookups = await Promise.all(
    normalized.map(async (domain) => {
      try {
        const records = await dns.lookup(domain, { all: true });
        return records.map((record) => record.address);
      } catch {
        return [];
      }
    }),
  );

  const deduped = new Set<string>();
  lookups.flat().forEach((ip) => deduped.add(ip));
  return Array.from(deduped);
};
