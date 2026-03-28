const TimeRow = ({ day, time, width, isToday }) => {
  return (
    <div>
      <div className={`mb-2 flex items-center justify-between text-sm ${isToday ? "font-semibold text-slate-900" : "text-slate-600"}`}>
        <span>{day}{isToday ? " • Today" : ""}</span>
        <span>{time}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default TimeRow;
