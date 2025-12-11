import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface DomainListItemProps {
  domain: string;
  onRemove: (domain: string) => void;
  disabled?: boolean;
  busy?: boolean;
  className?: string;
}

export function DomainListItem({
  domain,
  onRemove,
  disabled = false,
  busy = false,
  className,
}: DomainListItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-800',
        disabled && 'opacity-70',
        className,
      )}
    >
      <span className="truncate">{domain}</span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onRemove(domain)}
        disabled={disabled || busy}
        className="text-slate-500 hover:text-slate-700"
      >
        {busy ? <Spinner className="text-slate-500" /> : <Trash2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
