import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe } from 'lucide-react';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-4 border-b border-anthracite/[0.07] last:border-0">
      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-anthracite/40 sm:w-40 flex-shrink-0 mb-1 sm:mb-0 pt-0.5">
        {label}
      </span>
      <div className="text-[14px] text-anthracite/80 leading-relaxed">{children}</div>
    </div>
  );
}

export default function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = 'Informace o provozovateli | Imersa';
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* Header */}
      <header className="bg-[#111612] px-6 py-4 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      {/* Hero */}
      <div className="bg-[#111612] px-6 pt-10 pb-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-forest block mb-3">Právní dokumenty</span>
          <h1 className="text-3xl sm:text-[2.6rem] font-display font-extrabold text-white leading-tight">
            Informace o provozovateli
          </h1>
          <p className="text-white/35 text-[13px] mt-3">Impressum · imersa.cz</p>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Company info */}
          <div className="bg-white rounded-2xl border border-anthracite/[0.06] shadow-sm p-7 sm:p-10">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-forest mb-6">Provozovatel webu</h2>

            <Row label="Název">
              Daniel Sváček
            </Row>
            <Row label="Právní forma">
              Osoba samostatně výdělečně činná (OSVČ)
            </Row>
            <Row label="IČO">
              21666491
            </Row>
            <Row label="DPH">
              Neplátce DPH
            </Row>
            <Row label="Sídlo">
              U Stromovky 416/62<br />
              736 01 Havířov - Město<br />
              Česká republika
            </Row>
            <Row label="Registrace">
              Zapsáno v živnostenském rejstříku
            </Row>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-anthracite/[0.06] shadow-sm p-7 sm:p-10">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-forest mb-6">Kontaktní údaje</h2>

            <div className="space-y-4">
              <a href="mailto:info@imersa.cz" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-forest/8 border border-forest/15 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/15 transition-colors">
                  <Mail size={15} className="text-forest" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-anthracite/40 mb-0.5">E-mail</p>
                  <p className="text-[14px] text-anthracite/80 group-hover:text-forest transition-colors">info@imersa.cz</p>
                </div>
              </a>

              <a href="tel:+420604445240" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-forest/8 border border-forest/15 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/15 transition-colors">
                  <Phone size={15} className="text-forest" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-anthracite/40 mb-0.5">Telefon</p>
                  <p className="text-[14px] text-anthracite/80 group-hover:text-forest transition-colors">+420 604 445 240</p>
                </div>
              </a>

              <a href="https://imersa.cz" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-forest/8 border border-forest/15 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/15 transition-colors">
                  <Globe size={15} className="text-forest" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-anthracite/40 mb-0.5">Web</p>
                  <p className="text-[14px] text-anthracite/80 group-hover:text-forest transition-colors">imersa.cz</p>
                </div>
              </a>
            </div>
          </div>

          {/* Legal notices */}
          <div className="bg-white rounded-2xl border border-anthracite/[0.06] shadow-sm p-7 sm:p-10">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-forest mb-6">Právní informace</h2>
            <div className="space-y-5 text-[14px] text-anthracite/70 leading-relaxed">
              <div>
                <h3 className="font-semibold text-anthracite/85 mb-1">Autorská práva</h3>
                <p>
                  Veškerý obsah webu imersa.cz (texty, grafika, vizualizace, loga) je chráněn autorským zákonem
                  (zákon č. 121/2000 Sb.). Bez písemného souhlasu provozovatele není dovoleno obsah jakkoliv kopírovat,
                  šířit nebo využívat ke komerčním účelům.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-anthracite/85 mb-1">Odpovědnost za obsah</h3>
                <p>
                  Informace na tomto webu mají výhradně informační charakter. Provozovatel neodpovídá za případné
                  nepřesnosti ani za škody vzniklé využitím informací zde uvedených.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-anthracite/85 mb-1">Ochrana osobních údajů</h3>
                <p>
                  Zpracování osobních údajů je popsáno v{' '}
                  <Link to="/privacy" className="text-forest hover:underline">Zásadách ochrany osobních údajů</Link>.
                  Používání cookies popisují{' '}
                  <Link to="/cookies" className="text-forest hover:underline">Zásady cookies</Link>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-anthracite/85 mb-1">Mimosoudní řešení sporů</h3>
                <p>
                  Spotřebitelé mohou využít platformu pro online řešení sporů Evropské komise:{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">
                    ec.europa.eu/consumers/odr
                  </a>. Provozovatel není ze zákona povinen se mimosoudního řešení sporů účastnit,
                  avšak je otevřen smírnému řešení případných neshod.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-[#f5f3ee] border-t border-anthracite/[0.06] py-8 text-center">
        <p className="text-[12px] text-anthracite/30">
          © {new Date().getFullYear()} Imersa ·{' '}
          <Link to="/" className="hover:text-anthracite/60 transition-colors">imersa.cz</Link>
        </p>
      </footer>
    </div>
  );
}
