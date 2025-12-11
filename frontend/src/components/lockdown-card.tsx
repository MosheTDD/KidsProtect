import { Shield, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface LockdownCardProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

export function LockdownCard({ enabled, onToggle, disabled }: LockdownCardProps) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              Lockdown Mode
              <Shield className="h-4 w-4 text-slate-500" />
            </div>
            <p className="text-sm text-slate-600">
              Block all sites except those in the Allowed Sites list.
            </p>
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={(checked) => onToggle(checked)}
          disabled={disabled}
          className="mt-1"
        />
      </div>
    </Card>
  );
}
