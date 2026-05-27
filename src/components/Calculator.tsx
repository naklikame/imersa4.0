import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Info, ArrowUpRight, Check, Globe, Building2, Settings, HeadphonesIcon, Mail, CheckCircle2, FileDown, X, Phone, User, Megaphone } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: 'web', title: 'Web', icon: Globe, type: 'radio',
    items: [
      { id: 'web_s', label: 'S konfigurátorem', price: 50000, info: 'Interaktivní 3D konfigurátor bytů — výběr dispozice, materiálů a vybavení v reálném čase přímo na webu.' },
      { id: 'web_bez', label: 'Bez konfigurátoru', price: 20000, info: 'Prezentační microsite projektu s vizuály, popisem a kontaktním formulářem.' },
    ],
  },
  {
    id: 'nemovitosti', title: 'Nemovitosti', icon: Building2, type: 'checkbox',
    items: [
      { id: 'int_ext', label: 'Interiér + exteriér', price: 15000, info: 'Fotorealistické rendery, zasazení do reálného prostředí. Nemáte záběry z dronu? Doporučujeme přidat službu „Záběry z dronu".' },
      { id: 'matterport', label: 'Matterport', price: 5000, info: 'Máte již hotovou typovou jednotku, kterou chcete prezentovat? 360° prohlídka reálného prostoru.' },
      { id: 'virtual', label: 'Virtuální prohlídka', price: 3000, info: 'Potřebujete 360° virtuální prohlídku a statické vizualizace Vám nestačí? Uděláme kompletní virtuální prohlídku vizualizací.' },
      { id: 'int_ext_anim', label: 'Interiér/Exteriér animace', price: 4000, info: 'Ukažte přechody mezi statickými vizualizacemi — vylepší vizuální vzhled prezentace a doplní klasické vizualizace.' },
      { id: 'pudorysy', label: '2D + 3D půdorysy', price: 1200, info: 'Přehledné půdorysy v klasickém 2D i moderním 3D provedení pro každou bytovou jednotku.' },
      { id: 'dron', label: 'Záběry z dronu', price: 3000, info: 'Profesionální záběry nemovitosti a okolí. Fotky slouží také k zasazení do vizualizací.' },
    ],
  },
  {
    id: 'moznosti', title: 'Možnosti webu', icon: Settings, type: 'checkbox',
    items: [
      { id: 'cms', label: 'CMS Systém', price: 5000, info: 'Redakční systém pro snadnou správu obsahu webu bez potřeby programátora — texty, fotky, ceny.' },
      { id: 'vyhledavani', label: 'Vyhledávání jednotky', price: 8000, info: 'Filtrování a vyhledávání dostupných bytových jednotek dle dispozice, patra nebo ceny.' },
      { id: 'kalkulator', label: 'Live kalkulačka', price: 6000, info: 'Interaktivní kalkulačka pro zákazníky — spočítají si orientační měsíční splátku přímo na webu.' },
      { id: 'mobil', label: 'Mobilní optimalizace', price: 4000, info: 'Plná optimalizace pro mobilní zařízení a tablety, včetně dotykového ovládání 3D konfigurátoru.' },
    ],
  },
  {
    id: 'marketing', title: 'Marketing', icon: Megaphone, type: 'radio',
    items: [
      { id: 'marketing_ano', label: 'Chci konzultaci', price: 0, info: 'Postaráme se o propagaci vašeho projektu! Pomůžeme s: balíčkem videí na sociální sítě s tvorbou scénářů, tvorbou reklamního videa, spuštěním propagace na YouTube, Google Ads, Sklik, Instagram, Facebook, TikTok a správou sociálních sítí po dobu aktuálnosti projektu.' },
      { id: 'marketing_ne', label: 'Nechci konzultaci', price: 0, info: 'Máme na prezentaci externí agenturu.' },
    ],
  },
  {
    id: 'podpora', title: 'Podpora', icon: HeadphonesIcon, type: 'radio',
    items: [
      { id: 'podpora_zadna', label: 'Žádná', price: 0, info: 'Bez technické podpory po spuštění. Vhodné pokud máte vlastní IT tým.' },
      { id: 'podpora_standard', label: 'Standardní', price: 3000, info: 'Podpora v pracovní době (Po–Pá 9–17), odezva do 24 hodin. Měsíční paušál.' },
      { id: 'podpora_247', label: '24/7', price: 8000, info: 'Nonstop technická podpora, odezva do 2 hodin. Vhodné pro projekty s vysokou návštěvností. Měsíční paušál.' },
    ],
  },
];

