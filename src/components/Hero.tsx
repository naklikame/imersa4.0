import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100svh] flex flex-col justify-center pt-20 pb-16">
      <style>{`
        @keyframes ambient-a {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(8%, 6%) scale(1.12); }
        }
        @keyframes ambient-b {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(-6%, -4%) scale(1.18); }
        }
      `}</style>

      {/* Dark base */}
      <div className="absolute inset-0 bg-[#111612]" />

      {/* Ambient light — two slow radial gradients that breathe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 25% 55%, rgba(74,103,65,0.38) 0%, transparent 70%)',
          animation: 'ambient-a 22s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 45% 40% at 72% 40%, rgba(74,103,65,0.16) 0%, transparent 65%)',
          animation: 'ambient-b 30s ease-in-out infinite alternate',
        }}
      />

      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex gap-8 lg:gap-14 items-stretch">

          {/* Vertikální štítek — skrytý na mobilu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex flex-col items-center shrink-0 w-4"
          >
            <div className="w-px flex-1 bg-white/12" />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/22 my-4 select-none"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              3D Konfigurace · Real Estate
            </span>
            <div className="w-px flex-1 bg-white/12" />
          </motion.div>

          {/* Hlavní obsah */}
          <div className="flex-1 flex flex-col justify-between">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,5.8vw,7rem)] font-display font-extrabold text-white/90 leading-[1.03] tracking-tight mb-8"
            >
              <span className="block">Vaše projekty</span>
              <span className="block">už nebudou</span>
              <span className="block">
                <span className="text-[#7aab6e] font-serif italic">jen </span>statické obrázky.
              </span>
            </motion.h1>

            {/* Dělicí čára */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-px bg-white/10 mb-8 origin-left"
            />

            {/* Perex vlevo, CTA vpravo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
            >
              <p className="text-sm sm:text-base text-white/38 leading-relaxed max-w-sm">
                Interaktivní 3D konfigurátory pro developerské projekty. Kupující si projde váš byt dřív, než existuje.
              </p>
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#111612] text-[12px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Nezávazná poptávka
                </a>
                <a
                  href="https://granviaresidence.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/55 text-[12px] font-bold uppercase tracking-[0.15em] rounded-full hover:border-white/30 hover:text-white/80 transition-all duration-300"
                >
                  Živá ukázka
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
