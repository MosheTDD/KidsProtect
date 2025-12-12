import { motion, type Variants } from 'motion/react';
import demoPreview from '@/assets/demo.png';
import { DownloadButtons } from '@/components/download-buttons';
declare const __APP_VERSION__: string;

const landingEase = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
} satisfies Variants;

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: landingEase },
  },
} satisfies Variants;

const heroPreview = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: landingEase },
  },
} satisfies Variants;

export function HeroSection() {
  return (
    <motion.section
      variants={heroContainer}
      initial='hidden'
      animate='show'
      className='relative overflow-hidden pb-12 pt-4 sm:pb-16 sm:pt-8'
      id='home'
    >
      <motion.div
        className='absolute inset-x-0 -top-32 h-90 bg-linear-to-b from-[#e8f2ff] via-[#f3f7ff] to-transparent'
        animate={{ opacity: [0.6, 1, 0.7, 0.9], y: [-10, 4, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute left-1/2 top-28 h-80 w-170 -translate-x-1/2 rounded-full bg-[#88c5ff]/25 blur-[120px]'
        animate={{ x: [-18, 14, -10], y: [-8, 10, -6] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className='relative mx-auto max-w-6xl px-4'>
        <motion.div className='text-center' variants={heroContainer}>
          <motion.div
            variants={heroItem}
            className='mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f1f43] shadow-sm'
          >
            <span className='h-2 w-2 rounded-full bg-[#69b8ff] shadow-[0_0_0_5px_rgba(105,184,255,0.2)]' />
            Open-source parental control
          </motion.div>
          <motion.h1
            variants={heroItem}
            className='mt-6 text-4xl font-semibold leading-tight text-[#0f1f43] sm:text-5xl'
          >
            Safe Browsing for{' '}
            <span className='text-[#5dabff]'>Little Ones</span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className='mx-auto mt-4 max-w-3xl text-lg text-slate-600 sm:text-xl'
          >
            Open-source parental control for macOS &amp; Windows. Block
            distractions and unsafe content with a single click. 100% Free &amp;
            Private.
          </motion.p>

          <motion.div variants={heroItem}>
            <DownloadButtons className='mt-8 justify-center' />
          </motion.div>
          <motion.p
            variants={heroItem}
            className='mt-3 text-sm font-medium text-slate-500'
          >
            Latest Version: {__APP_VERSION__} • Free Forever • No Account Needed
          </motion.p>
        </motion.div>

        <motion.div variants={heroPreview} className='mt-10 sm:mt-14'>
          <motion.div
            className='rounded-[18px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_25px_120px_rgba(9,30,70,0.15)]'
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 170, damping: 18 }}
          >
            <div className='overflow-hidden rounded-[14px] border border-slate-100 bg-slate-50'>
              <img
                src={demoPreview}
                alt='KidsProtect dashboard preview'
                className='h-auto w-full object-cover'
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
