const MiniInfo = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-white px-3 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
};

export default MiniInfo;
