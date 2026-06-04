import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info, ArrowUpRight, Check, Globe, Building2, Settings, HeadphonesIcon, FileDown, X, Phone, User, Megaphone, Mail } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────── */

type ProjectTypeId = 'small' | 'medium' | 'large';

interface Item {
  id: string;
  label: string;
  prices: [number, number, number]; // [small, medium, large]
  info: string;
  freeWithKonfigurator?: boolean;
}

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  type: 'radio' | 'checkbox';
  items: Item[];
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const SECTIONS: Section[] = [
  {
    id: 'web', title: 'Web', icon: Globe, type: 'radio',
    items: [
      { id: 'web_s',   label: 'S konfigurátorem',  prices: [25000, 35000, 55000], info: 'Interaktivní 3D konfigurátor bytů — výběr dispozice, materiálů a vybavení v reálném čase přímo na webu.' },
      { id: 'web_bez', label: 'Bez konfigurátoru', prices: [8000, 12000, 17000],  info: 'Prezentační microsite projektu s vizuály, popisem a kontaktním formulářem.' },
    ],
  },
  {
    id: 'nemovitosti', title: 'Nemovitosti', icon: Building2, type: 'checkbox',
    items: [
      { id: 'interier',    label: 'Interiér',           prices: [4000, 17000, 38000], info: 'Fotorealistické interiérové rendery bytových jednotek — materiály, osvětlení, atmosféra.' },
      { id: 'exteriér',    label: 'Exteriér',           prices: [6000, 15000, 30000], info: 'Fotorealistické exteriérové rendery zasazené do reálného prostředí. Doporučujeme doplnit záběry z dronu.' },
      { id: 'int_anim',    label: 'Interiér animace',   prices: [2500, 5000, 10000],  info: 'Krátká animace interiéru — plynulý průlet prostorem, který doplní statické vizualizace.' },
      { id: 'ext_anim',    label: 'Exteriér animace',   prices: [3000, 5000, 8000],   info: 'Krátká animace exteriéru — přechody, záběry z výšky, nebo pohled od ulice ke vchodu.' },
      { id: 'matterport',  label: 'Matterport',         prices: [2500, 6000, 15000],  info: 'Máte již hotovou typovou jednotku? 360° prohlídka reálného prostoru. Upozornění: Matterport účtuje zvlášť měsíční poplatek za uložiště.' },
      { id: 'virtual',     label: 'Virtuální prohlídka',prices: [1000, 2000, 5000],   info: 'Potřebujete 360° virtuální prohlídku a statické vizualizace Vám nestačí? Uděláme kompletní virtuální prohlídku vizualizací.' },
      { id: 'pudorysy_2d', label: '2D půdorysy',        prices: [600, 2000, 5000],    info: 'Přehledné půdorysy v klasickém 2D provedení pro každou bytovou jednotku. Zdarma k webu s konfigurátorem.', freeWithKonfigurator: true },
      { id: 'pudorysy_3d', label: '3D půdorysy',        prices: [1200, 4000, 10000],  info: 'Moderní 3D půdorysy pro každou bytovou jednotku. Zdarma k webu s konfigurátorem.', freeWithKonfigurator: true },
      { id: 'dron',        label: 'Záběry z dronu',     prices: [2000, 4000, 6000],   info: 'Profesionální záběry nemovitosti a okolí. Fotky slouží také k zasazení do vizualizací.' },
    ],
  },
  {
    id: 'moznosti', title: 'Možnosti webu', icon: Settings, type: 'checkbox',
    items: [
      { id: 'cms',          label: 'CMS Systém',                      prices: [5000, 8000, 10000], info: 'Redakční systém pro snadnou správu obsahu webu bez potřeby programátora — texty, fotky, ceny.' },
      { id: 'kalkulator',   label: 'Live kalkulačka',                 prices: [3000, 3000, 3000],  info: 'Interaktivní kalkulačka pro zákazníky — spočítají si orientační měsíční splátku přímo na webu.' },
      { id: 'jazykova_mutace', label: 'Jazyková mutace',              prices: [4000, 6000, 8000],  info: 'Překlad webu do cizího jazyka (angličtina, němčina aj.) — kompletní lokalizace obsahu včetně přepínače jazyků.' },
      { id: 'ai_asistent',  label: 'AI asistent',                     prices: [3000, 4500, 6000],  info: 'AI asistent na vašem webu rovnou zodpoví drobné a časté dotazy (k materiálům, cenám či lokalitě). Zájemci nemusí čekat na e-mail a vaši makléři ušetří čas pro vážná jednání.' },
      { id: 'katalog',      label: 'Katalog standardů a karet bytů', prices: [4000, 4000, 4000],  info: 'Vygenerování nebo grafické zpracování profesionální PDF brožury, kterou mohou makléři tisknout nebo posílat e-mailem.' },
    ],
  },
  {
    id: 'marketing', title: 'Marketing', icon: Megaphone, type: 'radio',
    items: [
      { id: 'marketing_ano', label: 'Chci konzultaci zdarma', prices: [0, 0, 0], info: 'Postaráme se o propagaci vašeho projektu! Pomůžeme s: balíčkem videí na sociální sítě s tvorbou scénářů, tvorbou reklamního videa, spuštěním propagace na YouTube, Google Ads, Sklik, Instagram, Facebook, TikTok a správou sociálních sítí po dobu aktuálnosti projektu.' },
      { id: 'marketing_ne',  label: 'Nechci konzultaci',       prices: [0, 0, 0], info: 'Máme na prezentaci externí agenturu.' },
    ],
  },
  {
    id: 'podpora', title: 'Podpora', icon: HeadphonesIcon, type: 'radio',
    items: [
      { id: 'podpora_zadna',    label: 'Žádná',       prices: [0, 0, 0],          info: 'Bez technické podpory po spuštění. Vhodné pokud máte vlastní IT tým.' },
      { id: 'podpora_standard', label: 'Standardní',  prices: [1500, 3000, 4500], info: 'Podpora v pracovní době (Po–Pá 9–17), odezva do 24 hodin. Měsíční paušál.' },
      { id: 'podpora_247',      label: '24/7',         prices: [3000, 5000, 8000], info: 'Nonstop technická podpora, odezva do 2 hodin. Vhodné pro projekty s vysokou návštěvností. Měsíční paušál.' },
    ],
  },
];

