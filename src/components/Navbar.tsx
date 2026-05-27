import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CreditCard, Phone, FileText } from 'lucide-react';

const navLinks = [
  { label: 'Case study', href: '#presentation' },
  { label: 'Ceník', href: '#cenik' },
  { label: 'Blog', href: '#blog' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 lg:px-6"
        data-scrolled={scrolled}
      >
        <div className={`max-w-3xl mx-auto flex items-center justify-between px-5 lg:px-7 h-14 lg:h-16 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-greige/92 backdrop-blur-xl shadow-[0_4px_24px_rgba(45,45,45,0.10)]'
            : 'bg-[#171d15]/55 backdrop-blur-xl border border-white/[0.07]'
        }`}>
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="imersa"
              className="h-7 w-auto object-contain transition-all duration-500"
              style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-500 group ${
                    isActive
                      ? 'text-forest'
                      : scrolled
                        ? 'text-anthracite/60 hover:text-anthracite'
                        : 'text-white/55 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-forest rounded-full transition-all duration-300 ${isActive ? 'w-5' : 'w-0 group-hover:w-5'}`} />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className={`hidden lg:inline-flex items-center px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-500 ${
              scrolled
                ? 'bg-forest text-white hover:bg-[#4a6741] shadow-[0_4px_12px_rgba(74,103,65,0.3)]'
                : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
            }`}
          >
            Nezávazná poptávka
          </a>

          {/* Mobile Bottom Tab Bar (App-Style) */}
          {/* Neobsahuje Toggle Button nahoře. Místo toho je menu zafixováno dole. */}
        </div>
      </motion.nav>

      {/* Zafixovaný App-Style Bottom Bar pro telefony */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-cream/50 shadow-[0_-4px_24px_rgba(45,45,45,0.04)] px-4 py-2 pb-safe" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
        <div className="flex justify-around items-center h-14">
          
          {[
            { href: '#presentation', icon: Briefcase, label: 'Case' },
            { href: '#cenik', icon: CreditCard, label: 'Ceník' },
            { href: '#blog', icon: FileText, label: 'Blog' },
          ].map(({ href, icon: Icon, label }) => {
            const isActive = activeSection === href.replace('#', '');
            return (
              <a key={href} href={href} className="flex flex-col items-center justify-center w-16 gap-1">
                <Icon size={20} className={`transition-colors ${isActive ? 'text-forest' : 'text-anthracite/40'}`} />
                <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-forest' : 'text-anthracite/50'}`}>{label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-forest" />}
              </a>
            );
          })}

          {/* Telefon — pravý kraj */}
          <div className="relative -top-4 w-16 flex justify-center">
            <a href="tel:+420604445240" className="w-14 h-14 bg-forest rounded-full shadow-[0_8px_16px_rgba(74,103,65,0.3)] flex items-center justify-center text-white hover:bg-[#4a6741] transition-all duration-300 hover:-translate-y-1">
              <Phone size={22} />
            </a>
          </div>

        </div>
      </nav>
    </>
  );
}
