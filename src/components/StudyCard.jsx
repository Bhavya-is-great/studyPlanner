import MiniInfo from "./MiniInfo";
import PriorityBadge from "./PriorityBadge";
import { formatMinutes, parseDurationToMinutes } from "../utils/studyStats";

const StudyCard = ({ item, onDelete, onToggleComplete }) => {
  return (
    <article className="rounded-[1.5rem] bg-white/70 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.subject}</p>
          <h4 className="mt-1 text-xl font-semibold text-slate-900">
            {item.name}
          </h4>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>

      <p className="mt-4 line-clamp-3 min-h-[4.5rem] break-words text-sm leading-6 text-slate-600">
        {item.note || "No notes added yet."}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MiniInfo label="Planned" value={formatMinutes(parseDurationToMinutes(item.duration))} />
        <MiniInfo label="Date" value={item.date} />
      </div>

      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onToggleComplete(item)}
          disabled={item.completion}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            item.completion
              ? "cursor-not-allowed bg-emerald-100 text-emerald-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          {item.completion ? "Completed" : "Mark Complete"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="ml-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default StudyCard;
