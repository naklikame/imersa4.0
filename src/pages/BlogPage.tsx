import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '../data/articles';

const FEATURED_COUNT = 3;
const INTERVAL_MS = 7000;

export default function BlogPage() {
  const featured = articles.slice(0, FEATURED_COUNT);
  const [active, setActive] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Reset interval whenever active changes (handles both auto-advance & dot click)
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % featured.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [active, featured.length]);

  const article = featured[active];

  return (
    <div className="min-h-screen">

      {/* ── Dark editorial section ── */}
      <div className="bg-[#111612] relative overflow-hidden">

        {/* Ambient blobs */}
        <div className="absolute -top-40 left-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2d5228 0%, transparent 65%)', opacity: 0.16, filter: 'blur(90px)' }} />
        <div className="absolute top-60 -right-60 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1a3a17 0%, transparent 65%)', opacity: 0.13, filter: 'blur(110px)' }} />

        {/* Grain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.028]" aria-hidden="true">
          <filter id="blog-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#blog-grain)" />
        </svg>

        {/* Header bar */}
        <header className="relative px-6 py-4 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/">
              <img src="/logo.svg" alt="imersa" className="h-7 w-auto object-contain brightness-0 invert" />
            </Link>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[13px] font-semibold text-white/55 hover:border-white/40 hover:text-white transition-all duration-200"
            >
              <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              Zpět na web
            </Link>
          </div>
        </header>

        {/* Centered hero heading */}
        <div className="relative max-w-2xl mx-auto px-6 pt-14 pb-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-forest block mb-4">
            Imersa Insights
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-display font-extrabold leading-[1.05] mb-5">
            <span className="text-white">Magazín pro</span>{' '}
            <span className="text-white/30">developery</span>
          </h1>
          <p className="text-white/35 text-[15px] leading-relaxed">
            Případové studie, trendy a návody pro developery,{' '}
            kteří chtějí prodávat chytřeji.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pb-16">
          {/* Mobile: flex-col (image on top, text panel below) | Desktop: block with aspect ratio + overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.55)] flex flex-col lg:block lg:aspect-[21/9]">

            {/* Image block */}
            <div className="relative flex-none aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:absolute lg:inset-0">
              {featured.map((a, i) => (
                <motion.div
                  key={a.slug}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070c07]/60 via-[#070c07]/15 to-transparent lg:from-[#070c07]/94 lg:via-[#070c07]/30" />
                </motion.div>
              ))}

              {/* Dot indicators */}
              <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Přejít na článek ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === active ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/55'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Text — dark panel on mobile, overlay on desktop */}
            <AnimatePresence mode="wait">
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-[#161d14] px-6 py-6 flex flex-col gap-3 lg:bg-transparent lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:px-12 lg:pb-10 lg:z-10"
              >
                <span className="inline-flex px-2.5 py-1 rounded-lg bg-forest/20 border border-forest/35 text-[11px] font-bold text-forest w-fit">
                  {article.category}
                </span>
                <h2 className="text-xl lg:text-[28px] font-display font-extrabold text-white leading-snug max-w-2xl">
                  {article.title}
                </h2>
                <p className="text-[13px] text-white/48 leading-relaxed max-w-xl line-clamp-2 hidden sm:block">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 text-[11px] text-white/35">
                    <span className="flex items-center gap-1.5"><Calendar size={11} />{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-white text-[13px] font-bold hover:bg-forest-dark transition-colors shadow-[0_4px_14px_rgba(74,103,65,0.45)]"
                  >
                    Číst článek
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="h-[2px] flex-none bg-white/[0.06] lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:z-20">
              <motion.div
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                className="h-full bg-forest/65"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Light section — all articles ── */}
      <main className="bg-[#f5f3ee] px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest mb-8">Všechny články</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-anthracite/[0.06] hover:shadow-xl hover:shadow-anthracite/[0.08] transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden flex-none">
                    <img src={a.image} alt={a.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite/25 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-bold text-forest">
                      {a.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-anthracite/40 mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={11} />{a.date}</span>
                      <span className="w-1 h-1 rounded-full bg-anthracite/20" />
                      <span className="flex items-center gap-1.5"><Clock size={11} />{a.readTime}</span>
                    </div>
                    <h3 className="text-[17px] font-display font-bold text-anthracite mb-2 leading-snug group-hover:text-forest transition-colors duration-300 flex-1">
                      {a.title}
                    </h3>
                    <p className="text-[13px] text-anthracite/55 leading-relaxed mb-5 line-clamp-2">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                      Číst dále
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

      <footer className="bg-[#f5f3ee] border-t border-anthracite/[0.06] py-8 text-center">
        <p className="text-[12px] text-anthracite/30">© {new Date().getFullYear()} Imersa · Všechna práva vyhrazena</p>
      </footer>
    </div>
  );
}
