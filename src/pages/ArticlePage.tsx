import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (!article) return;
    const defaultTitle = 'Imersa — 3D konfigurátory a prezentační weby pro realitní development';
    const defaultDesc = 'Imersa vytváří interaktivní 3D konfigurátory, fotorealistické vizualizace a prezentační weby pro developerské projekty.';

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const setCanonical = (url: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'canonical'); document.head.appendChild(el); }
      el.setAttribute('href', url);
    };

    const articleTitle = `${article.title} — Imersa`;
    const articleDesc = article.excerpt;
    const articleUrl = `https://imersa.cz/blog/${article.slug}`;

    document.title = articleTitle;
    setMeta('description', articleDesc);
    setMeta('og:title', articleTitle, true);
    setMeta('og:description', articleDesc, true);
    setMeta('og:url', articleUrl, true);
    setMeta('og:type', 'article', true);
    if (article.image) setMeta('og:image', `https://imersa.cz${article.image}`, true);
    setCanonical(articleUrl);

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'article-schema';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      image: article.image ? `https://imersa.cz${article.image}` : undefined,
      datePublished: article.date,
      author: { '@type': 'Organization', name: 'Imersa', url: 'https://imersa.cz' },
      publisher: { '@type': 'Organization', name: 'Imersa', logo: { '@type': 'ImageObject', url: 'https://imersa.cz/logo.svg' } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = defaultTitle;
      setMeta('description', defaultDesc);
      setMeta('og:title', defaultTitle, true);
      setMeta('og:description', defaultDesc, true);
      setMeta('og:url', 'https://imersa.cz/', true);
      setMeta('og:type', 'website', true);
      setMeta('og:image', 'https://imersa.cz/imersa.png', true);
      setCanonical('https://imersa.cz/');
      document.getElementById('article-schema')?.remove();
    };
  }, [article]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-anthracite/40 mb-4">Článek nenalezen.</p>
          <Link to="/blog" className="text-forest font-semibold hover:underline">← Zpět na magazín</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-forest"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      {/* Sticky dark header */}
      <header className="sticky top-0 z-40 bg-[#111612]/95 backdrop-blur-md px-6 py-4 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <img src="/logo.svg" alt="imersa" className="h-7 w-auto object-contain brightness-0 invert" />
          </Link>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[13px] font-semibold text-white/55 hover:border-white/40 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Všechny články
          </Link>
        </div>
      </header>

      {/* Hero — full-bleed image with title overlay */}
      <div className="relative h-[65vh] lg:h-[75vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070c07]/92 via-[#070c07]/30 to-[#070c07]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070c07]/20 to-transparent" />

        {/* Overlaid article header */}
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 lg:px-8 pb-9 lg:pb-12">
          <span className="inline-flex px-2.5 py-1 rounded-lg bg-forest/20 border border-forest/35 text-[11px] font-bold text-forest mb-4 w-fit">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-display font-extrabold text-white leading-snug mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-[12px] text-white/35">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><Clock size={12} />{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <main className="max-w-[780px] mx-auto px-6 py-12 lg:py-16">

        {/* Lead */}
        <p className="text-[17px] sm:text-[19px] text-anthracite/80 leading-[1.75] mb-12 font-medium border-l-[3px] border-forest pl-5">
          {article.content.lead}
        </p>

        {/* Sections */}
        <div className="divide-y divide-anthracite/[0.07]">
          {article.content.sections.map((section, index) => {
            const isConclusion = section.heading.toLowerCase().startsWith('závěr');

            if (isConclusion) {
              return (
                <div key={section.heading} className="pt-10 pb-2">
                  <div className="bg-[#2C3B2A] rounded-2xl px-7 py-8 sm:px-10 sm:py-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-forest/70 block mb-3">
                      {section.heading}
                    </span>
                    <p className="text-[15px] sm:text-[16px] text-white/80 leading-[1.9]">
                      {section.body}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={section.heading} className="py-10">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-[11px] font-bold text-forest/40 tabular-nums flex-none w-5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-[19px] sm:text-[21px] font-display font-bold text-anthracite leading-snug">
                    {section.heading}
                  </h2>
                </div>
                <p className="text-[15px] sm:text-[16px] text-anthracite/70 leading-[1.9]">
                  {section.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-anthracite/[0.08]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-anthracite/35 mb-4">Použité zdroje</p>
            <ul className="space-y-2">
              {article.sources.map((source, i) => (
                <li key={i} className="flex gap-3 text-[13px] text-anthracite/50 leading-relaxed">
                  <span className="flex-none text-forest/50 font-bold">{i + 1}.</span>
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-[#2C3B2A] rounded-2xl px-7 py-9 sm:px-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-forest/70 block mb-3">Imersa</span>
          <h3 className="text-[20px] sm:text-[23px] font-display font-extrabold text-white mb-3 leading-snug">
            Zajímá vás konfigurátor pro váš projekt?
          </h3>
          <p className="text-[13px] text-white/50 leading-relaxed mb-6 max-w-xs mx-auto">
            Konzultace je zdarma a nezávazná. Ozveme se do 24 hodin.
          </p>
          <a
            href="/#cenik"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#2C3B2A] text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-greige transition-all duration-200"
          >
            Spočítat projekt
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Related articles */}
        {(() => {
          const related = articles.filter(a => a.slug !== slug).slice(0, 2);
          if (related.length === 0) return null;
          return (
            <div className="mt-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-anthracite/35 mb-5">Další články</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map(a => (
                  <Link key={a.slug} to={`/blog/${a.slug}`}
                    className="group flex gap-4 p-4 rounded-xl bg-white border border-anthracite/[0.07] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="relative w-20 h-[52px] rounded-lg overflow-hidden flex-none">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-forest">{a.category}</span>
                      <h4 className="text-[13px] font-semibold text-anthracite leading-snug group-hover:text-forest transition-colors line-clamp-2">{a.title}</h4>
                    </div>
                    <ArrowRight size={14} className="flex-none text-anthracite/20 group-hover:text-forest self-center transition-colors ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-anthracite/[0.08] flex items-center justify-between">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-anthracite/20 text-[13px] font-semibold text-anthracite/55 hover:border-anthracite/50 hover:text-anthracite transition-all duration-200"
          >
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Všechny články
          </Link>
          <p className="text-[12px] text-anthracite/25">© {new Date().getFullYear()} Imersa</p>
        </div>
      </main>
    </div>
  );
}
