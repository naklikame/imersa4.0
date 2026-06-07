import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-[17px] sm:text-[19px] font-display font-bold text-anthracite mb-4 pb-3 border-b border-anthracite/[0.08]">
        {title}
      </h2>
      <div className="space-y-3 text-[14px] text-anthracite/70 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function CookieRow({ name, type, purpose, expiry }: { name: string; type: string; purpose: string; expiry: string }) {
  const typeColor = type === 'Nezbytný' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200';
  return (
    <tr className="border-t border-anthracite/[0.07]">
      <td className="px-4 py-3 font-mono text-[12px] text-anthracite/80 font-semibold">{name}</td>
      <td className="px-4 py-3">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${typeColor}`}>
          {type}
        </span>
      </td>
      <td className="px-4 py-3 text-[13px]">{purpose}</td>
      <td className="px-4 py-3 text-[13px] whitespace-nowrap">{expiry}</td>
    </tr>
  );
}

export default function CookiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = 'Zásady cookies | Imersa';
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
            Zásady používání cookies
          </h1>
          <p className="text-white/35 text-[13px] mt-3">Platné od 1. 1. 2025 · Naposledy aktualizováno: červen 2025</p>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-anthracite/[0.06] shadow-sm p-7 sm:p-10 lg:p-12">

            <p className="text-[14px] text-anthracite/65 leading-relaxed mb-10 pb-8 border-b border-anthracite/[0.07]">
              Tento dokument vysvětluje, jak web <strong className="text-anthracite/85">imersa.cz</strong> používá soubory
              cookies a podobné technologie v souladu s § 89 zákona č. 127/2005 Sb. (zákon o elektronických komunikacích)
              a Nařízením (EU) 2016/679 (GDPR).
            </p>

            <Section title="1. Co jsou soubory cookies">
              <p>
                Cookies jsou malé textové soubory, které webový server ukládá do vašeho prohlížeče při návštěvě webu.
                Při dalších návštěvách jsou tyto soubory odesílány zpět na server, který si tak „pamatuje" vaše předvolby.
              </p>
              <p>
                Cookies nemohou spustit programy ani přenášet viry. Neslouží k přímé identifikaci vaší osoby.
              </p>
            </Section>

            <Section title="2. Jaké cookies používáme">

              <h3 className="text-[14px] font-bold text-anthracite/80 mt-5 mb-2 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" />
                Nezbytné cookies
              </h3>
              <p>
                Tyto cookies jsou nutné pro základní funkčnost webu. Jsou ukládány automaticky a bez vašeho souhlasu,
                protože bez nich web nemůže správně fungovat. Neshromažďují žádné osobní identifikační informace.
              </p>

              <h3 className="text-[14px] font-bold text-anthracite/80 mt-6 mb-2 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
                Analytické cookies
              </h3>
              <p>
                Analytické cookies nám pomáhají pochopit, jak návštěvníci web používají — které stránky jsou
                nejpopulárnější, jak se uživatelé na webu pohybují a odkud přicházejí. Díky těmto datům
                můžeme web zlepšovat. Jsou ukládány <strong>pouze s vaším souhlasem</strong>.
              </p>
              <p className="mt-2">
                Používáme <strong>Google Analytics 4</strong> (Google LLC). Data jsou anonymizována a mohou být
                zpracovávána na serverech Google v USA (na základě Standardních smluvních doložek dle čl. 46 GDPR).
              </p>

              <div className="overflow-x-auto mt-5">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#f5f3ee] text-anthracite/60">
                      <th className="text-left px-4 py-3 font-bold rounded-tl-lg">Název cookie</th>
                      <th className="text-left px-4 py-3 font-bold">Typ</th>
                      <th className="text-left px-4 py-3 font-bold">Účel</th>
                      <th className="text-left px-4 py-3 font-bold rounded-tr-lg">Platnost</th>
                    </tr>
                  </thead>
                  <tbody className="text-anthracite/70">
                    <CookieRow
                      name="imersa_cookie_consent"
                      type="Nezbytný"
                      purpose="Ukládá váš souhlas nebo odmítnutí analytických cookies"
                      expiry="1 rok"
                    />
                    <CookieRow
                      name="_ga"
                      type="Analytický"
                      purpose="Google Analytics — identifikátor unikátního návštěvníka"
                      expiry="2 roky"
                    />
                    <CookieRow
                      name="_ga_ESLPMCDFN0"
                      type="Analytický"
                      purpose="Google Analytics — identifikátor relace (session)"
                      expiry="2 roky"
                    />
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="3. Správa a odvolání souhlasu">
              <p>
                Svůj souhlas s analytickými cookies můžete kdykoli odvolat nebo změnit:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-anthracite/85">Nastavení na tomto webu</strong> — klikněte na odkaz
                  {' '}<button
                    onClick={() => window.dispatchEvent(new Event('openCookieSettings'))}
                    className="text-forest underline underline-offset-2 hover:text-anthracite/70 transition-colors cursor-pointer"
                  >
                    Upravit nastavení cookies
                  </button>{' '}
                  v patičce webu nebo zde.
                </li>
                <li>
                  <strong className="text-anthracite/85">Nastavení prohlížeče</strong> — ve svém prohlížeči můžete
                  cookies blokovat nebo mazat. Upozorňujeme, že toto může ovlivnit funkčnost webu.
                </li>
                <li>
                  <strong className="text-anthracite/85">Google Analytics Opt-out</strong> — nainstalujte si{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">
                    doplněk prohlížeče od Google
                  </a>, který zcela zakáže odesílání dat do Google Analytics.
                </li>
              </ul>
            </Section>

            <Section title="4. Cookies třetích stran">
              <p>
                Tento web neobsahuje tlačítka sociálních sítí ani embed obsah třetích stran, které by ukládaly
                cookies bez vašeho vědomí (s výjimkou Google Analytics popsaného výše).
              </p>
            </Section>

            <Section title="5. Změny těchto zásad">
              <p>
                Tyto zásady cookies můžeme aktualizovat v případě změny používaných nástrojů nebo legislativních požadavků.
                Aktuální verze je vždy na adrese <strong>imersa.cz/cookies</strong>.
              </p>
              <p>
                Dotazy ohledně cookies zasílejte na:{' '}
                <a href="mailto:info@imersa.cz" className="text-forest hover:underline">info@imersa.cz</a>
              </p>
            </Section>

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