/* ─── Typ projektu ──────────────────────────────────────────────────── */

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

const PROJECT_TYPES: { id: ProjectTypeId; label: string; units: string; size: string; description: string; Svg: React.FC }[] = [
  { id: 'small',  label: 'Komorní projekt',    units: '1–4 jednotky',  size: 'Malý',    description: 'Solitérní vily, rodinné domy, menší řadová výstavba.',    Svg: SmallHouseSvg },
  { id: 'medium', label: 'Rezidenční projekt', units: '5–20 jednotek', size: 'Střední', description: 'Bytové domy, komunitní čtvrti, větší řadové projekty.',   Svg: MediumBuildingSvg },
  { id: 'large',  label: 'Developerský celek', units: '20+ jednotek',  size: 'Velký',   description: 'Velké bytové komplexy, polyfunkční domy, komerční zóny.', Svg: LargeTowerSvg },
];

/* ─── Tooltip ───────────────────────────────────────────────────────── */

function Tooltip({ text, selected = false }: { text: string; selected?: boolean }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  function handleOpen() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.top + r.height / 2, left: r.right + 8 });
    }
    setOpen(true);
  }

  return (
    <span className="inline-flex items-center">
      <button
        ref={btnRef}
        onMouseEnter={handleOpen} onMouseLeave={() => setOpen(false)}
        onFocus={handleOpen} onBlur={() => setOpen(false)}
        className={`transition-colors duration-200 focus:outline-none ${selected ? 'text-white/70 hover:text-white' : 'text-anthracite/30 hover:text-forest'}`}
        aria-label="Více informací" type="button"
      >
        <Info size={13} strokeWidth={2} />
      </button>
      {open && createPortal(
        <span
          style={{ position: 'fixed', top: pos.top, left: pos.left, transform: 'translateY(-50%)', zIndex: 9999 }}
          className="w-56 bg-anthracite text-greige text-[12px] leading-relaxed rounded-xl px-3 py-2.5 shadow-xl pointer-events-none"
        >
          {text}
          <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-anthracite" />
        </span>,
        document.body
      )}
    </span>
  );
}

