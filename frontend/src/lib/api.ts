import type { AppState } from '@/types';

const API_BASE = 'http://localhost:8787';

type StateResponse = { ok: true; state: AppState };
type ListResponse = { ok: true; state: AppState };

const withJson = (body?: unknown): RequestInit =>
  body
    ? {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    : {};

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Request failed');
    throw new Error(text || 'Request failed');
  }

  const data = (await res.json()) as { ok?: boolean; error?: string } & T;
  if (!data.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export const api = {
  getStatus: () => request<StateResponse>('/status'),
  setLockdown: (enabled: boolean) =>
    request<StateResponse>(enabled ? '/lockdown/on' : '/lockdown/off', {
      method: 'POST',
    }),
  addWhitelist: (domain: string) =>
    request<ListResponse>('/whitelist', {
      method: 'POST',
      ...withJson({ domain }),
    }),
  removeWhitelist: (domain: string) =>
    request<ListResponse>(`/whitelist/${encodeURIComponent(domain)}`, {
      method: 'DELETE',
    }),
  addBlacklist: (domain: string) =>
    request<ListResponse>('/blacklist', {
      method: 'POST',
      ...withJson({ domain }),
    }),
  removeBlacklist: (domain: string) =>
    request<ListResponse>(`/blacklist/${encodeURIComponent(domain)}`, {
      method: 'DELETE',
    }),
  undoAll: () =>
    request<StateResponse>('/undo-all', {
      method: 'POST',
    }),
};
