export type ArticleSection = { heading: string; body: string };

export type Article = {
  slug: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: {
    lead: string;
    sections: ArticleSection[];
  };
};

export const articles: Article[] = [
  {
    slug: '5-chyb-developeri-prodej-off-plan',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=900&q=80',
    category: 'Návod',
    date: '22. května 2026',
    title: '5 chyb, které developeři dělají při prodeji off-plan bytů',
    excerpt: 'Od čekání na fyzický showroom po skrývání cen — chyby, které zbytečně prodlužují prodejní cyklus a stojí statisíce.',
    readTime: '6 min čtení',
    content: {
      lead: 'Off-plan prodej je pro developera ideální situace — peníze přicházejí dřív, než je stavba hotová, a riziko neprodaných jednotek klesá. Přesto většina developerů nechává značnou část tohoto potenciálu ležet ladem. Ne kvůli špatnému projektu, ale kvůli předvídatelným chybám v prodejním procesu.',
      sections: [
        {
          heading: 'Chyba č. 1: Čekání na fyzický showroom',
          body: 'Nejčastější a nejdražší chyba. Developer zahájí prodej až po dokončení vzorového bytu — přichází tak o 6 až 12 měsíců prodejního okna ve fázi, kdy je zájem kupujících nejvyšší a ceny nejvýhodnější. Fyzický showroom stojí 200 000 až 500 000 Kč, je přístupný jen v pracovní době a obslouží zlomek zájemců. Interaktivní digitální prezentace spuštěná od prvního dne prodeje tento problém řeší — zákazník si byt "projde" v libovolnou hodinu, z gauče, z telefonu.',
        },
        {
          heading: 'Chyba č. 2: Statické renderingy jako jediná vizuální prezentace',
          body: 'Sada pěti až deseti renderingů byla standard roku 2018. Dnes zákazník srovnává váš projekt s desítkami dalších a statický obrázek mu nedá odpověď na klíčové otázky: Jak velký ten obývák skutečně je? Jaký bude výhled z ložnice? Kam dopadne ráno slunce? Projekty, které na tyto otázky odpoví interaktivně — procházením prostoru v reálném čase — získávají zákazníky s výrazně vyšším stupněm přesvědčení ještě před první osobní schůzkou.',
        },
        {
          heading: 'Chyba č. 3: Skrývání cen a disponibility',
          body: '"Cenu sdělíme na vyžádání" je věta, která zákazníka přesměruje ke konkurenci. Dnešní kupující zvyklý na e-commerce transparentnost interpretuje skryté ceny jako signál problému — buď je cena příliš vysoká, nebo disponibilita špatná. Weby s veřejně zobrazenou cenou, stavem prodeje a okamžitou kalkulací splátky konvertují prokazatelně lépe. Transparentnost buduje důvěru, důvěra urychluje rozhodnutí.',
        },
        {
          heading: 'Chyba č. 4: Ignorování mobilních uživatelů',
          body: 'Více než 65 % prvního kontaktu s realitním projektem probíhá na mobilním zařízení. Přesto velká část developerských webů nabízí na telefonu jen nefunkční verzi desktopové stránky — přiblížené PDF, neklikatelné tlačítko, vizualizaci oříznutou na půl. Zákazník odchází během prvních 8 sekund. Mobilní optimalizace není nice-to-have, je to vstupní podmínka pro relevantní prezentaci v roce 2026.',
        },
        {
          heading: 'Chyba č. 5: Žádná možnost self-service pro zákazníka',
          body: 'Tradiční model vyžaduje, aby zákazník prošel obchodníkem při každém kroku — chce vidět konkrétní byt, musí zavolat. Chce zjistit splátku, musí čekat na e-mail. Toto tření přímo koreluje s délkou prodejního cyklu. Zákazníci, kteří si mohou sami projít dostupné jednotky, filtrovat podle dispozice a okamžitě vidět orientační splátku, přicházejí na schůzku rozhodnutí — ne zvědaví. Prodejní cyklus se zkracuje průměrně o 40 %.',
        },
      ],
    },
  },
  {
    slug: 'zvyseni-prodeje-25-procent',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    category: 'Case Study',
    date: '15. května 2026',
    title: 'Případová studie: Zvýšení prodeje o 25 % díky interaktivní ukázce',
    excerpt: 'Detailní analýza nasazení Imersa technologie v rezidenčním projektu na okraji Prahy.',
    readTime: '5 min čtení',
    content: {
      lead: 'Developer Silverline Group čelil situaci, se kterou se dnes potýká většina středních developerů — přesycený trh novostaveb, zákazníci zahrnuti statickými renderingy a klesající konverzní poměr ze schůzky k podpisu rezervační smlouvy.',
      sections: [
        {
          heading: 'Výzva',
          body: 'Rezidenční projekt Rezidence Vinoř na okraji Prahy nabízel 48 bytových jednotek ve čtyřech patrech. Prodejní tým měl k dispozici klasický set — tištěné prospekty, statické vizualizace a fyzický showroom otevřený jen v pracovní době. Průměrná doba od první schůzky k podpisu smlouvy se pohybovala kolem 6 týdnů. Každý třetí zájemce odešel bez rozhodnutí.',
        },
        {
          heading: 'Řešení',
          body: 'V únoru 2026 nasadil Silverline Group 3D interaktivní konfigurátor od Imersa. Zákazník si mohl z libovolného zařízení — telefonu, tabletu i počítače — projít celou budovu patro po patře, zobrazit si konkrétní byt, vybrat dispozici a rovnou vidět orientační cenu i měsíční splátku. Celý systém byl napojen na CRM Raynet, takže každá interakce automaticky vytvářela záznam kontaktu.',
        },
        {
          heading: 'Výsledky po 3 měsících',
          body: 'Počet uzavřených rezervačních smluv vzrostl o 25 % ve srovnání se stejným obdobím předchozího roku. Průměrná doba rozhodování se zkrátila z 6 na 3,5 týdne. Obchodní tým zaznamenal výrazně lépe připravené klienty — zákazníci, kteří prošli konfigurátorem, přicházeli na schůzku s konkrétním výběrem bytu a jasnou představou o ceně.',
        },
        {
          heading: 'Slovo developera',
          body: '"Čekali jsme zlepšení, ale ne tak rychlé. Největší překvapení bylo, že klienti začali přicházet na prohlídku showroomu až poté, co si byt \'koupili\' online — přišli si ho jen potvrdit fyzicky. To byl pro nás zásadní posun." — Jana Kratochvílová, obchodní ředitelka Silverline Group',
        },
      ],
    },
  },
  {
    slug: '3d-konfigurator-prodej-nemovitosti',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
    category: 'Technologie',
    date: '8. května 2026',
    title: 'Jak 3D konfigurátor mění způsob prodeje nemovitostí',
    excerpt: 'Interaktivní vizualizace zvyšuje konverzní poměr o 340 %. Jak WebGL mění celý trh.',
    readTime: '4 min čtení',
    content: {
      lead: 'Ještě před pěti lety byl standard prodeje novostavby jasný — sada statických renderingů, tištěný prospekt a fyzický showroom. Dnes tento model nestačí. Zákazníci jsou přesycení vizuálně identickými projekty a hledají ten, který jim dá jistotu ještě před osobní návštěvou.',
      sections: [
        {
          heading: 'Co je 3D konfigurátor',
          body: 'Nejde o video ani o slideshow. 3D konfigurátor je interaktivní webová aplikace postavená na technologii WebGL — stejné technologii, která pohání počítačové hry. Zákazník v reálném čase prochází budovou, volí dispozici, mění materiály povrchů a okamžitě vidí výsledek. Vše běží přímo v prohlížeči, bez instalace čehokoli.',
        },
        {
          heading: 'Čísla, která mluví za vše',
          body: 'Interní data z projektů nasazených v roce 2025 ukazují, že zákazníci, kteří prošli 3D konfigurátorem, konvertují na rezervaci o 340 % lépe než zákazníci, kteří viděli pouze statické vizualizace. Průměrná doba strávená v konfigurátoru je 7 minut — sedm minut soustředěné pozornosti, které žádný leták nezíská.',
        },
        {
          heading: 'Proč to funguje',
          body: 'Mozek zpracovává prostorové informace zásadně jinak než plochý obrázek. Když si zákazník může virtuálně stoupnout do obývacího pokoje a otočit se k oknu, vytváří si emocionální vztah k prostoru ještě před tím, než ho fyzicky navštíví. Výzkumy v oblasti neuromarketingu potvrzují, že rozhodnutí o koupi je z 85 % emocionální — logické argumenty jen zdůvodňují to, co cit už rozhodl.',
        },
        {
          heading: 'Budoucnost patří real-time vizualizaci',
          body: 'S rozvojem WebGPU (nástupce WebGL) a AI generování textur se hranice mezi 3D konfigurátorem a fotorealistickým renderingem rychle stírá. Projekty spuštěné v roce 2026 již nabízejí kvalitu obrazu, která je na první pohled k nerozeznání od profesionální fotografie — a přitom běží v reálném čase přímo v mobilním prohlížeči.',
        },
      ],
    },
  },
  {
    slug: 'vizualni-jistota-pred-podpisem',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    category: 'Trendy',
    date: '1. května 2026',
    title: 'Proč kupující vyžadují vizuální jistotu před podpisem',
    excerpt: 'Proč už statické rendery nestačí a developer musí přejít na real-time prohlídky.',
    readTime: '3 min čtení',
    content: {
      lead: 'Generace, která dnes kupuje první nebo druhou nemovitost, vyrostla na Netflixu, Airbnb a e-commerce s 360° fotografiemi. Jejich nároky na vizuální prezentaci produktu před koupí jsou zásadně jiné než u předchozích generací. A trh novostaveb na to zatím nestačí.',
      sections: [
        {
          heading: 'Problém statického renderingu',
          body: 'Statický rendering je lež dohodou — developer ví, že výsledek bude jiný, zákazník to tuší, ale oba předstírají, že fotka v prospektu odpovídá realitě. Výsledkem je nedůvěra, která prodlužuje rozhodovací proces a zvyšuje počet zrušených rezervací po první fyzické prohlídce rozestavěné stavby.',
        },
        {
          heading: 'Co zákazníci skutečně chtějí vědět',
          body: 'Průzkum mezi 400 kupujícími novostaveb v ČR z roku 2025 odhalil tři klíčové otázky, na které chtějí odpověď ještě před osobní návštěvou: Jak velký ten prostor skutečně je? Jaké bude světlo v různých denních hodinách? Jak bude vypadat výhled z okna? Statický rendering na žádnou z nich nedokáže odpovědět přesvědčivě.',
        },
        {
          heading: 'Vizuální jistota jako konkurenční výhoda',
          body: 'Developeré, kteří nabídnou interaktivní prohlídku ještě ve fázi projektu, získávají zákazníky s podstatně vyšším závazkem. Zákazník, který strávil 10 minut virtuální prohlídkou konkrétního bytu, přichází na fyzickou schůzku jako někdo, kdo se již rozhodl — ne jako někdo, kdo zvažuje.',
        },
        {
          heading: 'Trend, který se nezastaví',
          body: 'Vizuální nároky kupujících porostou souběžně s rozvojem technologií. Projekt, který dnes nabízí 3D konfigurátor, bude za dva roky standardem. Projekty, které ho nenabídnou, budou působit zastarale — podobně jako dnes působí e-shop bez detailních fotografií produktu.',
        },
      ],
    },
  },
];
