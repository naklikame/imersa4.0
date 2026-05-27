import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface Apartment {
  id: number;
  disposition: string;
  floor: number;
  area: number;
  terrace: number;
  status: 'Volný' | 'Rezervace' | 'Prodáno';
  price: number;
}

const apartments: Apartment[] = [
  { id: 101, disposition: '1+kk', floor: 1, area: 38.5, terrace: 6.2, status: 'Volný', price: 3890000 },
  { id: 205, disposition: '2+kk', floor: 2, area: 58.3, terrace: 12.4, status: 'Volný', price: 5490000 },
  { id: 302, disposition: '3+kk', floor: 3, area: 78.1, terrace: 15.8, status: 'Rezervace', price: 7250000 },
  { id: 401, disposition: '2+kk', floor: 4, area: 62.7, terrace: 8.5, status: 'Volný', price: 5950000 },
  { id: 502, disposition: '4+kk', floor: 5, area: 105.2, terrace: 22.3, status: 'Prodáno', price: 12800000 },
  { id: 301, disposition: '1+kk', floor: 3, area: 42.1, terrace: 5.0, status: 'Volný', price: 4250000 },
  { id: 403, disposition: '3+kk', floor: 4, area: 82.9, terrace: 18.1, status: 'Rezervace', price: 8100000 },
];

const dispositions = ['Vše', '1+kk', '2+kk', '3+kk', '4+kk'];
const statuses = ['Vše', 'Volný', 'Rezervace', 'Prodáno'];

