import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FaWindows, FaApple } from 'react-icons/fa';

type DownloadButtonsProps = {
  className?: string;
};

const DOWNLOAD_LINKS = {
  mac: 'https://github.com/MosheTDD/KidsProtect/releases/download/v0.1.0-beta/KidsProtect-0.1.0-arm64.dmg',
  windows:
    'https://github.com/MosheTDD/KidsProtect/releases/download/v0.1.0-beta/KidsProtect-Setup-0.1.0.exe',
};

export function DownloadButtons({ className }: DownloadButtonsProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-start',
        className
      )}
    >
      <Button
        asChild
        size='lg'
        className='h-12 w-full min-w-[230px] px-6 text-base font-semibold bg-[#0f1f43] text-white hover:bg-[#0c1734] shadow-[0_18px_50px_rgba(9,30,70,0.35)] sm:w-auto'
      >
        <a
          href={DOWNLOAD_LINKS.windows}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Download KidsProtect for Windows'
        >
          <FaWindows className='text-white/90' />
          Download for Windows
        </a>
      </Button>
      <div className='flex flex-col items-center gap-1 sm:items-start md:items-center'>
        <Button
          asChild
          size='lg'
          variant='outline'
          className='h-12 w-full min-w-57.5 px-6 text-base font-semibold border-[#1f2f4d] text-[#0f1f43] bg-white hover:bg-slate-50 shadow-[0_16px_40px_rgba(16,31,67,0.12)] sm:w-auto'
        >
          <a
            href={DOWNLOAD_LINKS.mac}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Download KidsProtect for macOS'
          >
            <FaApple className='text-[#0f1f43]' />
            Download for macOS
          </a>
        </Button>
        <a
          href='https://github.com/MosheTDD/KidsProtect/releases#macos'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xs text-center font-medium text-[#0f1f43] underline underline-offset-4 hover:text-[#0c1734]'
        >
          Requires additional setup
        </a>
      </div>
    </div>
  );
}
