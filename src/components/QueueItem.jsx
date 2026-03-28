const QueueItem = ({ label, count, dot }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/75 px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${dot}`} />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <span className="text-sm font-semibold text-slate-900">{count}</span>
    </div>
  );
};

export default QueueItem;
