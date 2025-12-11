export interface SystemController {
  blockAll(whitelist?: string[]): Promise<void>;
  unblockAll(): Promise<void>;
  blockDomain(domain: string): Promise<void>;
  unblockDomain(domain: string): Promise<void>;
  allowDomain(domain: string): Promise<void>;
  clearAll(): Promise<void>;
}
