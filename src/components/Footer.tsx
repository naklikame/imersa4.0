import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const PROJECT_TYPES = ['Komorní projekt', 'Rezidenční projekt', 'Developerský celek', 'Jiné'];

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400/80">{error}</p>}
    </div>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Zadejte jméno';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Zadejte platný e-mail';
    if (!form.message.trim()) e.message = 'Napište zprávu';
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitError(false);
    setLoading(true);

    const message = `Nová poptávka z webu imersa.cz

Kontaktní údaje:
• Jméno: ${form.name}
• Email: ${form.email}
• Typ projektu: ${form.project || 'neuvedeno'}

Zpráva:
${form.message}

---
Odesláno automaticky z imersa.cz`;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '57f29e4e-ca5d-4b42-8e81-87e0350b07cd',
          subject: `Nová poptávka od ${form.name} — imersa.cz`,
          name: form.name,
          email: form.email,
          replyto: form.email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Contact section */}
      <style>{`
        @keyframes contact-ambient-a {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(5%, 7%) scale(1.12); }
        }
        @keyframes contact-ambient-b {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(-4%, -5%) scale(1.18); }
        }
      `}</style>
      <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#111612]" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 55% at 20% 60%, rgba(74,103,65,0.38) 0%, transparent 70%)',
          animation: 'contact-ambient-a 22s ease-in-out infinite alternate',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 45% 40% at 78% 30%, rgba(74,103,65,0.16) 0%, transparent 65%)',
          animation: 'contact-ambient-b 30s ease-in-out infinite alternate',
        }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id="contact-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-grain)" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-0 items-start">

            {/* ── Left ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:pr-16 lg:border-r lg:border-white/[0.07]"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-forest mb-6 block">Kontakt</span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-extrabold text-white leading-[1.06] mb-6">
                Chcete takový<br />konfigurátor<br />
                <span className="text-white/40">i pro váš projekt?</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-12 max-w-sm">
                Napište nám — odpovídáme do 24 hodin.<br />Úvodní konzultace je zdarma a nezávazná.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Mail, text: 'info@imersa.cz', href: 'mailto:info@imersa.cz' },
                  { icon: Phone, text: '+420 604 445 240', href: 'tel:+420604445240' },
                ].map(({ icon: Icon, text, href }) => (
                  <a key={text} href={href} className="flex items-center gap-4 group">
                    <span className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.09] flex items-center justify-center group-hover:bg-white/[0.10] transition-colors">
                      <Icon size={15} className="text-white/50 group-hover:text-white/80 transition-colors" />
                    </span>
                    <span className="text-[15px] text-white/50 group-hover:text-white/90 transition-colors">{text}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right — form ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="lg:pl-16"
            >
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate className="space-y-5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field id="name" label="Jméno" error={errors.name}>
                        <input id="name" type="text" placeholder="Jan Novák" value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className={`bg-white/[0.06] text-white placeholder-white/20 text-[13px] px-4 py-3.5 rounded-xl border outline-none focus:border-white/25 focus:bg-white/[0.09] transition-all ${errors.name ? 'border-red-400/50' : 'border-white/[0.10]'}`} />
                      </Field>
                      <Field id="email" label="E-mail" error={errors.email}>
                        <input id="email" type="email" placeholder="jan@firma.cz" value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className={`bg-white/[0.06] text-white placeholder-white/20 text-[13px] px-4 py-3.5 rounded-xl border outline-none focus:border-white/25 focus:bg-white/[0.09] transition-all ${errors.email ? 'border-red-400/50' : 'border-white/[0.10]'}`} />
                      </Field>
                    </div>

                    <Field id="project" label="Typ projektu (nepovinné)">
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map(t => (
                          <button key={t} type="button" onClick={() => setForm(f => ({ ...f, project: f.project === t ? '' : t }))}
                            className={`px-3.5 py-2 rounded-xl text-[12px] font-medium border transition-all duration-200 ${form.project === t ? 'bg-forest text-white border-forest' : 'bg-white/[0.05] text-white/50 border-white/[0.10] hover:border-white/25 hover:text-white/80'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field id="message" label="Zpráva" error={errors.message}>
                      <textarea id="message" rows={5} placeholder="Popište váš projekt..." value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className={`bg-white/[0.06] text-white placeholder-white/20 text-[13px] px-4 py-3.5 rounded-xl border outline-none focus:border-white/25 focus:bg-white/[0.09] transition-all resize-none ${errors.message ? 'border-red-400/50' : 'border-white/[0.10]'}`} />
                    </Field>

                    {submitError && (
                      <p className="text-[12px] text-red-400/80 text-center">Nepodařilo se odeslat. Zkuste to prosím znovu.</p>
                    )}

                    <button type="submit" disabled={loading}
                      className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-forest text-white text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-[#4a6741] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(74,103,65,0.35)] disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? 'Odesílám…' : 'Odeslat poptávku'}
                      {!loading && <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col py-16 gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-forest/20 border border-forest/30 flex items-center justify-center">
                      <CheckCircle2 size={26} className="text-forest" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-extrabold text-white mb-2">Zpráva odeslána!</h3>
                      <p className="text-white/45 text-sm leading-relaxed">
                        Děkujeme, {form.name}. Ozveme se na <span className="text-white/70">{form.email}</span> do 24 hodin.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111612] pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Brand — full width */}
          <div className="flex flex-col items-center text-center mb-10">
            <a href="#" className="mb-5">
              <img
                src="/logo.svg"
                alt="imersa"
                className="h-9 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
            <p className="text-sm text-white/35 leading-relaxed max-w-sm">
              Revoluční 3D konfigurátory a prezentační weby<br className="hidden sm:block" /> pro realitní development.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/25 order-2 sm:order-1">© {new Date().getFullYear()} Imersa. Všechna práva vyhrazena.</p>

            <div className="flex items-center gap-5 order-1 sm:order-2">
              <a href="mailto:info@imersa.cz" className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/80 transition-colors">
                <Mail size={12} className="text-forest" />
                info@imersa.cz
              </a>
              <span className="text-white/15">|</span>
              <a href="tel:+420604445240" className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/80 transition-colors">
                <Phone size={12} className="text-forest" />
                +420 604 445 240
              </a>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-1.5 order-3">
              <Link to="/privacy" className="text-[11px] text-white/25 hover:text-greige/60 transition-colors">Ochrana osobních údajů</Link>
              <Link to="/cookies" className="text-[11px] text-white/25 hover:text-greige/60 transition-colors">Zásady cookies</Link>
              <Link to="/impressum" className="text-[11px] text-white/25 hover:text-greige/60 transition-colors">Impressum</Link>
              <button
                onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                className="text-[11px] text-white/25 hover:text-greige/60 transition-colors cursor-pointer"
              >
                Upravit nastavení cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
