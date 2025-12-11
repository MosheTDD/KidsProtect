import type { AppState } from '../models/state.js';
import { getSystemController } from './system/index.js';

const controller = getSystemController();

export const blockAll = async (whitelist: string[] = []): Promise<void> => {
  await controller.blockAll(whitelist);
};

export const unblockAll = async (): Promise<void> => {
  await controller.unblockAll();
};

export const blockDomain = async (domain: string): Promise<void> => {
  await controller.blockDomain(domain);
};

export const unblockDomain = async (domain: string): Promise<void> => {
  await controller.unblockDomain(domain);
};

export const allowDomain = async (domain: string): Promise<void> => {
  await controller.allowDomain(domain);
};

export const clearAll = async (): Promise<void> => {
  await controller.clearAll();
};

export const applyBlacklist = async (state: AppState): Promise<void> => {
  if (!state.blacklist.length) {
    return;
  }

  await Promise.all(state.blacklist.map((domain) => controller.blockDomain(domain)));
};
