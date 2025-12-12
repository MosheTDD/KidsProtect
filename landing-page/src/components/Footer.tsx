import logo from '@/assets/logo-no-bg.png';

type FooterLink = {
  label: string;
  href: string;
};

const footerLinks: FooterLink[] = [
  {
    label: 'Github',
    href: 'https://github.com/MosheTDD/KidsProtect/wiki',
  },
  {
    label: 'Privacy Policy',
    href: 'https://github.com/MosheTDD/KidsProtect/PRIVACY.md',
  },
  {
    label: 'Report Issue',
    href: 'https://github.com/MosheTDD/KidsProtect/issues/new/choose',
  },
  { label: 'Donate', href: 'https://github.com/sponsors/MosheTDD' },
];

export function Footer() {
  return (
    <footer id='github' className='bg-[#0c1b34] text-slate-100'>
      <div className='mx-auto max-w-6xl px-4 py-10'>
        <div className='flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
          <div className='flex items-center gap-3'>
            <img
              src={logo}
              alt='KidsProtect logo'
              className='h-9 w-9 rounded-full'
            />
            <div className='leading-tight text-start'>
              <p className='text-lg font-semibold'>KidsProtect</p>
              <p className='text-xs text-slate-300'>Open Source</p>
            </div>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-300 sm:justify-end sm:text-left'>
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target='_blank'
                className='hover:text-white'
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className='mt-6 text-center text-xs text-slate-400 sm:text-left'>
          © 2025 KidsProtect. GPLv3 Licensed.
        </div>
      </div>
    </footer>
  );
}
