import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const SERVICES = [
  {
    id: 'konfigurator',
    title: 'Konfigurátor',
    text: 'Plynulé 3D animace provedou zákazníky jednotlivými patry, kde si rovnou prohlédnou půdorysy, ceny a detaily konkrétních bytů. Zákazník získá dokonalý přehled o celém projektu z jediného místa.',
    tags: ['Patro po patru', 'Živá data', 'Půdorysy'],
    image: '/karta1.jpg',
  },
  {
    id: 'vizualizace',
    title: 'Vizualizace, foto & video',
    text: 'Zákazníci nakupují očima — proto vašemu projektu dáme vizuální podobu. Fotorealistické rendery, profesionální fotografie i prodejní videa nemovitostí. Interiéry, exteriéry i letecké záběry.',
    tags: ['Fotografie', 'Video', 'Rendering'],
    image: '/karta2.jpg',
  },
  {
    id: 'web',
    title: 'Webové stránky',
    text: 'Od jednoduché prezentace nemovitosti až po komplexní digitální řešení pro obří developerské projekty. Dodáme vám moderní zázemí, které se postará o plynulý prodej i ve chvíli, kdy vy nespíte.',
    tags: ['Rychlý prodej', 'Admin rozhraní'],
    image: '/karta3.jpg',
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-semibold tracking-wide backdrop-blur-sm border border-white/10">
      {label}
    </span>
  );
}

function Card({ service, className }: { service: typeof SERVICES[0]; className?: string }) {
  return (
    <div className={`relative rounded-3xl overflow-hidden bg-[#1a1e16] flex flex-col ${className}`}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-forest via-forest/60 to-transparent z-20 rounded-t-3xl" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${service.image}')` }}
      />
      {/* Gradient overlay — tmavá nahoře pro čitelnost textu, tmavá dole pro tagy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1209]/90 via-[#0e1209]/50 to-[#0e1209]/85" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-7">
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-display font-extrabold text-white mb-3 leading-snug">
            {service.title}
          </h3>
          <p className="text-white/60 text-[14px] leading-relaxed">
            {service.text}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {service.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const cardWidth = clientWidth * 0.82 + 16;
    setActiveCard(Math.min(Math.round(scrollLeft / cardWidth), SERVICES.length - 1));
  }

  return (
    <section ref={ref} className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── DESKTOP bento grid ── */}
        <div className="hidden lg:grid grid-cols-[2fr_1.1fr_1.4fr] gap-4 items-end">

          {/* Levý sloupec: heading nahoře + karta 1 dole */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="pr-8"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest mb-4 block">
                Naše řešení
              </span>
              <h2 className="text-4xl xl:text-5xl font-display font-extrabold text-anthracite leading-[1.08]">
                Jedno místo.<br />Kompletní digitální prezentace.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group"
            >
              <Card service={SERVICES[0]} className="h-[210px]" />
            </motion.div>
          </div>

          {/* Vizualizace — střední výška */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group"
          >
            <Card service={SERVICES[1]} className="h-[390px]" />
          </motion.div>

          {/* Webové stránky — nejvyšší, zůstává */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group"
          >
            <Card service={SERVICES[2]} className="h-[560px]" />
          </motion.div>

        </div>

        {/* ── MOBILE carousel ── */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest mb-3 block">
              Naše řešení
            </span>
            <h2 className="text-3xl font-display font-extrabold text-anthracite leading-tight">
              Jedno místo.<br />Kompletní digitální prezentace.
            </h2>
          </motion.div>

          {/* Swipeable track — bleed past padding */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 -mx-4 px-4 pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {SERVICES.map((s) => (
              <div key={s.id} className="flex-none w-[82vw] snap-start">
                <Card service={s} className="h-[300px]" />
              </div>
            ))}
            {/* Trailing spacer so last card snaps flush */}
            <div className="flex-none w-4" />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollRef.current?.scrollTo({ left: i * (scrollRef.current.clientWidth * 0.82 + 16), behavior: 'smooth' })}
                className={`rounded-full transition-all duration-300 ${i === activeCard ? 'w-5 h-1.5 bg-forest' : 'w-1.5 h-1.5 bg-anthracite/20'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
