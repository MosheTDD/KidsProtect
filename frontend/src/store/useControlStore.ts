import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { normalizeDomainInput } from '@/lib/domain';
import type { AppState } from '@/types';

interface ControlState {
  state: AppState | null;
  loading: boolean;
  pending: boolean;
  error: string | null;
  fetchStatus: () => Promise<void>;
  setLockdown: (enabled: boolean) => Promise<void>;
  addWhitelist: (domain: string) => Promise<void>;
  removeWhitelist: (domain: string) => Promise<void>;
  addBlacklist: (domain: string) => Promise<void>;
  removeBlacklist: (domain: string) => Promise<void>;
  undoAll: () => Promise<void>;
  clearError: () => void;
}

export const useControlStore = create<ControlState>((set) => ({
  state: null,
  loading: false,
  pending: false,
  error: null,
  clearError: () => set({ error: null }),
  fetchStatus: async () => {
    set({ loading: true, error: null });
    try {
      const { state } = await api.getStatus();
      set({ state, loading: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load status';
      toast.error(message);
      set({ error: null, loading: false });
    }
  },
  setLockdown: async (enabled: boolean) => {
    set({ pending: true, error: null });
    try {
      const { state } = await api.setLockdown(enabled);
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update lockdown';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
  addWhitelist: async (domain: string) => {
    const value = normalizeDomainInput(domain);
    if (!value) return;
    set({ pending: true, error: null });
    try {
      const { state } = await api.addWhitelist(value);
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to add domain';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
  removeWhitelist: async (domain: string) => {
    const value = normalizeDomainInput(domain);
    if (!value) return;
    set({ pending: true, error: null });
    try {
      const { state } = await api.removeWhitelist(value);
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to remove domain';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
  addBlacklist: async (domain: string) => {
    const value = normalizeDomainInput(domain);
    if (!value) return;
    set({ pending: true, error: null });
    try {
      const { state } = await api.addBlacklist(value);
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to add domain';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
  removeBlacklist: async (domain: string) => {
    const value = normalizeDomainInput(domain);
    if (!value) return;
    set({ pending: true, error: null });
    try {
      const { state } = await api.removeBlacklist(value);
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to remove domain';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
  undoAll: async () => {
    set({ pending: true, error: null });
    try {
      const { state } = await api.undoAll();
      set({ state, pending: false });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to reset';
      toast.error(message);
      set({ error: null, pending: false });
    }
  },
}));