export default function ApartmentTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [filterDisposition, setFilterDisposition] = useState('Vše');
  const [filterStatus, setFilterStatus] = useState('Vše');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'area' | 'floor'>('price');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let result = [...apartments];
    if (filterDisposition !== 'Vše') result = result.filter((a) => a.disposition === filterDisposition);
    if (filterStatus !== 'Vše') result = result.filter((a) => a.status === filterStatus);
    if (searchQuery) {
      result = result.filter(
        (a) => a.disposition.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toString().includes(searchQuery)
      );
    }
    result.sort((a, b) => (sortAsc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]));
    return result;
  }, [filterDisposition, filterStatus, searchQuery, sortBy, sortAsc]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(n);

  const statusBadge = (status: Apartment['status']) => {
    const map = {
      Volný: { cls: 'bg-sage/10 text-forest border-sage/25', icon: <Check size={11} /> },
      Rezervace: { cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: <ChevronDown size={11} /> },
      Prodáno: { cls: 'bg-red-50 text-red-600 border-red-200', icon: <X size={11} /> },
    };
    const m = map[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${m.cls}`}>
        {m.icon}
        {status}
      </span>
    );
  };

  const handleSort = (col: 'price' | 'area' | 'floor') => {
    if (sortBy === col) setSortAsc(!sortAsc);
    else { setSortBy(col); setSortAsc(true); }
  };

  return (
    <section id="apartments" ref={ref}>
      <div className="bg-cream/25 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-10 lg:mb-14"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-sage mb-3">
              Volitelný modul pro klienty
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-earth mb-4 leading-tight">
              Dynamický ceník a správa stavů
            </h2>
            <p className="text-sm lg:text-base text-earth-light">
              Náš systém dokáže zobrazovat dostupnost jednotek v reálném čase. Ceník plně přizpůsobíme 
              a můžeme jej obousměrně napojit na váš stávající CRM systém (např. Raynet či Pipedrive).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Search */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-lighter" />
                <input
                  type="text"
                  placeholder="Hledat byt (ukázka)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 border border-cream/40 text-sm text-earth placeholder:text-earth-lighter focus:outline-none focus:ring-2 focus:ring-forest/15 focus:border-forest/25 transition-all"
                />
              </div>

              {/* Disposition */}
              <div className="flex gap-0.5 p-1 rounded-xl bg-white/50 border border-cream/40">
                {dispositions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDisposition(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      filterDisposition === d ? 'bg-forest text-white shadow-sm' : 'text-earth-light hover:bg-cream/50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Status */}
              <div className="flex gap-0.5 p-1 rounded-xl bg-white/50 border border-cream/40">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      filterStatus === s ? 'bg-forest text-white shadow-sm' : 'text-earth-light hover:bg-cream/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden border border-cream/40 bg-white/40">
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream/40">
                      {[
                        { label: 'Byt', sortable: false },
                        { label: 'Dispozice', sortable: false },
                        { label: 'Patro', sortable: true, col: 'floor' as const },
                        { label: 'Výměra', sortable: true, col: 'area' as const },
                        { label: 'Stav', sortable: false },
                        { label: 'Cena', sortable: true, col: 'price' as const, align: 'right' },
                      ].map((h, i) => (
                        <th
                          key={i}
                          onClick={h.sortable ? () => handleSort(h.col!) : undefined}
                          className={`text-${h.align ?? 'left'} text-[11px] font-bold uppercase tracking-wider text-earth-lighter px-5 py-3.5 ${
                            h.sortable ? 'cursor-pointer hover:text-earth transition-colors select-none' : ''
                          }`}
                        >
                          {h.label}
                          {h.sortable && (
                            <ChevronDown
                              size={12}
                              className={`inline ml-1 transition-transform ${
                                sortBy === h.col ? 'text-forest' : 'text-earth-lighter'
                              } ${sortBy === h.col && !sortAsc ? 'rotate-180' : ''}`}
                            />
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((apt, i) => (
                      <motion.tr
                        key={apt.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-cream/20 last:border-b-0 hover:bg-cream/15 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-3.5 text-sm font-bold text-earth">#{apt.id}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-earth">{apt.disposition}</td>
                        <td className="px-5 py-3.5 text-sm text-earth-light">{apt.floor}. NP</td>
                        <td className="px-5 py-3.5 text-sm text-earth-light">
                          {apt.area} m²{' '}
                          <span className="text-earth-lighter text-xs">+ {apt.terrace} m²</span>
                        </td>
                        <td className="px-5 py-3.5">{statusBadge(apt.status)}</td>
                        <td className="px-5 py-3.5 text-right text-sm font-display font-bold text-forest">
                          {fmt(apt.price)}
                        </td>
                      </motion.tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-sm text-earth-lighter">
                          Žádné byty neodpovídají filtru.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile (App-style Swipe Cards) */}
              <div className="md:hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {filtered.map((apt, i) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="snap-center shrink-0 w-[85vw] max-w-[320px] bg-white rounded-[24px] p-5 shadow-sm border border-cream/40 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-earth-lighter">Byt #{apt.id}</span>
                          <div className="text-2xl font-display font-extrabold text-earth leading-none mt-1">{apt.disposition}</div>
                        </div>
                        {statusBadge(apt.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-cream/20 rounded-xl p-3 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-earth-lighter uppercase tracking-wider font-bold mb-0.5">Výměra</span>
                          <span className="text-sm font-bold text-earth">{apt.area} m²</span>
                          {apt.terrace > 0 && <span className="text-[10px] text-earth-light">+{apt.terrace} ter.</span>}
                        </div>
                        <div className="bg-cream/20 rounded-xl p-3 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-earth-lighter uppercase tracking-wider font-bold mb-0.5">Patro</span>
                          <span className="text-sm font-bold text-earth">{apt.floor}. NP</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-auto pt-4 border-t border-cream/30">
                        <span className="text-[11px] text-earth-lighter uppercase font-bold tracking-widest">Cena vč. DPH</span>
                        <div className="text-[22px] font-display font-extrabold text-forest leading-none">{fmt(apt.price)}</div>
                      </div>
                    </motion.div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="w-full p-8 text-center text-sm text-earth-lighter">
                      Žádné byty neodpovídají filtru.
                    </div>
                  )}
                </div>
                {/* Swipe indikátor pro mobily */}
                {filtered.length > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-forest/20"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-forest/20"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-earth-lighter ml-2">Swipe</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-earth-lighter text-center mt-5">
              Tato data běží nad naším API a lze s nimi interagovat i přímo z 3D modelu budovy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
