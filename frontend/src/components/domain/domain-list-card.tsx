import { Card } from '@/components/ui/card';
import { DomainInput } from './domain-input';
import { DomainList } from './domain-list';
import { cn } from '@/lib/utils';

interface DomainListCardProps {
  title: string;
  icon: React.ReactNode;
  accentClass: string;
  placeholder: string;
  domains: string[];
  onAdd: (domain: string) => Promise<void> | void;
  onRemove: (domain: string) => Promise<void> | void;
  disabled?: boolean;
  actions?: React.ReactNode;
  alert?: string | null;
}

export function DomainListCard({
  title,
  icon,
  accentClass,
  placeholder,
  domains,
  onAdd,
  onRemove,
  disabled = false,
  actions,
  alert,
}: DomainListCardProps) {
  return (
    <Card className='h-full border border-slate-200 bg-white shadow-sm'>
      <div className='flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-white',
              accentClass
            )}
          >
            {icon}
          </div>
          <div className='font-semibold text-slate-900'>{title}</div>
        </div>
        {actions}
      </div>

      <div className='space-y-3 px-4 py-4'>
        <DomainInput
          placeholder={placeholder}
          onSubmit={onAdd}
          disabled={disabled}
        />
        <DomainList
          domains={domains}
          onRemove={(domain) => onRemove(domain)}
          disabled={disabled}
          emptyHint='No sites yet'
        />
        {alert ? (
          <div className='rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
            {alert}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
