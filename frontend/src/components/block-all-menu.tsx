import { Check, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BlockAllMenuProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

export function BlockAllMenu({
  enabled,
  onToggle,
  disabled,
}: BlockAllMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='text-slate-500 hover:text-slate-700'
          disabled={disabled}
        >
          <EllipsisVertical className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-52'>
        <DropdownMenuItem
          onClick={() => onToggle(!enabled)}
          className='flex items-center justify-between'
          disabled={disabled}
        >
          <span>Block all</span>
          {enabled ? <Check className='h-4 w-4 text-green-600' /> : null}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {enabled ? (
          <div className='px-3 py-2 text-sm text-red-600'>
            All sites are blocked except those on the Allowed list.
          </div>
        ) : (
          <div className='px-3 py-2 text-xs text-slate-500'>
            Enable lockdown to use “Block all.”
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
