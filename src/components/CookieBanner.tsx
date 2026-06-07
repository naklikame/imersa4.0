import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const KEY = 'imersa_cookie_consent';

function grantAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    try {
      if (JSON.parse(stored).analytics) grantAnalytics();
    } catch { /* ignore corrupted data */ }
  }, []);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener('openCookieSettings', handler);
    return () => window.removeEventListener('openCookieSettings', handler);
  }, []);

  function accept() {
    localStorage.setItem(KEY, JSON.stringify({ analytics: true, ts: Date.now() }));
    grantAnalytics();
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(KEY, JSON.stringify({ analytics: false, ts: Date.now() }));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-5"
          role="dialog"
          aria-label="Souhlas s cookies"
          aria-live="polite"
        >
          <div className="max-w-5xl mx-auto bg-[#1b2219] border border-white/[0.12] rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.50)] px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-white mb-1">Tento web používá cookies</p>
                <p className="text-[12px] text-white/45 leading-relaxed">
                  Analytické cookies (Google Analytics) nám pomáhají zlepšovat web. Nezbytné cookies jsou vždy aktivní.{' '}
                  <Link
                    to="/cookies"
                    className="text-forest underline underline-offset-2 hover:text-white/70 transition-colors"
                  >
                    Zásady cookies
                  </Link>
                </p>
              </div>
              <div className="flex gap-2.5 flex-shrink-0">
                <button
                  onClick={reject}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white/[0.08] text-white/60 text-[12px] font-semibold border border-white/10 hover:bg-white/15 hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  Odmítnout nepovinné
                </button>
                <button
                  onClick={accept}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-forest text-white text-[12px] font-bold hover:bg-[#5a7a50] transition-all duration-200 shadow-[0_4px_14px_rgba(74,103,65,0.45)] whitespace-nowrap"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
