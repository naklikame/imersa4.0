import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, X, Clock } from 'lucide-react';
import { articles, type Article } from '../data/articles';

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-anthracite/60" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[85dvh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative aspect-[16/7] flex-none overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 to-transparent" />
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-bold text-forest">
            {article.category}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/35 transition-colors"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6">
          <div className="flex items-center gap-3 text-[11px] text-anthracite/40 mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-anthracite/20" />
            <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-anthracite leading-snug mb-4">
            {article.title}
          </h2>

          {article.content && (
            <>
              <p className="text-[15px] text-anthracite/70 leading-relaxed mb-6 font-medium">
                {article.content.lead}
              </p>
              <div className="space-y-6">
                {article.content.sections.map((s) => (
                  <div key={s.heading}>
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-forest mb-2">{s.heading}</h3>
                    <p className="text-[14px] text-anthracite/65 leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 pt-6 border-t border-anthracite/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to={`/blog/${article.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-forest hover:text-forest-dark transition-colors"
            >
              Otevřít jako stránku
              <ArrowRight size={13} />
            </Link>
            <p className="text-[12px] text-anthracite/35">© {new Date().getFullYear()} Imersa</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  return (
    <section id="blog" className="py-16 lg:py-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10"
        >
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-sage mb-3">
              Imersa Insights
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-earth">
              Magazín pro developery
            </h2>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-forest text-forest text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-forest hover:text-white transition-all duration-300 mt-4 sm:mt-0"
          >
            Všechny články
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {articles.slice(0, 3).map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              onClick={() => setOpenArticle(article)}
              className="group rounded-2xl overflow-hidden bg-white/40 border border-cream/40 hover:bg-white hover:shadow-xl hover:shadow-earth/[0.06] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-bold text-forest">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-earth-lighter mb-2.5">
                  <span className="flex items-center gap-1.5"><Calendar size={11} />{article.date}</span>
                  {article.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-earth/20" />
                      <span className="flex items-center gap-1.5"><Clock size={11} />{article.readTime}</span>
                    </>
                  )}
                </div>
                <h3 className="text-base font-display font-bold text-earth mb-2.5 leading-snug group-hover:text-forest transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-earth-light leading-relaxed mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-dark transition-colors group/link">
                  Číst dále
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article modal */}
      <AnimatePresence>
        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
