/** A puska közös építőelemei: egy modul egy Lap, azon belül Dobozok. */
export function Lap({ szam, cim, gyerekek }) {
  return (
    <section className="puska-lap mb-8 rounded-2xl border border-[color:var(--keret)] bg-white p-5 sm:p-7 print:mb-0 print:rounded-none print:border-0 print:p-0">
      <div className="flex items-center gap-3 border-b-2 border-naracs-500 pb-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-naracs-500 text-[15px] font-bold text-white print:bg-black">
          {szam}
        </span>
        <h2 className="text-xl font-bold text-petrol-900">{cim}</h2>
        <span className="ml-auto text-[11px] tracking-[0.16em] text-petrol-400 uppercase">
          Matematika · puska
        </span>
      </div>
      <div className="mt-4 grid min-w-0 gap-x-6 gap-y-3 sm:grid-cols-2">
        {gyerekek}
      </div>
    </section>
  );
}

export function Doboz({ cim, children, szeles = false }) {
  return (
    <div
      className={`min-w-0 rounded-xl border border-petrol-100 bg-petrol-50/50 px-3.5 py-2.5 print:border-gray-300 print:bg-white ${szeles ? "sm:col-span-2" : ""}`}
    >
      <p className="text-[10.5px] font-bold tracking-[0.14em] text-naracs-700 uppercase">
        {cim}
      </p>
      <div className="proza szamok mt-1 text-[13px] leading-snug text-petrol-800 [&_.katex-display]:my-1 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:max-w-full">
        {children}
      </div>
    </div>
  );
}
