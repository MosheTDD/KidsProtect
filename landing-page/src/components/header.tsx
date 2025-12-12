import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-no-bg.png';
import { FaGithub } from 'react-icons/fa';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'GitHub', href: 'https://github.com/MosheTDD/KidsProtect' },
];

export function Header() {
  return (
    <header className='w-full'>
      <div className='mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 text-center md:flex-row md:items-center md:gap-4 md:px-4 md:py-5 md:text-left'>
        <div className='flex flex-1 items-center justify-center gap-2 md:justify-start'>
          <img
            src={logo}
            alt='KidsProtect logo'
            className='h-10 w-10 rounded-full'
          />
          <div className='leading-tight'>
            <p className='text-lg font-semibold text-[#0f1f43]'>KidsProtect</p>
          </div>
        </div>

        <nav className='hidden flex-1 items-center justify-center gap-1 md:flex'>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant='ghost'
              asChild
              className='px-3 text-sm font-medium text-slate-700 hover:text-[#0f1f43]'
            >
              <a href={link.href}>
                {link.label === 'GitHub' && (
                  <FaGithub className='h-4 w-4' aria-hidden='true' />
                )}
                {link.label}
              </a>
            </Button>
          ))}
        </nav>

        <div className='hidden flex-1 md:block' aria-hidden='true' />
      </div>

      <div className='px-4 pb-3 md:hidden'>
        <div className='flex flex-wrap justify-center gap-2'>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant='ghost'
              size='sm'
              asChild
              className='rounded-full border border-slate-200/70 bg-white/80 px-3 text-sm font-medium text-slate-700'
            >
              <a href={link.href}>
                {link.label === 'GitHub' && (
                  <FaGithub className='mr-2 h-4 w-4' aria-hidden='true' />
                )}
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
