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

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = 'Zásady ochrany osobních údajů | Imersa';
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
            Zásady ochrany osobních údajů
          </h1>
          <p className="text-white/35 text-[13px] mt-3">Platné od 1. 1. 2025 · Naposledy aktualizováno: červen 2025</p>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-anthracite/[0.06] shadow-sm p-7 sm:p-10 lg:p-12">

            <p className="text-[14px] text-anthracite/65 leading-relaxed mb-10 pb-8 border-b border-anthracite/[0.07]">
              Tato stránka popisuje, jak správce webové stránky <strong className="text-anthracite/85">imersa.cz</strong> zpracovává
              osobní údaje návštěvníků v souladu s Nařízením (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb.,
              o zpracování osobních údajů.
            </p>

            <Section title="1. Správce osobních údajů">
              <p>Správcem osobních údajů je provozovatel webu imersa.cz:</p>
              <div className="bg-[#f5f3ee] rounded-xl p-5 my-4 space-y-1.5 text-[13px] font-medium">
                <p><span className="text-anthracite/50 w-24 inline-block">Název:</span> Daniel Sváček</p>
                <p><span className="text-anthracite/50 w-24 inline-block">IČO:</span> 21666491</p>
                <p><span className="text-anthracite/50 w-24 inline-block">Sídlo:</span> U Stromovky 416/62, 736 01 Havířov - Město</p>
                <p><span className="text-anthracite/50 w-24 inline-block">E-mail:</span> <a href="mailto:info@imersa.cz" className="text-forest hover:underline">info@imersa.cz</a></p>
                <p><span className="text-anthracite/50 w-24 inline-block">Telefon:</span> +420 604 445 240</p>
              </div>
            </Section>

            <Section title="2. Jaké osobní údaje zpracováváme">
              <p>
                Sbíráme pouze údaje, které nám sami sdělíte prostřednictvím <strong>kontaktního formuláře</strong> na webu:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-anthracite/85">Jméno a příjmení</strong> — povinný údaj pro identifikaci komunikace</li>
                <li><strong className="text-anthracite/85">E-mailová adresa</strong> — povinný údaj pro zaslání odpovědi</li>
                <li><strong className="text-anthracite/85">Telefonní číslo</strong> — nepovinný údaj pro případný telefonický kontakt</li>
                <li><strong className="text-anthracite/85">Typ projektu</strong> — nepovinný výběr pro lepší cílení odpovědi</li>
                <li><strong className="text-anthracite/85">Obsah zprávy</strong> — popis vaší poptávky nebo dotazu</li>
              </ul>
              <p className="mt-3">Jiné osobní údaje, zejména citlivé kategorie dle čl. 9 GDPR, cíleně neshromažďujeme.</p>
            </Section>

            <Section title="3. Účel a právní základ zpracování">
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#f5f3ee] text-anthracite/60">
                      <th className="text-left px-4 py-3 font-bold rounded-tl-lg">Účel zpracování</th>
                      <th className="text-left px-4 py-3 font-bold">Právní základ (GDPR)</th>
                      <th className="text-left px-4 py-3 font-bold rounded-tr-lg">Doba uchování</th>
                    </tr>
                  </thead>
                  <tbody className="text-anthracite/70">
                    <tr className="border-t border-anthracite/[0.07]">
                      <td className="px-4 py-3">Vyřízení vaší poptávky a obchodní komunikace</td>
                      <td className="px-4 py-3">Čl. 6/1/b — plnění nebo uzavření smlouvy</td>
                      <td className="px-4 py-3">Po dobu jednání + 3 roky</td>
                    </tr>
                    <tr className="border-t border-anthracite/[0.07]">
                      <td className="px-4 py-3">Analýza návštěvnosti webu</td>
                      <td className="px-4 py-3">Čl. 6/1/a — souhlas (cookies)</td>
                      <td className="px-4 py-3">Viz Zásady cookies</td>
                    </tr>
                    <tr className="border-t border-anthracite/[0.07]">
                      <td className="px-4 py-3">Plnění zákonných povinností</td>
                      <td className="px-4 py-3">Čl. 6/1/c — zákonná povinnost</td>
                      <td className="px-4 py-3">Dle příslušného zákona</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="4. Příjemci a zpracovatelé osobních údajů">
              <p>Vaše osobní údaje neprodáváme ani nepronajímáme třetím stranám. Pro zajištění provozu webu využíváme tyto zpracovatele:</p>
              <ul className="list-disc pl-5 space-y-3 mt-3">
                <li>
                  <strong className="text-anthracite/85">Web3Forms</strong> (web3forms.com) — technické zprostředkování odeslání kontaktního formuláře.
                  Zpracovatel splňuje požadavky GDPR.
                </li>
                <li>
                  <strong className="text-anthracite/85">Google LLC</strong> — Google Analytics 4 pro statistiku návštěvnosti (pouze s vaším souhlasem).
                  Data mohou být přenášena do USA na základě Standardních smluvních doložek dle čl. 46 GDPR.
                  Více informací: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">policies.google.com/privacy</a>
                </li>
                <li>
                  <strong className="text-anthracite/85">Netlify, Inc.</strong> — hosting webu imersa.cz. Server je umístěn v EU (Frankfurt).
                </li>
              </ul>
            </Section>

            <Section title="5. Vaše práva">
              <p>
                Máte kdykoli právo nás kontaktovat na{' '}
                <a href="mailto:info@imersa.cz" className="text-forest hover:underline">info@imersa.cz</a>{' '}
                a uplatnit následující práva:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-anthracite/85">Přístup</strong> (čl. 15) — obdržet potvrzení a kopii zpracovávaných údajů</li>
                <li><strong className="text-anthracite/85">Oprava</strong> (čl. 16) — opravit nepřesné nebo neúplné údaje</li>
                <li><strong className="text-anthracite/85">Výmaz</strong> (čl. 17) — požádat o smazání údajů („být zapomenut")</li>
                <li><strong className="text-anthracite/85">Omezení zpracování</strong> (čl. 18) — po dobu prošetření případné námitky</li>
                <li><strong className="text-anthracite/85">Přenositelnost</strong> (čl. 20) — obdržet údaje ve strojově čitelném formátu</li>
                <li><strong className="text-anthracite/85">Námitka</strong> (čl. 21) — proti zpracování na základě oprávněného zájmu</li>
                <li><strong className="text-anthracite/85">Odvolání souhlasu</strong> — kdykoli pro zpracování na základě souhlasu (cookies)</li>
              </ul>
              <div className="mt-5 p-4 bg-[#f0f4ee] rounded-xl border border-forest/15 text-[13px]">
                <p className="font-semibold text-anthracite/80 mb-1">Stížnost u dozorového úřadu</p>
                <p>
                  Máte právo podat stížnost u{' '}
                  <strong>Úřadu pro ochranu osobních údajů (ÚOOÚ)</strong>,
                  Pplk. Sochora 27, 170 00 Praha 7,{' '}
                  <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">www.uoou.cz</a>.
                </p>
              </div>
            </Section>

            <Section title="6. Zabezpečení osobních údajů">
              <p>
                Přijímáme přiměřená technická a organizační opatření k ochraně vašich osobních údajů před neoprávněným
                přístupem, ztrátou nebo zneužitím. Veškerá komunikace se serverem probíhá prostřednictvím
                šifrovaného HTTPS spojení (TLS).
              </p>
            </Section>

            <Section title="7. Aktualizace těchto zásad">
              <p>
                Tyto zásady ochrany osobních údajů můžeme aktualizovat. Aktuální verze je vždy dostupná na
                adrese <strong>imersa.cz/privacy</strong>. Datum poslední aktualizace je uveden v záhlaví dokumentu.
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
