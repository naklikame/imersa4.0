import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Box, Eye, Globe } from 'lucide-react';

const h = (text: string) => (
  <span className="text-forest font-semibold">{text}</span>
);

const features: { icon: React.ElementType; title: string; text: ReactNode }[] = [
  {
    icon: Box,
    title: 'Konfigurátor',
    text: <>Plynulé {h('3D animace')} provedou zákazníky jednotlivými patry, kde si rovnou prohlédnou půdorysy, ceny a detaily konkrétních bytů. Zákazník získá {h('dokonalý přehled o celém projektu')} z jediného místa.</>,
  },
  {
    icon: Eye,
    title: 'Vizualizace',
    text: <>Zákazníci {h('nakupují očima')} — proto vašemu projektu dáme vizuální podobu. Naše fotorealistické detaily {h('smazávají rozdíl mezi 3D návrhem a skutečností')}.</>,
  },
  {
    icon: Globe,
    title: 'Webové stránky',
    text: <>Od jednoduché prezentace nemovitosti až po komplexní digitální řešení pro obří developerské projekty. Dodáme vám moderní zázemí, které se {h('postará o plynulý prodej')} i ve chvíli, kdy vy nespíte.</>,
  },
];

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="bg-[#EAE8E0] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── MOBILE layout ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/70 border border-anthracite/8 rounded-3xl p-6 relative overflow-hidden flex flex-col"
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-forest/70 via-forest/25 to-transparent rounded-t-3xl" />

              {/* Ghost number */}
              <span className="absolute top-3 right-5 text-[88px] font-display font-extrabold text-anthracite/[0.045] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon with glow */}
              <div className="relative w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center mb-5 shrink-0">
                <feature.icon size={20} className="text-forest relative z-10" strokeWidth={1.75} />
                <div className="absolute inset-0 rounded-2xl bg-forest/30 blur-lg opacity-60" />
              </div>

              {/* Title */}
              <h3 className="text-[22px] font-display font-extrabold text-anthracite tracking-tight leading-tight mb-3">
                {feature.title}
              </h3>

              {/* Text */}
              <p className="text-[13px] text-anthracite/65 leading-relaxed">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-x-12 gap-y-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
                  <feature.icon size={16} className="text-forest" strokeWidth={1.75} />
                </div>
                <h3 className="text-[22px] lg:text-[26px] font-display font-extrabold text-anthracite tracking-tight leading-none">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[14px] text-anthracite/70 leading-relaxed">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
