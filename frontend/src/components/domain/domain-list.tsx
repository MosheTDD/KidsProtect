import { DomainListItem } from './domain-list-item';

interface DomainListProps {
  domains: string[];
  onRemove: (domain: string) => void;
  disabled?: boolean;
  emptyHint?: string;
  busy?: boolean;
}

export function DomainList({
  domains,
  onRemove,
  disabled = false,
  emptyHint = 'No domains yet',
  busy = false,
}: DomainListProps) {
  if (!domains.length) {
    return (
      <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-500">
        {emptyHint}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {domains.map((domain) => (
        <DomainListItem
          key={domain}
          domain={domain}
          onRemove={onRemove}
          disabled={disabled}
          busy={busy}
        />
      ))}
    </div>
  );
}
