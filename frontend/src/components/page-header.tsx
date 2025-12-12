import { MoreHorizontal, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo-no-bg.png';

interface PageHeaderProps {
  onRefresh: () => void;
  onUndoAll: () => void;
  busy?: boolean;
}

export function PageHeader({ onRefresh, onUndoAll, busy = false }: PageHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="KidsProtect" className="h-12 w-12" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Parental Control Panel
          </p>
          <h1 className="text-3xl font-bold text-slate-900">KidsProtect</h1>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="gap-2 text-slate-700"
            disabled={busy}
          >
            More Options
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={onRefresh} disabled={busy}>
            Refresh
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUndoAll} disabled={busy}>
            <Undo2 className="mr-2 h-4 w-4" />
            Undo All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
