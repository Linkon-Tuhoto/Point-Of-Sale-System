
function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-[#172B4D]">
            {value}
          </h3>
        </div>

        <div className="rounded-lg bg-[#EEF2F6] p-3 text-[#355C7D]">
          <Icon size={21} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default StatCard;
