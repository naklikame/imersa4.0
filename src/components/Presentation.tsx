import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Check, Maximize2 } from 'lucide-react';

const FEATURES = [
  { title: 'Živý konfigurátor', text: 'Klient si sám projde celou budovu patrem po patru — a rozhodne se dřív, než zavolá.' },
  { title: 'Filtr bytů a kalkulačka', text: 'Zákazník si vyfiltruje dostupné byty a rovnou spočítá měsíční splátku.' },
  { title: 'Vlastní admin', text: 'Profesionální nástroj pro evidenci klientů, smluv i faktur. Žádný chaos v tabulkách.' },
];

export default function Presentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isDemoActive, setIsDemoActive] = useState(false);

  return (
    <section
      id="presentation"
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/demofoto.png')", filter: 'blur(3px)' }}
      />
      <div className="absolute inset-0 bg-[#0e1410]/25" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-forest mb-3">
            Případová studie (Case Study)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight mb-4">
            Gran Via Residence
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Developer hledal inovativní způsob prezentace pro 42 prémiových bytů,
            který by vyčníval na přesyceném trhu novostaveb.
          </p>
        </motion.div>

        {/* ── Laptop mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15 }}
          className="flex justify-center mb-10 lg:mb-14"
        >
          {/* MacBook wrapper */}
          <div className="w-full max-w-[700px] select-none" style={{ filter: 'drop-shadow(0 48px 72px rgba(0,0,0,0.75))' }}>

            {/* ─ Lid ─ */}
            <div className="relative bg-gradient-to-b from-[#6e6e70] to-[#5c5c5e] rounded-t-[18px] p-[2.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
              {/* Inner bezel */}
              <div className="relative bg-[#1c1c1e] rounded-t-[16px] overflow-hidden">

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-gradient-to-b from-[#5c5c5e] to-[#4a4a4c] rounded-b-[14px] z-20 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.3)]">
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#2d2d30] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)] ring-[0.5px] ring-black/30">
                    <div className="absolute inset-[2px] rounded-full bg-[#1a1a1c]" />
                  </div>
                </div>

                {/* Bezel padding */}
                <div className="pt-[26px] pb-[10px] px-[10px]">
                  {/* Display */}
                  <div className="relative overflow-hidden rounded-[3px] bg-white" style={{ aspectRatio: '16/10' }}>
                    {!isDemoActive ? (
                      <div className="absolute inset-0 cursor-pointer group" onClick={() => setIsDemoActive(true)}>
                        <img
                          src="/demofoto.png"
                          alt="Gran Via Residence"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-400 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3">
                            <motion.div
                              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                              className="absolute w-16 h-16 rounded-full bg-white/30"
                            />
                            <div className="relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center">
                              <Maximize2 size={20} className="text-white" strokeWidth={1.5} />
                            </div>
                            <span className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-lg">
                              Spustit 3D prohlídku
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0">
                        <iframe
                          src="https://granviaresidence.cz"
                          title="Živý konfigurátor - Gran Via"
                          loading="lazy"
                          className="w-full h-full border-none"
                        />
                        <div className="absolute bottom-3 left-3 pointer-events-none z-10">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-[10px] font-bold uppercase tracking-wider text-anthracite">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                            Demo aktivní
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Hinge ─ */}
            <div className="h-[3px] bg-gradient-to-b from-[#3a3a3c] to-[#4e4e50] mx-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />

            {/* ─ Base ─ */}
            <div className="relative bg-gradient-to-b from-[#6e6e70] via-[#676769] to-[#5e5e60] rounded-b-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)]">
              <div className="pt-4 pb-3 px-8">
                {[
                  { cols: 14, h: 'h-[8px]' },
                  { cols: 13, h: 'h-[9px]' },
                  { cols: 12, h: 'h-[9px]' },
                  { cols: 11, h: 'h-[9px]' },
                ].map((row, i) => (
                  <div key={i} className="flex gap-[3px] justify-center mb-[3px]">
                    {Array.from({ length: row.cols }).map((_, j) => (
                      <div key={j} className={`flex-1 ${row.h} rounded-[2px] bg-[#595959] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_1px_rgba(0,0,0,0.3)]`} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-center pb-4">
                <div className="w-[38%] h-[38px] rounded-[8px] bg-[#5a5a5c] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.3)]" />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mx-4" />
              <div className="h-[6px] rounded-b-[18px]" />
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
        </motion.div>

        {/* ── Feature cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-3 mb-8"
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-[#171d15]/55 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-5 flex gap-3"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-forest/25 flex items-center justify-center mt-0.5">
                <Check size={10} strokeWidth={3} className="text-forest" />
              </div>
              <div>
                <h4 className="text-[12px] font-bold text-white mb-1 uppercase tracking-tight">{f.title}</h4>
                <p className="text-[12px] text-white/50 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex justify-center"
        >
          <a
            href="https://granviaresidence.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-forest text-white text-[12px] font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_8px_24px_rgba(74,103,65,0.35)] hover:bg-[#344C3D] hover:-translate-y-0.5 transition-all duration-300"
          >
            Zobrazit projekt
            <ExternalLink size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
