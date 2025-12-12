import { motion } from 'motion/react';
import type { ComponentType } from 'react';
import { Code2, ShieldCheck, Sparkles } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tint: string;
  anchor?: string;
};

const features: Feature[] = [
  {
    title: 'System-Level Blocking',
    description:
      "Works across all browsers. By editing system host files, we ensure blocks can't be bypassed easily by switching apps.",
    icon: ShieldCheck,
    tint: 'bg-[#e8f1ff] text-[#0f1f43]',
  },
  {
    title: 'Open Source',
    description:
      'Audit our code on GitHub. We believe security tools should be transparent. No hidden tracking or data collection.',
    icon: Code2,
    tint: 'bg-[#e7f7ec] text-[#2f9b5a]',
    anchor: 'github',
  },
  {
    title: 'Kid-Friendly Mode',
    description:
      'Lockdown mode restricts the computer to only the sites you explicitly allow, perfect for focused homework time.',
    icon: Sparkles,
    tint: 'bg-[#f0eaff] text-[#7b5cf5]',
  },
];

export function FeatureSection() {
  return (
    <motion.section
      id='features'
      className='bg-white py-12 sm:py-16'
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }}
    >
      <div className='mx-auto max-w-6xl px-4 text-center'>
        <div className='text-center'>
          <motion.div
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f1f43]'
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <span className='h-2 w-2 rounded-full bg-[#69b8ff] shadow-[0_0_0_5px_rgba(105,184,255,0.2)]' />
            Features
          </motion.div>
          <motion.h3
            className='mt-4 text-2xl font-semibold text-[#0f1f43] sm:text-3xl'
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Simple tools for peace of mind
          </motion.h3>
        </div>

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.article
      id={feature.anchor}
      className='rounded-xl border border-slate-200 bg-[#f7fbff] p-5 shadow-[0_14px_60px_rgba(9,30,70,0.08)]'
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(4px)' },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            delay: index * 0.08,
            ease: 'easeOut',
          },
        },
      }}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6, scale: 1.01, boxShadow: '0 18px 80px rgba(9,30,70,0.14)' }}
      transition={{
        duration: 0.3,
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
    >
      <div
        className={`mb-4 inline-flex size-11 items-center justify-center rounded-lg ${feature.tint}`}
      >
        <Icon className='h-5 w-5' />
      </div>
      <h3 className='text-lg font-semibold text-[#0f1f43]'>{feature.title}</h3>
      <p className='mt-2 text-sm leading-relaxed text-slate-600'>
        {feature.description}
      </p>
    </motion.article>
  );
}
