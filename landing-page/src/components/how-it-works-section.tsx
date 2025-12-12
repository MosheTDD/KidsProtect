import { motion } from 'motion/react';
import type { ComponentType } from 'react';
import { Download, ListChecks, LockKeyhole } from 'lucide-react';

type Step = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
  iconColor: string;
};

const steps: Step[] = [
  {
    title: 'Download',
    description:
      'Get the free app for macOS or Windows. No signups or tracking—just install and go.',
    icon: Download,
    accent: 'bg-[#e7f0ff]',
    iconColor: 'text-[#2d7cff]',
  },
  {
    title: 'Open as admin',
    description:
      'Launch KidsProtect as an administrator so it can apply system-wide protection that covers every browser.',
    icon: LockKeyhole,
    accent: 'bg-[#f2eefe]',
    iconColor: 'text-[#8a4cf5]',
  },
  {
    title: 'Allow or block sites',
    description:
      'Add trusted sites to an allowlist or block distractions, then toggle protection on to enforce instantly.',
    icon: ListChecks,
    accent: 'bg-[#e9f7ef]',
    iconColor: 'text-[#2f9b5a]',
  },
];

export function HowItWorksSection() {
  return (
    <motion.section
      id='how-it-works'
      className='bg-[#f6f9ff] py-12 sm:py-16'
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: 'easeOut' },
        },
      }}
    >
      <div className='mx-auto max-w-6xl px-4'>
        <div className='text-center'>
          <motion.div
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f1f43]'
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <span className='h-2 w-2 rounded-full bg-[#69b8ff] shadow-[0_0_0_5px_rgba(105,184,255,0.2)]' />
            How it works
          </motion.div>
          <motion.h3
            className='mt-4 text-2xl font-semibold text-[#0f1f43] sm:text-3xl'
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Simple setup. Powerful protection.
          </motion.h3>
          <motion.p
            className='mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:mx-auto sm:text-base'
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            No accounts, no cloud services—just three quick steps to lock down
            the family computer.
          </motion.p>
        </div>

        <div className='relative mt-10 p-6 sm:p-8'>
          <motion.div
            className='absolute left-[11%] right-[11%] top-16.5 hidden border-t border-dashed border-slate-300/80 md:block'
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className='grid gap-8 md:grid-cols-3'>
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      className='relative flex flex-col items-center text-center'
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 30, rotateX: -6 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.08,
            ease: 'easeOut',
          },
        },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
    >
      <motion.div
        className='relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(9,30,70,0.12)]'
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.accent}`}
        >
          <Icon className={`h-6 w-6 ${step.iconColor}`} />
        </div>
        <span className='absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0f1f43] text-xs font-semibold text-white'>
          {index + 1}
        </span>
      </motion.div>
      <h4 className='mt-4 text-lg font-semibold text-[#0f1f43]'>
        {step.title}
      </h4>
      <p className='mt-2 text-sm leading-relaxed text-slate-600'>
        {step.description}
      </p>
    </motion.div>
  );
}
