import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { normalizeDomainInput } from '@/lib/domain';
import { cn } from '@/lib/utils';

interface DomainInputProps {
  placeholder: string;
  disabled?: boolean;
  onSubmit: (domain: string) => Promise<void> | void;
  className?: string;
}

export function DomainInput({
  placeholder,
  disabled = false,
  onSubmit,
  className,
}: DomainInputProps) {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = normalizeDomainInput(value);
    if (!normalized) return;
    setSubmitting(true);
    try {
      await onSubmit(normalized);
      setValue('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex items-center gap-2', className)}
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={disabled || submitting}
        className="text-sm"
        autoComplete="off"
      />
      <Button type="submit" size="icon" disabled={disabled || submitting}>
        {submitting ? <Spinner className="text-white" /> : <Plus className="h-4 w-4" />}
      </Button>
    </form>
  );
}
