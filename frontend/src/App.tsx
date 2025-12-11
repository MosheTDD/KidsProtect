import { useEffect } from 'react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { DomainListCard } from '@/components/domain/domain-list-card';
import { LockdownCard } from '@/components/lockdown-card';
import { PageHeader } from '@/components/page-header';
import { StatusBanner } from '@/components/status-banner';
import { BlockAllMenu } from '@/components/block-all-menu';
import { useControlStore } from '@/store/useControlStore';
import { cn } from '@/lib/utils';

function App() {
  const {
    state,
    loading,
    pending,
    error,
    fetchStatus,
    setLockdown,
    addWhitelist,
    removeWhitelist,
    addBlacklist,
    removeBlacklist,
    undoAll,
  } = useControlStore();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const locked = state?.lockdown ?? false;
  const showBlacklist = !locked;
  const isBusy = pending || loading;

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='mx-auto max-w-5xl px-6 py-10'>
        <PageHeader
          onRefresh={() => fetchStatus()}
          onUndoAll={() => undoAll()}
          busy={pending}
        />

        <StatusBanner message={error} className='mb-4' />

        <div className='space-y-6'>
          <LockdownCard
            enabled={locked}
            onToggle={(value) => setLockdown(value)}
            disabled={pending || loading}
          />

          <div
            className={cn(
              'grid gap-4',
              showBlacklist ? 'md:grid-cols-2' : 'md:grid-cols-1'
            )}
          >
            <DomainListCard
              title='Allowed Sites'
              icon={<ShieldCheck className='h-5 w-5' />}
              accentClass='bg-green-600'
              placeholder='e.g., wikipedia.org'
              domains={state?.whitelist ?? []}
              onAdd={addWhitelist}
              onRemove={removeWhitelist}
              disabled={isBusy}
            />
            {showBlacklist ? (
              <DomainListCard
                title='Blocked Sites'
                icon={<ShieldOff className='h-5 w-5' />}
                accentClass='bg-red-500'
                placeholder='e.g., youtube.com'
                domains={state?.blacklist ?? []}
                onAdd={addBlacklist}
                onRemove={removeBlacklist}
                disabled={isBusy}
                actions={
                  <BlockAllMenu
                    enabled={locked}
                    onToggle={(value) => setLockdown(value)}
                    disabled={isBusy || !locked}
                  />
                }
                alert={
                  locked
                    ? 'All sites are blocked except those on the Allowed list.'
                    : null
                }
              />
            ) : null}
          </div>

          <a
            className='text-xs text-slate-500'
            href='www.linkedin.com/in/moshe-khovailo'
            target='_blank'
          >
            Made by Moshe Khovailo
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
