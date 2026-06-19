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
  sources?: string[];
};

export const articles: Article[] = [
  {
    slug: 'cnb-zvyseni-sazeb-developer',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    category: 'Trh',
    date: '19. června 2026',
    title: 'Konec levných peněz: ČNB zvyšuje sazby na 3,75 %. Jak ochránit prodeje developerských projektů?',
    excerpt: 'Česká národní banka poprvé po čtyřech letech zvyšuje sazby. Průměrné hypotéky překonaly 5,3 %. Co to znamená pro prodej developerských projektů a jak obstát.',
    readTime: '5 min čtení',
    content: {
      lead: 'Česká národní banka mění po čtyřech letech kurz. Růst základní úrokové sazby spouští řetězovou reakci, která prodražuje hypotéky na maxima za poslední rok a půl. Trh s novostavbami čeká zkouška ohněm. Zákazníci budou pečlivěji vybírat a proces rozhodování se protáhne. Vítězi se stanou ti developeři, kteří dokážou budoucím majitelům nabídnout absolutní jistotu díky prémiovým webovým prezentacím a interaktivním 3D situacím.',
      sections: [
        {
          heading: 'ČNB šlápla na brzdu. Co stojí za zdražením úvěrů?',
          body: 'Bankovní rada pod vedením guvernéra Aleše Michla rozhodla na červnovém jednání o prvním zvýšení sazeb od června 2022 — pro hlasovalo šest ze sedmi členů rady. Primárním důvodem jsou přetrvávající inflační tlaky napříč ekonomikou. Klíčové změny jsou tři: dvoutýdenní repo sazba vzrostla o 0,25 procentního bodu na 3,75 %, lombardní sazba (za kolik si komerční banky půjčují od centrální banky) nově činí 4,75 % a diskontní sazba (od které se odvíjí úročení vkladů bank) byla zvýšena na 2,75 %.',
        },
        {
          heading: 'Hypotéky na maximech: úrokové swapy prodražují bydlení',
          body: 'Reakce hypotečního trhu na sebe nenechala dlouho čekat. Podle aktuálních dat Swiss Life Hypoindexu vystoupala průměrná nabídková sazba na začátku června na 5,3 % — růst o 11 bazických bodů. Hypotéky se drží nad pětiprocentní hranicí už třetí měsíc a jsou nejdražší za posledního půldruhého roku. Jak upozorňuje Evžen Korec ze společnosti Ekospol, za zdražováním nestojí jen ČNB — klíčový je vývoj ceny peněz na mezibankovním trhu a rostoucí sazby úrokových swapů s delší splatností. Pro developery z toho plynou dvě překážky: úbytek kupní síly (polovina kupujících novostaveb spoléhá na hypotéku) a syndrom opatrného klienta — zákazník upisující se k drahému úvěru neakceptuje kompromisy a před podpisem rezervační smlouvy vyžaduje stoprocentní transparentnost.',
        },
        {
          heading: 'Interaktivní 3D situace eliminují obavy',
          body: 'Pokud si kupující nedokáže představit, jak přesně bude komplex zasazen do okolní zástavby, klesá jeho důvěra. Interaktivní 3D model mu umožní libovolně rotovat celým projektem, sledovat simulaci reálného oslunění v průběhu dne a prohlížet vnitroblok. Možnost vizuálně zakliknout konkrétní bytovou jednotku přímo ze 3D pohledu z ptačí perspektivy vytváří mnohem silnější emoční vazbu než scrollování suchou tabulkou — a obavy z koupě z papíru mizí.',
        },
        {
          heading: 'Bleskurychlé weby, které neztrácejí klienty',
          body: 'Pomalé načítání velkých vizualizací nebo zasekávající se výběr bytů kupující spolehlivě odradí. Tradiční šablonovité systémy pro prémiové developerské projekty nestačí. Tajemstvím hladkého běhu jsou na míru kódované statické weby využívající moderní JAMstack architekturu, nasazené na špičkovém hostingu. Okamžité načtení interaktivních konfigurátorů s nulovou prodlevou přesvědčuje zákazníka podvědomě i o vysoké kvalitě samotné stavby.',
        },
        {
          heading: 'Virtuální prohlídky prodávají z papíru',
          body: 'Procházka bytem, ve kterém ještě nejsou ani vylité podlahy, představuje ultimátní prodejní argument. Klient získá dokonalou představu o velikosti místností, rozložení nábytku a výhledech z oken, čímž zcela odpadají pochybnosti o dispozičním řešení. V době drahých hypoték, kdy každý kupující analyzuje svoji investici pod lupou, je tato možnost přímou odpovědí na jeho nejhlubší pochybnosti.',
        },
        {
          heading: 'Závěr',
          body: 'Dražší peníze trh zchladí, ale nezastaví ho. Lidé budou kvalitní bydlení hledat dál. Prodejní úspěch v době drahých hypoték ale vyžaduje od developera krok navíc — profesionální digitální prezentaci, která prodává emoce, jistotu a luxus na první kliknutí. Developeři, kteří dnes investují do prémiové online prezentace, nejen přežijí ochlazení trhu — využijí ho jako příležitost odtrhnout se od konkurence.',
        },
      ],
    },
    sources: [
      'ČNB.cz: Aleš Michl: Důvody pro červnové zvýšení sazeb zesílily a oficiální oznámení o změně sazeb.',
      'RealityČechy.cz: Hypotéky pod tlakem. ČNB poprvé po čtyřech letech zvýšila sazby.',
      'Novinky.cz / ČT24.cz: Agregované zpravodajství o dopadu zvýšení repo sazby na 3,75 % na českou ekonomiku.',
      'Swiss Life Hypoindex: Údaje o překročení hranice 5,3 % u průměrných hypotečních sazeb počátkem června.',
      'Ekospol: Vyjádření E. Korce k růstu úrokových swapů a nacenění hypoték.',
    ],
  },
  {
    slug: 'konfigurator-vs-showroom',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80',
    category: 'Analýza',
    date: '19. června 2026',
    title: '3D konfigurátor vs. fyzický showroom: co se víc vyplatí?',
    excerpt: 'Fyzický showroom stojí miliony a slouží jen do kolaudace. 3D konfigurátor funguje 24/7 ještě před zahájením stavby. Srovnáváme konkrétní čísla.',
    readTime: '7 min čtení',
    content: {
      lead: 'Fyzický showroom byl dlouho standardem realitního marketingu. Jenže budovat ho stojí miliony, trvá měsíce a slouží jen do kolaudace. 3D konfigurátor funguje 24/7 ještě před zahájením stavby. Podíváme se na konkrétní čísla.',
      sections: [
        {
          heading: 'Co vlastně srovnáváme?',
          body: 'Fyzický showroom je vzorový byt nebo prodejní centrum postavené (nebo pronajmuté) speciálně proto, aby si kupující mohl projekt „osahat". Výhoda je jasná — fyzický zážitek je přesvědčivý. Nevýhoda taky: showroom existuje jen na jednom místě, v jednu chvíli ho navštíví jeden zájemce, a po předání klíčů přestane mít smysl. 3D konfigurátor je interaktivní webová aplikace, ve které si kupující sám projde celou budovu — patro po patře, byt po bytu. Vidí aktuální dostupnost, navolí si dispozici, zkontroluje výhled z okna, spočítá si měsíční splátku. A to všechno z pohovky, v neděli večer, bez nutnosti domlouvat si schůzku.',
        },
        {
          heading: 'Porovnání nákladů',
          body: 'Tady bývá největší překvapení. Fyzický showroom pro rezidenční projekt středního rozsahu zahrnuje pronájem nebo stavbu prostoru (300 000 – 1 500 000 Kč), interiérové vybavení a staging (200 000 – 800 000 Kč), provoz, recepci a energie po celou dobu prodeje (50 000 – 150 000 Kč měsíčně) a závěrečnou demontáž (50 000 – 200 000 Kč). Celkem klidně 2–4 miliony Kč na 18–36 měsíců prodeje. 3D konfigurátor s prezentačním webem je jednorázová investice, která funguje od prvního dne prodeje až do posledního prodaného bytu — typicky zlomek nákladů showroomu, bez měsíčních provozních výdajů. A zatímco showroom dokáže obsloužit jednotky zájemců denně, konfigurátor nemá kapacitní strop: stovky lidí si ho projdou paralelně, v noci, o víkendu, ze zahraničí.',
        },
        {
          heading: 'Kde showroom stále vyhrává',
          body: 'Bylo by nefér showroom jen shazovat. Existují situace, kde fyzická přítomnost rozhoduje. Prémiový segment — u bytů nad 15 milionů Kč kupující očekávají osobní přístup; fyzické setkání je součástí zážitku, ne jen prostředek k přenosu informací. Specifické materiály a povrchy — barvu kamene nebo strukturu dřeva se v 3D nikdy zcela věrně reprodukovat nepodaří, vzorek v ruce stále funguje lépe. A závěrečná fáze prodeje — konfigurátor přivede zájemce ke schůzce, ale tu poslední, kde se podepíše smlouva, stejně většina developerů dělá osobně.',
        },
        {
          heading: 'Kde konfigurátor showroom jasně překonává',
          body: 'Prodej off-plan — showroom k rozestavěné budově zkrátka přesvědčivě nejde postavit. Konfigurátor zobrazuje přesně to, co bude, na základě projektové dokumentace s aktuálními dostupnostmi. Geografický dosah — developerský projekt v Brně může oslovit kupce z Prahy, Bratislavy nebo Vídně; kupující ze zahraničí si dnes běžně pořídí nemovitost, aniž by ji fyzicky navštívili, ale jen pokud mají dostatečně přesvědčivou online prezentaci. Noční a víkendové prohlídky — data z realitních portálů konzistentně ukazují, že největší špička v prohlížení nemovitostí je ve večerních hodinách a o víkendu, kdy je showroom zavřený. A konečně analytika — víte, kdo strávil 12 minut prohlížením konkrétního bytu v 5. patře a třikrát si spočítal splátku? Konfigurátor ano. Váš obchodní tým pak volá lidem, kteří o váš projekt skutečně stojí.',
        },
        {
          heading: 'Nejčastější námitka: „Naši zákazníci potřebují fyzický zážitek"',
          body: 'Je to pravda — ale jen zčásti, a jen v určité fázi rozhodování. Kupující dnes prochází desítky projektů online ještě předtím, než si domluví první schůzku. Ta fáze prvního výběru — kdy se rozhoduje, které projekty vůbec stojí za bližší zájem — probíhá na internetu, ne v showroomu. Pokud váš projekt v téhle fázi nezaujme, protože má jen statické renderingy a PDF prospekt, nepřijdou ani na fyzickou prohlídku. Konfigurátor funguje jako předfiltr i jako přesvědčovací nástroj zároveň. Fyzická schůzka pak přichází ve chvíli, kdy je zákazník z velké části rozhodnutý — a vaším obchodníkům zbývá ho jen potvrdit v tom rozhodnutí.',
        },
        {
          heading: 'Čísla z reálných projektů',
          body: 'Projekty s interaktivním 3D konfigurátorem běžně vykazují 2–3× vyšší čas strávený na webu oproti standardním prezentačním webům a výrazně vyšší podíl kvalifikovaných poptávek — zájemci přicházejí na schůzku informovaní, s konkrétními preferencemi. Prodejní cyklus se zkracuje: méně schůzek potřebných k podpisu smlouvy. A klíčové: možnost prodávat dříve, ještě v době, kdy fyzicky není co ukázat.',
        },
        {
          heading: 'Závěr: není to buď/nebo',
          body: 'Showroom a 3D konfigurátor nejsou konkurenti — jsou to různé nástroje pro různé fáze prodeje. Konfigurátor obslouží prvních 80 % rozhodovacího procesu online, přivede k vám připraveného kupce a poskytne vám analytická data o jeho preferencích. Fyzická schůzka pak uzavře deal. Klíčová otázka pro každého developera ale zní: Kolik projektů vám propadlo přes prsty jen proto, že váš konkurent měl lepší online prezentaci?',
        },
      ],
    },
  },
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