/* ─── Poptávka modal ────────────────────────────────────────────────── */

interface PriceLine { label: string; price: number; free?: boolean }

function PoptavkaModal({ total, lines, onClose }: {
  total: number;
  lines: PriceLine[];
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Zadejte jméno';
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
      ? lines.map(l => `• ${l.label}: ${l.free ? 'Zdarma' : 'od ' + l.price.toLocaleString('cs-CZ') + ' Kč'}`).join('\n') +
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
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200">
          <X size={15} />
        </button>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Nezávazná poptávka</p>
              <h3 className="text-xl font-display font-extrabold text-white mb-1">Odeslat poptávku</h3>

              {lines.length > 0 && (
                <div className="mt-4 mb-6 p-4 rounded-2xl bg-white/8 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35 mb-3">Vaše kalkulace</p>
                  <div className="space-y-1.5 mb-3">
                    {lines.map(l => (
                      <div key={l.label} className="flex justify-between gap-2">
                        <span className="text-[12px] text-white/55">{l.label}</span>
                        <span className="text-[12px] font-semibold text-white/70 whitespace-nowrap">
                          {l.free ? 'Zdarma' : l.price.toLocaleString('cs-CZ') + ' Kč'}
                        </span>
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                    <User size={11} />Jméno *
                  </label>
                  <input type="text" placeholder="Jan Novák" value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(ev => ({ ...ev, name: '' })); }}
                    className={`bg-white/10 text-white placeholder-white/25 text-[13px] px-4 py-3 rounded-xl border outline-none focus:border-white/35 transition-colors ${errors.name ? 'border-red-400/70' : 'border-white/15'}`} />
                  {errors.name && <p className="text-[11px] text-red-400/80">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 flex items-center gap-1.5">
                    <Mail size={11} />E-mail *
                  </label>
                  <input type="email" placeholder="jan@firma.cz" value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(ev => ({ ...ev, email: '' })); }}
                    className={`bg-white/10 text-white placeholder-white/25 text-[13px] px-4 py-3 rounded-xl border outline-none focus:border-white/35 transition-colors ${errors.email ? 'border-red-400/70' : 'border-white/15'}`} />
                  {errors.email && <p className="text-[11px] text-red-400/80">{errors.email}</p>}
                </div>

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
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return display;
}

/* ─── Price Panel ───────────────────────────────────────────────────── */

interface PricePanelProps {
  projectType: ProjectTypeId | null;
  total: number;
  totalRaw: number;
  lines: PriceLine[];
  setShowPoptavka: (v: boolean) => void;
  generatePDF: () => void;
}

function PricePanel({ projectType, total, totalRaw, lines, setShowPoptavka, generatePDF }: PricePanelProps) {
  return (
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
              <span className="text-[12px] font-bold text-white/70 whitespace-nowrap">
                {line.free ? 'Zdarma' : formatPrice(line.price)}
              </span>
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
        Stáhnout kalkulaci
      </button>

      <p className="text-[11px] text-white/20 text-center mt-4 leading-relaxed">
        Finální cenu upřesníme po konzultaci.<br />Odpovídáme do 24 hodin.
      </p>
    </div>
  );
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
  const [showPoptavka, setShowPoptavka] = useState(false);
  const [projectType, setProjectType] = useState<ProjectTypeId | null>(null);

  const typeIndex = projectType === 'small' ? 0 : projectType === 'medium' ? 1 : 2;

  function getItemPrice(item: Item): number {
    if (item.freeWithKonfigurator && radioValues.web === 'web_s') return 0;
    return item.prices[typeIndex];
  }

  function isItemFree(item: Item): boolean {
    return !!(item.freeWithKonfigurator && radioValues.web === 'web_s');
  }

  function toggleCheck(id: string) {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function setRadio(sectionId: string, itemId: string) {
    setRadioValues(prev => ({ ...prev, [sectionId]: prev[sectionId] === itemId ? '' : itemId }));
  }

  function sectionCount(section: Section) {
    if (section.type === 'radio') return radioValues[section.id] ? 1 : 0;
    return section.items.filter(i => checked.has(i.id)).length;
  }

  const totalRaw = projectType ? SECTIONS.reduce((sum, section) => {
    if (section.type === 'radio') {
      const sel = section.items.find(i => i.id === radioValues[section.id]);
      return sum + (sel ? getItemPrice(sel) : 0);
    }
    return sum + section.items.filter(i => checked.has(i.id)).reduce((s, i) => s + getItemPrice(i), 0);
  }, 0) : 0;

  const total = useCountUp(totalRaw);

  const lines: PriceLine[] = SECTIONS.flatMap(section => {
    if (section.type === 'radio') {
      const sel = section.items.find(i => i.id === radioValues[section.id]);
      if (!sel || getItemPrice(sel) === 0) return [];
      return [{ label: sel.label, price: getItemPrice(sel) }];
    }
    return section.items
      .filter(i => checked.has(i.id))
      .map(i => ({
        label: i.label,
        price: getItemPrice(i),
        free: isItemFree(i) || undefined,
      }));
  });

  function generatePDF() {
    const now = new Date();
    const date = now.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
    const refNum = `IMS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const logoUrl = `${window.location.origin}/logo.svg`;
    const projectTypeInfo = PROJECT_TYPES.find(p => p.id === projectType);

    const selectedItems = SECTIONS.flatMap(section => {
      if (section.type === 'radio') {
        const sel = section.items.find(i => i.id === radioValues[section.id]);
        return sel ? [{ section: section.title, ...sel, computedPrice: getItemPrice(sel), free: isItemFree(sel) }] : [];
      }
      return section.items.filter(i => checked.has(i.id)).map(i => ({
        section: section.title, ...i, computedPrice: getItemPrice(i), free: isItemFree(i),
      }));
    });

    const rows = selectedItems.map(item => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;">
          <div style="font-weight:600;color:#2D2D2D;margin-bottom:4px;">${item.label}</div>
          <div style="font-size:12px;color:#888;line-height:1.5;">${item.info}</div>
          <div style="font-size:11px;color:#4A6741;font-weight:600;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">${item.section}</div>
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap;font-weight:700;color:#2D2D2D;vertical-align:top;">
          ${item.free ? '<span style="color:#4A6741;">Zdarma</span>' : item.computedPrice > 0 ? item.computedPrice.toLocaleString('cs-CZ') + ' Kč' : '—'}
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

  .project-type-badge { display: inline-flex; align-items: center; gap: 8px; background: #F0F4EE; border: 1px solid #C8D8C4; border-radius: 8px; padding: 8px 14px; margin-bottom: 20px; }
  .project-type-badge .pt-label { font-size: 12px; font-weight: 700; color: #4A6741; text-transform: uppercase; letter-spacing: .08em; }
  .project-type-badge .pt-desc { font-size: 12px; color: #666; }

  .next-steps { margin-top: 40px; padding: 28px 32px; background: #F5F4F1; border-radius: 12px; }
  .next-steps h3 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .15em; color: #4A6741; margin-bottom: 20px; }
  .steps { display: flex; gap: 0; }
  .step { flex: 1; position: relative; padding-right: 24px; }
  .step:last-child { padding-right: 0; }
  .step-num { width: 28px; height: 28px; border-radius: 50%; background: #2C3B2A; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
  .step-title { font-size: 13px; font-weight: 700; color: #2D2D2D; margin-bottom: 4px; }
  .step-text { font-size: 12px; color: #888; line-height: 1.5; }
  .step-arrow { position: absolute; right: 4px; top: 6px; color: #C8D8C4; font-size: 18px; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="logo">
      <img src="${logoUrl}" alt="imersa" style="height:28px;width:auto;object-fit:contain;" />
    </div>
    <div class="meta">
      <div><strong>Cenová kalkulace</strong></div>
      <div>${date}</div>
      <div style="color:#4A6741;font-weight:600;">Ref: ${refNum}</div>
    </div>
  </div>

  <div class="title-block">
    <div class="label">Váš výběr služeb</div>
    <h1>Sestavená kalkulace projektu</h1>
    <p class="subtitle">Níže naleznete přehled zvolených služeb včetně jejich popisu a orientační ceny. Finální cenu upřesníme po úvodní konzultaci zdarma.</p>
    ${projectTypeInfo ? `
    <div class="project-type-badge" style="margin-top:16px;">
      <span class="pt-label">Typ projektu: ${projectTypeInfo.label}</span>
      <span style="color:#C8D8C4;">|</span>
      <span class="pt-desc">${projectTypeInfo.units} — ${projectTypeInfo.description}</span>
    </div>` : ''}
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

  <div class="next-steps">
    <h3>Jak pokračovat dál?</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-title">Nezávazná konzultace</div>
        <div class="step-text">Ozvěte se nám — konzultace je zdarma a nezávazná. Projdeme vaši vizi a upřesníme rozsah projektu.</div>
        <span class="step-arrow">→</span>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-title">Přesná nabídka</div>
        <div class="step-text">Na základě konzultace připravíme detailní nabídku s pevnou cenou a harmonogramem.</div>
        <span class="step-arrow">→</span>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-title">Spuštění projektu</div>
        <div class="step-text">Po odsouhlasení zahájíme práce. Průběžně vás informujeme o postupu.</div>
      </div>
    </div>
  </div>

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

  return (
    <section id="cenik" ref={ref} className="py-16 lg:py-28 relative">
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

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#E0DDD3]" />
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                      className={`relative flex flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-3 sm:py-4 rounded-xl border transition-all duration-200 ${isSelected ? 'bg-forest border-forest shadow-md shadow-forest/15' : 'bg-white border-anthracite/10 hover:border-forest/40 hover:shadow-sm'}`}>
                      <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-[0.12em] ${isSelected ? 'text-white' : 'text-forest'}`}>{pt.size}</span>
                      <div className={`w-10 h-8 sm:w-14 sm:h-12 ${isSelected ? 'text-white' : 'text-forest'}`}><pt.Svg /></div>
                      <span className={`text-[12px] sm:text-[13px] font-semibold text-center leading-tight ${isSelected ? 'text-white' : 'text-anthracite'}`}>{pt.label}</span>
                      <span className={`text-[10px] sm:text-[11px] font-medium ${isSelected ? 'text-white/70' : 'text-forest/70'}`}>{pt.units}</span>
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
                    const free = isItemFree(item);
                    const price = getItemPrice(item);
                    return (
                      <button key={item.id} type="button"
                        onClick={() => section.type === 'radio' ? setRadio(section.id, item.id) : toggleCheck(item.id)}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${isSelected
                          ? 'bg-gradient-to-br from-[#4d6e43] via-[#3d5a35] to-[#2c4626] border-[#4d6e43]/60 shadow-[0_6px_20px_rgba(74,103,65,0.28),inset_0_1px_0_rgba(255,255,255,0.10)] -translate-y-0.5'
                          : 'bg-white border-anthracite/10 hover:border-forest/40 hover:shadow-sm'}`}>
                        {isSelected && <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-white/40 to-white/10" />}
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isSelected ? 'bg-white/15 border-white/50' : 'border-anthracite/20 group-hover:border-forest/50'}`}>
                          {isSelected && <Check size={10} strokeWidth={3} className="text-white" />}
                        </span>
                        <span className={`flex-1 text-[13px] font-semibold leading-snug ${isSelected ? 'text-white' : 'text-anthracite'}`}>{item.label}</span>
                        {projectType && (
                          free
                            ? <span className={`text-[11px] font-bold whitespace-nowrap ${isSelected ? 'text-white/75' : 'text-forest/60'}`}>Zdarma</span>
                            : price > 0
                              ? <span className={`text-[11px] font-bold whitespace-nowrap ${isSelected ? 'text-white/65' : 'text-anthracite/35'}`}>{formatPrice(price)}</span>
                              : null
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

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden lg:block sticky top-24 self-start">
            <PricePanel
              projectType={projectType}
              total={total}
              totalRaw={totalRaw}
              lines={lines}
              setShowPoptavka={setShowPoptavka}
              generatePDF={generatePDF}
            />
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
              <div className="flex items-center gap-2 flex-shrink-0">
                {totalRaw > 0 && (
                  <button
                    type="button"
                    onClick={generatePDF}
                    className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white transition-all duration-200 active:scale-95 hover:bg-white/25"
                    aria-label="Stáhnout kalkulaci PDF"
                  >
                    <FileDown size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPoptavka(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#2C3B2A] text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-200 active:scale-95"
                >
                  Poptávka
                  <ArrowUpRight size={12} />
                </button>
              </div>
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