/* ─── Typ projektu ──────────────────────────────────────────────────── */

type ProjectTypeId = 'small' | 'medium' | 'large';

const SmallHouseSvg = () => (
  <svg viewBox="0 0 64 56" fill="none" className="w-full h-full">
    <path d="M8 30 L32 8 L56 30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
    <rect x="13" y="30" width="38" height="22" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2"/>
    <rect x="28" y="40" width="10" height="12" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="16" y="35" width="8" height="7" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="40" y="35" width="8" height="7" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const MediumBuildingSvg = () => (
  <svg viewBox="0 0 64 60" fill="none" className="w-full h-full">
    <rect x="10" y="16" width="44" height="40" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="8" width="24" height="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
    {[14, 27, 40].map(x => [20, 34].map(y => (
      <rect key={`${x}-${y}`} x={x} y={y} width="8" height="7" rx="1" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5"/>
    )))}
    <rect x="26" y="44" width="12" height="12" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const LargeTowerSvg = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <rect x="14" y="6" width="36" height="54" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2"/>
    <rect x="6" y="28" width="12" height="32" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="46" y="28" width="12" height="32" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.5"/>
    {[10, 20, 30, 40].map(y => [18, 27, 36].map(x => (
      <rect key={`${x}-${y}`} x={x} y={y} width="6" height="5" rx="0.5" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1"/>
    )))}
    <rect x="24" y="50" width="16" height="10" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PROJECT_TYPES: { id: ProjectTypeId; label: string; description: string; multiplier: number; Svg: React.FC }[] = [
  { id: 'small',  label: 'Malý',    description: 'Rodinné domy, vily',  multiplier: 1,   Svg: SmallHouseSvg },
  { id: 'medium', label: 'Střední', description: '10 – 50 jednotek',    multiplier: 1.5, Svg: MediumBuildingSvg },
  { id: 'large',  label: 'Velký',   description: '50+ jednotek',        multiplier: 2.5, Svg: LargeTowerSvg },
];

/* ─── Tooltip ───────────────────────────────────────────────────────── */

function Tooltip({ text, selected = false }: { text: string; selected?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
        className={`transition-colors duration-200 focus:outline-none ${selected ? 'text-white/70 hover:text-white' : 'text-anthracite/30 hover:text-forest'}`}
        aria-label="Více informací" type="button"
      >
        <Info size={13} strokeWidth={2} />
      </button>
      {open && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 z-50 w-56 bg-anthracite text-greige text-[12px] leading-relaxed rounded-xl px-3 py-2.5 shadow-xl pointer-events-none">
          {text}
          <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-anthracite" />
        </span>
      )}
    </span>
  );
}

/* ─── Poptávka modal ────────────────────────────────────────────────── */

function PoptavkaModal({ total, lines, onClose }: {
  total: number;
  lines: { label: string; price: number }[];
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Zadejte platný e-mail';
    if (!form.phone.trim()) e.phone = 'Zadejte telefonní číslo';
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setSubmitError(false);

    const kalkulaceText = lines.length > 0
      ? lines.map(l => `• ${l.label}: od ${l.price.toLocaleString('cs-CZ')} Kč`).join('\n') +
        `\n\nCelková odhadovaná investice: od ${total.toLocaleString('cs-CZ')} Kč`
      : 'Žádné položky nebyly vybrány.';

    const message = `Nová poptávka z webu imersa.cz

Kontaktní údaje:
• Jméno: ${form.name || 'neuvedeno'}
• Email: ${form.email}
• Telefon: ${form.phone}

Kalkulace:
${kalkulaceText}

---
Odesláno automaticky z imersa.cz`;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '57f29e4e-ca5d-4b42-8e81-87e0350b07cd',
          subject: `Nová poptávka${form.name ? ` od ${form.name}` : ''} — imersa.cz`,
          name: form.name || 'Zákazník',
          email: form.email,
          phone: form.phone,
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

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(12px)', background: 'rgba(45,45,45,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-[#2C3B2A] rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200">
          <X size={15} />
        </button>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Nezávazná poptávka</p>
              <h3 className="text-xl font-display font-extrabold text-white mb-1">Odeslat poptávku</h3>

              {/* Shrnutí kalkulace */}
              {lines.length > 0 && (
                <div className="mt-4 mb-6 p-4 rounded-2xl bg-white/8 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35 mb-3">Vaše kalkulace</p>
                  <div className="space-y-1.5 mb-3">
                    {lines.map(l => (
                      <div key={l.label} className="flex justify-between gap-2">
                        <span className="text-[12px] text-white/55">{l.label}</span>
                        <span className="text-[12px] font-semibold text-white/70 whitespace-nowrap">{l.price.toLocaleString('cs-CZ')} Kč</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2.5 border-t border-white/10">
                    <span className="text-[12px] font-bold text-white/70">Celkem</span>
                    <span className="text-[14px] font-extrabold text-white">{total.toLocaleString('cs-CZ')} Kč</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Jméno — volitelné */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                    <User size={11} />Jméno <span className="text-white/25 normal-case font-normal">(nepovinné)</span>
                  </label>
                  <input type="text" placeholder="Jan Novák" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="bg-white/10 text-white placeholder-white/25 text-[13px] px-4 py-3 rounded-xl border border-white/15 outline-none focus:border-white/35 transition-colors" />
                </div>

                {/* Email — povinné */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                    <Mail size={11} />E-mail *
                  </label>
                  <input type="email" placeholder="jan@firma.cz" value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(ev => ({ ...ev, email: '' })); }}
                    className={`bg-white/10 text-white placeholder-white/25 text-[13px] px-4 py-3 rounded-xl border outline-none focus:border-white/35 transition-colors ${errors.email ? 'border-red-400/70' : 'border-white/15'}`} />
                  {errors.email && <p className="text-[11px] text-red-400/80">{errors.email}</p>}
                </div>

                {/* Telefon — povinné */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                    <Phone size={11} />Telefonní číslo *
                  </label>
                  <input type="tel" placeholder="+420 604 445 240" value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(ev => ({ ...ev, phone: '' })); }}
                    className={`bg-white/10 text-white placeholder-white/25 text-[13px] px-4 py-3 rounded-xl border outline-none focus:border-white/35 transition-colors ${errors.phone ? 'border-red-400/70' : 'border-white/15'}`} />
                  {errors.phone && <p className="text-[11px] text-red-400/80">{errors.phone}</p>}
                </div>

                {submitError && (
                  <p className="text-[12px] text-red-400/80 text-center">Nepodařilo se odeslat. Zkuste to znovu.</p>
                )}
                <button type="submit" disabled={loading}
                  className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white text-[#2C3B2A] text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-greige transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Odesílám…' : 'Odeslat poptávku'}
                  {!loading && <ArrowUpRight size={14} />}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center py-6 gap-5">
              {/* Animovaná fajfka */}
              <div className="relative w-20 h-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center"
                >
                  <svg viewBox="0 0 52 52" className="w-10 h-10">
                    <motion.path
                      d="M14 27 L22 35 L38 18"
                      fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
                {/* Pulsující kruh */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3, repeat: 2 }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
              </div>

              <div>
                <h3 className="text-2xl font-display font-extrabold text-white mb-2">Odesláno!</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {form.name ? `Děkujeme, ${form.name}.` : 'Děkujeme.'} Ozveme se
                  {form.phone ? ` na číslo ${form.phone}` : ''} do 24 hodin.
                </p>
              </div>

              <button onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[12px] font-bold uppercase tracking-wider transition-all duration-200">
                Zavřít
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function formatPrice(n: number) {
  return 'od ' + n.toLocaleString('cs-CZ') + ' Kč';
}

/* ─── Animated counter hook ─────────────────────────────────────────── */

function useCountUp(target: number, duration = 500) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const raf = useRef<number>(0);

  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (from === target) return;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return display;
}

/* ─── Main ──────────────────────────────────────────────────────────── */

export default function Calculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [radioValues, setRadioValues] = useState<Record<string, string>>({ web: '', podpora: 'podpora_zadna' });
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPoptavka, setShowPoptavka] = useState(false);
  const [projectType, setProjectType] = useState<ProjectTypeId | null>(null);

  const multiplier = PROJECT_TYPES.find(p => p.id === projectType)?.multiplier ?? 1;
  const adjustedPrice = (base: number) =>
    base === 0 ? 0 : Math.round((base * multiplier) / 500) * 500;

  function toggleCheck(id: string) {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function setRadio(sectionId: string, itemId: string) {
    setRadioValues(prev => ({ ...prev, [sectionId]: prev[sectionId] === itemId ? '' : itemId }));
  }

  function sectionCount(section: typeof SECTIONS[0]) {
    if (section.type === 'radio') return radioValues[section.id] ? 1 : 0;
    return section.items.filter(i => checked.has(i.id)).length;
  }

  const totalRaw = SECTIONS.reduce((sum, section) => {
    if (section.type === 'radio') {
      const sel = section.items.find(i => i.id === radioValues[section.id]);
      return sum + adjustedPrice(sel?.price ?? 0);
    }
    return sum + section.items.filter(i => checked.has(i.id)).reduce((s, i) => s + adjustedPrice(i.price), 0);
  }, 0);

  const total = useCountUp(totalRaw);

  const lines = SECTIONS.flatMap(section => {
    if (section.type === 'radio') {
      const sel = section.items.find(i => i.id === radioValues[section.id]);
      if (sel && sel.price > 0) return [{ label: sel.label, price: adjustedPrice(sel.price) }];
      return [];
    }
    return section.items.filter(i => checked.has(i.id)).map(i => ({ label: i.label, price: adjustedPrice(i.price) }));
  });

  function generatePDF() {
    const date = new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });

    const selectedItems = SECTIONS.flatMap(section => {
      if (section.type === 'radio') {
        const sel = section.items.find(i => i.id === radioValues[section.id]);
        return sel ? [{ section: section.title, ...sel }] : [];
      }
      return section.items.filter(i => checked.has(i.id)).map(i => ({ section: section.title, ...i }));
    });

    const rows = selectedItems.map(item => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;">
          <div style="font-weight:600;color:#2D2D2D;margin-bottom:4px;">${item.label}</div>
          <div style="font-size:12px;color:#888;line-height:1.5;">${item.info}</div>
          <div style="font-size:11px;color:#4A6741;font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">${item.section}</div>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap;font-weight:700;color:#2D2D2D;vertical-align:top;">
          ${item.price > 0 ? item.price.toLocaleString('cs-CZ') + ' Kč' : '—'}
        </td>
      </tr>`).join('');

    const html = `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<title>Imersa — Cenová kalkulace</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; color: #2D2D2D; background: #fff; }
  @page { margin: 20mm 18mm; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }

  .page { max-width: 760px; margin: 0 auto; padding: 40px 0; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 2px solid #2C3B2A; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-box { width: 36px; height: 36px; background: #4A6741; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #E5E2DB; font-weight: 700; font-size: 16px; }
  .logo-name { font-size: 20px; font-weight: 700; color: #2D2D2D; letter-spacing: -.3px; }
  .meta { text-align: right; font-size: 12px; color: #888; line-height: 1.8; }

  .title-block { margin-bottom: 36px; }
  .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .15em; color: #4A6741; margin-bottom: 8px; }
  h1 { font-size: 28px; font-weight: 800; color: #2D2D2D; letter-spacing: -.5px; margin-bottom: 10px; }
  .subtitle { font-size: 14px; color: #666; line-height: 1.6; max-width: 540px; }

  table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
  thead th { padding: 10px 16px; background: #F5F4F1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #888; text-align: left; }
  thead th:last-child { text-align: right; }

  .total-row { background: #2C3B2A; }
  .total-row td { padding: 16px; color: #fff; font-weight: 700; font-size: 15px; }
  .total-row td:last-child { text-align: right; font-size: 22px; }

  .vat-note { font-size: 11px; color: #aaa; padding: 10px 16px; }

  .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
  .footer-note { font-size: 12px; color: #888; line-height: 1.7; }
  .footer-contact { text-align: right; font-size: 12px; color: #888; line-height: 1.8; }
  .footer-contact a { color: #4A6741; text-decoration: none; font-weight: 600; }

  .empty { padding: 40px; text-align: center; color: #bbb; font-size: 14px; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="logo">
      <div class="logo-box">I</div>
      <span class="logo-name">imersa</span>
    </div>
    <div class="meta">
      <div><strong>Cenová kalkulace</strong></div>
      <div>${date}</div>
      <div>Orientační nabídka</div>
    </div>
  </div>

  <div class="title-block">
    <div class="label">Váš výběr služeb</div>
    <h1>Sestavená kalkulace projektu</h1>
    <p class="subtitle">Níže naleznete přehled zvolených služeb včetně jejich popisu a orientační ceny. Finální cenu upřesníme po úvodní konzultaci zdarma.</p>
  </div>

  ${selectedItems.length === 0
    ? `<div class="empty">Nebyly vybrány žádné služby.</div>`
    : `<table>
        <thead><tr><th>Služba</th><th>Cena (bez DPH)</th></tr></thead>
        <tbody>
          ${rows}
          <tr class="total-row">
            <td>Celková odhadovaná investice</td>
            <td>${totalRaw.toLocaleString('cs-CZ')} Kč</td>
          </tr>
        </tbody>
      </table>
      <div class="vat-note">* Ceny jsou orientační a nezahrnují DPH. Finální nabídku připravíme po konzultaci.</div>`
  }

  <div class="footer">
    <div class="footer-note">
      <strong style="color:#2D2D2D;">imersa</strong><br>
      Revoluční 3D konfigurátory pro realitní development.<br>
      Tato kalkulace je nezávazná a orientační.
    </div>
    <div class="footer-contact">
      <a href="mailto:info@imersa.cz">info@imersa.cz</a><br>
      +420 604 445 240<br>
      imersa.cz
    </div>
  </div>

</div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
  }

  function handleSendEmail() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError(true); return; }
    setEmailError(false);
    setEmailSent(true);
  }

  /* ── Price panel content (shared between inline & fixed) ── */
  const PricePanel = () => (
    <div className="bg-[#2C3B2A] rounded-2xl p-7 shadow-2xl shadow-anthracite/20">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Odhadovaná investice</p>

      <motion.div initial={{ opacity: 0.6, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="mb-6 pb-6 border-b border-white/10">
        {!projectType
          ? <p className="text-2xl font-display font-extrabold text-white/30 leading-snug">Nejprve vyberte<br/>typ projektu</p>
          : total === 0
            ? <p className="text-3xl font-display font-extrabold text-white/30 leading-none">Vyberte služby</p>
            : <>
                <p className="text-[42px] font-display font-extrabold text-white leading-none tracking-tight">{formatPrice(total)}</p>
                <p className="text-[12px] text-white/35 mt-2">orientační cena bez DPH</p>
              </>
        }
      </motion.div>

      {lines.length > 0 && (
        <div className="space-y-2.5 mb-6 pb-6 border-b border-white/10">
          {lines.map(line => (
            <div key={line.label} className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-white/55">{line.label}</span>
              <span className="text-[12px] font-bold text-white/70 whitespace-nowrap">{formatPrice(line.price)}</span>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowPoptavka(true)}
        className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white text-[#2C3B2A] text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-greige transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-black/20 mb-3">
        <span>Odeslat poptávku</span>
        <span className="w-6 h-6 rounded-full bg-[#2C3B2A]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight size={12} />
        </span>
      </button>

      <button
        type="button"
        onClick={generatePDF}
        disabled={totalRaw === 0}
        className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 text-white text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 mb-4"
      >
        <FileDown size={14} className="opacity-70" />
        Zobrazit PDF
      </button>

      <div className="border-t border-white/10 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3 flex items-center gap-2">
          <Mail size={11} /> Poslat kalkulaci na mail
        </p>
        <AnimatePresence mode="wait">
          {!emailSent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex gap-2">
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(false); }}
                  placeholder="vas@email.cz"
                  className={`flex-1 min-w-0 bg-white/10 text-white placeholder-white/25 text-[12px] px-3.5 py-2.5 rounded-xl border outline-none focus:border-white/30 transition-colors duration-200 ${emailError ? 'border-red-400/60' : 'border-white/15'}`} />
                <button onClick={handleSendEmail} disabled={total === 0} type="button"
                  className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200">
                  Poslat
                </button>
              </div>
              {emailError && <p className="text-[11px] text-red-400/80 mt-1.5 ml-1">Zadejte platný e-mail.</p>}
              {total === 0 && <p className="text-[11px] text-white/25 mt-1.5 ml-1">Nejprve vyberte alespoň jednu službu.</p>}
            </motion.div>
          ) : (
            <motion.div key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10">
              <CheckCircle2 size={16} className="text-white/70 flex-shrink-0" />
              <p className="text-[12px] text-white/70">Kalkulace odeslána na <span className="text-white font-semibold">{email}</span></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-white/20 text-center mt-4 leading-relaxed">
        Finální cenu upřesníme po konzultaci.<br />Odpovídáme do 24 hodin.
      </p>
    </div>
  );

  return (
    <section id="cenik" ref={ref} className="py-16 lg:py-28 relative overflow-hidden">
      <style>{`
        @keyframes calc-ambient-a {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(6%, 8%) scale(1.15); }
        }
        @keyframes calc-ambient-b {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(-5%, -6%) scale(1.2); }
        }
        @keyframes calc-ambient-c {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(4%, -5%) scale(1.1); }
        }
      `}</style>

      {/* Warm greige base */}
      <div className="absolute inset-0 bg-[#E0DDD3]" />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 10% 55%, rgba(74,103,65,0.18) 0%, transparent 70%)',
        animation: 'calc-ambient-a 20s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 45% 55% at 88% 25%, rgba(74,103,65,0.14) 0%, transparent 65%)',
        animation: 'calc-ambient-b 26s ease-in-out infinite alternate',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 40% at 50% 85%, rgba(74,103,65,0.10) 0%, transparent 65%)',
        animation: 'calc-ambient-c 32s ease-in-out infinite alternate',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-forest mb-4">Orientační kalkulace</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-anthracite leading-[1.1] mb-4">
            Sestavte si projekt na míru
          </h2>
          <p className="text-anthracite/55 lg:text-lg leading-relaxed">
            Vyberte si kombinaci služeb a získejte okamžitý orientační odhad investice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

          {/* Left — Options */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5">

            {/* Typ projektu */}
            <div className="bg-white/60 rounded-2xl p-6 lg:p-7 border border-anthracite/[0.06] shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-7 rounded-lg bg-forest/10 flex items-center justify-center">
                  <Building2 size={14} className="text-forest" strokeWidth={2} />
                </span>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-anthracite/60">Typ projektu</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {PROJECT_TYPES.map((pt) => {
                  const isSelected = projectType === pt.id;
                  return (
                    <button key={pt.id} type="button" onClick={() => setProjectType(isSelected ? null : pt.id)}
                      className={`flex flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-3 sm:py-4 rounded-xl border transition-all duration-200 ${isSelected ? 'bg-forest border-forest shadow-md shadow-forest/15' : 'bg-white border-anthracite/10 hover:border-forest/40 hover:shadow-sm'}`}>
                      <div className={`w-10 h-8 sm:w-14 sm:h-12 ${isSelected ? 'text-white' : 'text-forest'}`}><pt.Svg /></div>
                      <span className={`text-[12px] sm:text-[13px] font-semibold ${isSelected ? 'text-white' : 'text-anthracite'}`}>{pt.label}</span>
                      <span className={`hidden sm:block text-[11px] text-center leading-tight ${isSelected ? 'text-white/65' : 'text-anthracite/40'}`}>{pt.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const count = sectionCount(section);

              const itemsGrid = (
                <div className="grid sm:grid-cols-2 gap-3">
                  {section.items.map((item) => {
                    const isSelected = section.type === 'radio' ? radioValues[section.id] === item.id : checked.has(item.id);
                    return (
                      <button key={item.id} type="button"
                        onClick={() => section.type === 'radio' ? setRadio(section.id, item.id) : toggleCheck(item.id)}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${isSelected
                          ? 'bg-gradient-to-br from-[#4d6e43] via-[#3d5a35] to-[#2c4626] border-[#4d6e43]/60 shadow-[0_6px_20px_rgba(74,103,65,0.28),inset_0_1px_0_rgba(255,255,255,0.10)] -translate-y-0.5'
                          : 'bg-white border-anthracite/10 hover:border-forest/40 hover:shadow-sm'}`}>
                        {/* Left accent bar */}
                        {isSelected && <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-white/40 to-white/10" />}
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? 'bg-white/15 border-white/50' : 'border-anthracite/20 group-hover:border-forest/50'}`}>
                          {isSelected && <Check size={10} strokeWidth={3} className="text-white" />}
                        </span>
                        <span className={`flex-1 text-[13px] font-semibold leading-snug ${isSelected ? 'text-white' : 'text-anthracite'}`}>{item.label}</span>
                        {item.price > 0 && projectType && (
                          <span className={`text-[11px] font-bold whitespace-nowrap ${isSelected ? 'text-white/65' : 'text-anthracite/35'}`}>{formatPrice(adjustedPrice(item.price))}</span>
                        )}
                        <span className="flex-shrink-0 z-10" onClick={e => e.stopPropagation()}>
                          <Tooltip text={item.info} selected={isSelected} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              );

              return (
                <div key={section.id} className="bg-white/60 rounded-2xl p-6 lg:p-7 border border-anthracite/[0.06] shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-forest/10 flex items-center justify-center">
                        <Icon size={14} className="text-forest" strokeWidth={2} />
                      </span>
                      <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-anthracite/60">{section.title}</h3>
                    </div>
                    <AnimatePresence>
                      {count > 0 && (
                        <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-bold">
                          <Check size={10} strokeWidth={3} />
                          {count}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {itemsGrid}
                </div>
              );
            })}
          </motion.div>

          {/* Right — Price panel sticky (desktop only) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden lg:block sticky top-24 self-start">
            <PricePanel />
          </motion.div>

        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <AnimatePresence>
        {isSectionVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed left-4 right-4 z-[55]"
            style={{ bottom: 'calc(4.5rem + env(safe-area-inset-bottom) + 8px)' }}
          >
            <div className="bg-[#2C3B2A] rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 shadow-2xl shadow-anthracite/40">
              <div className="min-w-0">
                {!projectType ? (
                  <p className="text-white/45 text-[13px] font-semibold truncate">Vyberte typ projektu</p>
                ) : total === 0 ? (
                  <p className="text-white/45 text-[13px] font-semibold truncate">Vyberte služby</p>
                ) : (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Investice</p>
                    <p className="text-[18px] font-display font-extrabold text-white leading-none">{formatPrice(total)}</p>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPoptavka(true)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#2C3B2A] text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-200 active:scale-95"
              >
                Poptávka
                <ArrowUpRight size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPoptavka && (
          <PoptavkaModal
            total={totalRaw}
            lines={lines}
            onClose={() => setShowPoptavka(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
