import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBannerProps {
  message: string | null;
  className?: string;
}

export function StatusBanner({ message, className }: StatusBannerProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700',
        className,
      )}
    >
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
