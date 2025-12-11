export type DomainList = string[];

export interface AppState {
  lockdown: boolean;
  whitelist: DomainList;
  blacklist: DomainList;
}

export interface ApiResponse<T = AppState> {
  ok: boolean;
  error?: string;
  state: T extends AppState ? AppState : T;
}
