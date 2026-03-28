import StudyPlanForm from "./StudyPlanForm";
import StudyPlansView from "./StudyPlansView";

const PlannerDashboard = ({ activeView, setActiveView }) => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      {activeView === "make-plan" ? (
        <StudyPlanForm onCreatePlan={() => setActiveView("see-plans")} />
      ) : (
        <StudyPlansView />
      )}
    </section>
  );
};

export default PlannerDashboard;
