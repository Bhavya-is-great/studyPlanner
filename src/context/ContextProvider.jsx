import { useState } from "react";
import studyContext from "./studyContext";
import { nanoid } from "nanoid";

const ContextProvider = ({ children }) => {
    const [studySys, setStudySys] = useState(
        JSON.parse(localStorage.getItem("study") || "[]")
    );

    const getCurrentDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    const weekDays = [
        { key: 0, label: "Sun" },
        { key: 1, label: "Mon" },
        { key: 2, label: "Tue" },
        { key: 3, label: "Wed" },
        { key: 4, label: "Thu" },
        { key: 5, label: "Fri" },
        { key: 6, label: "Sat" },
    ];

    // helpers 
    const sanitizeStudy = ({
        id,
        name,
        subject,
        duration,
        note,
        date,
        priority,
        completion,
        completedDate
    }) => {
        return {
            id: id,
            name: name,
            subject: subject,
            duration: duration,
            note: note || "",
            date: date,
            priority: priority,
            completion: Boolean(completion),
            completedDate: completedDate || null
        }
    }

    const parseDurationToMinutes = (value = "") => {
        const normalized = String(value).toLowerCase().trim();

        if (!normalized) return 0;
        if (/^\d+$/.test(normalized)) return Number(normalized);

        const hours = normalized.match(/(\d+)\s*h/);
        const minutes = normalized.match(/(\d+)\s*m/);

        const totalHours = hours ? Number(hours[1]) * 60 : 0;
        const totalMinutes = minutes ? Number(minutes[1]) : 0;

        return totalHours + totalMinutes;
    };

    const formatMinutes = (minutes) => {
        if (!minutes) return "0m";

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (!hours) return `${remainingMinutes}m`;
        if (!remainingMinutes) return `${hours}h`;

        return `${hours}h ${remainingMinutes}m`;
    };

    const parseStudyDate = (value) => {
        if (!value) return null;

        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            const [year, month, day] = value.split("-").map(Number);
            const isoLikeDate = new Date(year, month - 1, day);
            if (!Number.isNaN(isoLikeDate.getTime())) return isoLikeDate;
        }

        const directDate = new Date(value);
        if (!Number.isNaN(directDate.getTime())) return directDate;

        const dateParts = value.split(/[/-]/).map(Number);
        if (dateParts.length === 3) {
            const [month, day, year] = dateParts;
            const fallbackDate = new Date(year, month - 1, day);
            if (!Number.isNaN(fallbackDate.getTime())) return fallbackDate;
        }

        return null;
    };

    // CRUD
    const setItem = (data) => {
        if (data?.id !== undefined) return updateItem(data);
        let obj = sanitizeStudy({ ...data, date: getCurrentDateString(), id: nanoid() });
        const nextItems = [...studySys, obj];
        setStudySys(nextItems);
        localStorage.setItem("study", JSON.stringify(nextItems));
        return obj;
    }

    const deleteItem = (id) => {
        let temp = studySys.filter((obj) => obj.id !== id);
        setStudySys(temp);
        localStorage.setItem("study", JSON.stringify(temp));
    }

    const updateItem = (data) => {
        let obj = sanitizeStudy(data);
        let temp = studySys.map((elem) => {
            if (elem.id !== obj.id) return elem;
            else return obj;
        });

        setStudySys(temp);
        localStorage.setItem("study", JSON.stringify(temp));
        return obj;
    }

    const getWeeklyStudySummary = () => {
        const todayKey = new Date().getDay();
        const minutesByDay = weekDays.reduce((accumulator, day) => {
            accumulator[day.key] = 0;
            return accumulator;
        }, {});

        studySys.forEach((item) => {
            if (!item.completion) return;

            const parsedDate = parseStudyDate(item.completedDate || item.date);
            if (!parsedDate) return;

            const day = parsedDate.getDay();
            if (minutesByDay[day] === undefined) return;

            minutesByDay[day] += parseDurationToMinutes(item.duration);
        });

        const maxMinutes = Math.max(...Object.values(minutesByDay), 0);

        return weekDays.map((day) => {
            const totalMinutes = minutesByDay[day.key];
            const width = totalMinutes === 0 || !maxMinutes
                ? "0%"
                : `${(totalMinutes / maxMinutes) * 100}%`;

            return {
                day: day.label,
                time: formatMinutes(totalMinutes),
                width,
                isToday: day.key === todayKey,
            };
        });
    };

    const getPriorityCounts = () => {
        return {
            high: studySys.filter((item) => item.priority === "High").length,
            medium: studySys.filter((item) => item.priority === "Medium").length,
            low: studySys.filter((item) => item.priority === "Low").length,
        };
    };

    const value = {
        setItem,
        deleteItem,
        updateItem,
        studySys,
        weeklyStudySummary: getWeeklyStudySummary(),
        priorityCounts: getPriorityCounts(),
    };

    return (
        <studyContext.Provider value={value}>
            {
                children
            }
        </studyContext.Provider>
    )
}

export default ContextProvider;
