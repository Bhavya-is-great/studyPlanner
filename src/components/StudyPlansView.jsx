import { useContext } from "react";
import QueueItem from "./QueueItem";
import StudyCard from "./StudyCard";
import TimeRow from "./TimeRow";
import studyContext from "../context/studyContext";

const StudyPlansView = () => {
  const { studySys, deleteItem, updateItem, weeklyStudySummary, priorityCounts } = useContext(studyContext);

  const handleToggleComplete = (item) => {
    if (item.completion) return;

    const today = new Date();
    const completedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    updateItem({
      ...item,
      completion: true,
      completedDate,
    });
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            See plans
          </p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-900">
            Your study cards
          </h3>
        </div>

        {studySys.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {studySys.map((item) => (
              <StudyCard
                key={item.id}
                item={item}
                onDelete={deleteItem}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] bg-white/70 p-8 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <p className="text-lg font-semibold text-slate-900">No plans yet</p>
            <p className="mt-2 text-sm text-slate-600">
              Create your first study plan from the Make Plan tab.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Time studied
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Weekly summary
          </h3>

          <div className="mt-6 space-y-4">
            {weeklyStudySummary.map((item) => (
              <TimeRow
                key={item.day}
                day={item.day}
                time={item.time}
                width={item.width}
                isToday={item.isToday}
              />
            ))}
          </div>
        </section>

        <section>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Priority split
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Queue overview
          </h3>

          <div className="mt-6 space-y-3">
            <QueueItem label="High priority" count={`${priorityCounts.high} tasks`} dot="bg-red-500" />
            <QueueItem label="Medium priority" count={`${priorityCounts.medium} tasks`} dot="bg-amber-500" />
            <QueueItem label="Low priority" count={`${priorityCounts.low} tasks`} dot="bg-emerald-500" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default StudyPlansView;
