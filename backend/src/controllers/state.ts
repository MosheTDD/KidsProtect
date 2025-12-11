import type { Request, Response } from 'express';
import type { AppState } from '../models/state.js';
import { resetState, loadState, saveState } from '../services/state.js';
import {
  allowDomain,
  applyBlacklist,
  blockAll,
  unblockAll,
  unblockDomain,
  clearAll,
} from '../services/system.js';
import { normalizeDomain } from '../utils/domain.js';
import { HttpError } from '../middlewares/error-handler.js';

type DomainPayload = { domain?: string };

const ensureDomain = (value: unknown): string => {
  const domain = normalizeDomain(value);
  if (!domain) {
    throw new HttpError(400, 'domain is required');
  }

  return domain;
};

export const getStatus = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const state = await loadState();
  res.json({ ok: true, state });
};

export const enableLockdown = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const state = await loadState();
  const updatedState: AppState = { ...state, lockdown: true };
  await blockAll(updatedState.whitelist);
  await applyBlacklist(updatedState);
  const updated = await saveState(updatedState);

  res.json({ ok: true, state: updated });
};

export const disableLockdown = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const state = await loadState();
  const updatedState: AppState = { ...state, lockdown: false };
  await unblockAll();
  await applyBlacklist(updatedState);
  const updated = await saveState(updatedState);

  res.json({ ok: true, state: updated });
};

export const getWhitelist = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const state = await loadState();
  res.json({ ok: true, whitelist: state.whitelist, state });
};

export const addToWhitelist = async (
  req: Request<Record<string, never>, unknown, DomainPayload>,
  res: Response
): Promise<void> => {
  const domain = ensureDomain(req.body?.domain);

  const state = await loadState();
  const updatedState: AppState = {
    ...state,
    whitelist: [...state.whitelist, domain],
    blacklist: state.blacklist.filter((item) => item !== domain),
  };

  await allowDomain(domain);

  if (updatedState.lockdown) {
    await blockAll(updatedState.whitelist);
  }

  await applyBlacklist(updatedState);
  const updated = await saveState(updatedState);

  res.json({ ok: true, whitelist: updated.whitelist, state: updated });
};

export const removeFromWhitelist = async (
  req: Request<{ domain: string }>,
  res: Response
): Promise<void> => {
  const domain = ensureDomain(req.params.domain);

  const state = await loadState();
  const updatedState: AppState = {
    ...state,
    whitelist: state.whitelist.filter((item) => item !== domain),
  };

  await unblockDomain(domain);

  if (updatedState.lockdown) {
    await blockAll(updatedState.whitelist);
  }

  await applyBlacklist(updatedState);
  const updated = await saveState(updatedState);

  res.json({ ok: true, whitelist: updated.whitelist, state: updated });
};

export const getBlacklist = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const state = await loadState();
  res.json({ ok: true, blacklist: state.blacklist, state });
};

export const addToBlacklist = async (
  req: Request<Record<string, never>, unknown, DomainPayload>,
  res: Response
): Promise<void> => {
  const domain = ensureDomain(req.body?.domain);

  const state = await loadState();
  const updatedState: AppState = {
    ...state,
    blacklist: [...state.blacklist, domain],
    whitelist: state.whitelist.filter((item) => item !== domain),
  };

  if (updatedState.lockdown) {
    await blockAll(updatedState.whitelist);
  }

  await applyBlacklist(updatedState);
  const updated = await saveState(updatedState);

  res.json({ ok: true, blacklist: updated.blacklist, state: updated });
};

export const removeFromBlacklist = async (
  req: Request<{ domain: string }>,
  res: Response
): Promise<void> => {
  const domain = ensureDomain(req.params.domain);

  const state = await loadState();
  const updatedState: AppState = {
    ...state,
    blacklist: state.blacklist.filter((item) => item !== domain),
  };

  await unblockDomain(domain);

  if (state.lockdown) {
    await blockAll(updatedState.whitelist);
  }

  await applyBlacklist(updatedState);
  const updated: AppState = await saveState(updatedState);

  res.json({ ok: true, blacklist: updated.blacklist, state: updated });
};

export const undoAll = async (_req: Request, res: Response): Promise<void> => {
  await clearAll();
  const state = await resetState();
  res.json({ ok: true, state });
};
