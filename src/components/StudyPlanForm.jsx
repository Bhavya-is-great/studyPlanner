import { useContext } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import studyContext from "../context/studyContext";

const defaultForm = {
  name: "",
  priority: "High",
  subject: "Other",
  customSubject: "",
  duration: "",
  note: "",
};

const StudyPlanForm = ({ onCreatePlan }) => {
  const { setItem } = useContext(studyContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultForm,
  });

  const selectedSubject = watch("subject");

  const onSubmit = (form) => {
    const trimmedCustomSubject = form.customSubject.trim();

    const finalSubject =
      form.subject === "Other" ? trimmedCustomSubject || "Other" : form.subject;

    setItem({
      name: form.name.trim() || "Untitled Study Session",
      subject: finalSubject,
      duration: String(form.duration).trim() || "0",
      note: form.note.trim(),
      priority: form.priority,
    });

    reset(defaultForm);
    onCreatePlan?.();
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Task title">
          <input
            type="text"
            placeholder="Revise recursion patterns"
            className="input-shell"
            {...register("name", {
              required: "Task title is required",
              validate: (value) =>
                value.trim().length > 0 || "Task title is required",
            })}
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          ) : null}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Priority">
            <select className="input-shell" {...register("priority")}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </Field>

          <Field label="Subject">
            <select className="input-shell" {...register("subject")}>
              <option>DSA</option>
              <option>Web Dev</option>
              <option>DBMS</option>
              <option>OS</option>
              <option>Other</option>
            </select>
          </Field>
        </div>

        {selectedSubject === "Other" ? (
          <Field label="If subject is Other">
            <input
              type="text"
              placeholder="Type custom subject"
              className="input-shell"
              {...register("customSubject", {
                validate: (value) =>
                  selectedSubject !== "Other" || value.trim().length > 0 || "Custom subject is required",
              })}
            />
            {errors.customSubject ? (
              <p className="mt-2 text-sm text-red-600">{errors.customSubject.message}</p>
            ) : null}
          </Field>
        ) : null}

        <Field label="Planned minutes">
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="90"
            className="input-shell"
            {...register("duration", {
              required: "Planned minutes are required",
              validate: (value) =>
                String(value).trim().length > 0 || "Planned minutes are required",
              min: {
                value: 15,
                message: "Planned minutes must be at least 15",
              },
              max: {
                value: 1440,
                message: "Planned minutes cannot be more than 24 hours",
              },
            })}
          />
          {errors.duration ? (
            <p className="mt-2 text-sm text-red-600">{errors.duration.message}</p>
          ) : null}
        </Field>

        <Field label="Notes">
          <textarea
            rows="4"
            placeholder="Chapter names, goals, reminders..."
            className="input-shell resize-none"
            {...register("note", {
              required: "Notes are required",
              validate: (value) =>
                value.trim().length > 0 || "Notes are required",
              maxLength: {
                value: 180,
                message: "Notes cannot be more than 180 characters",
              },
            })}
          />
          {errors.note ? (
            <p className="mt-2 text-sm text-red-600">{errors.note.message}</p>
          ) : null}
          <p className="mt-2 text-xs text-slate-500">
            Keep the description within 180 characters.
          </p>
        </Field>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Create Plan
          </button>
          <button
            type="button"
            onClick={() => reset(defaultForm)}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default StudyPlanForm;
