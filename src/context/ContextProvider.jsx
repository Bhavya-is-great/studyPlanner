import { useState } from "react";
import studyContext from "./studyContext";
import { nanoid } from "nanoid";

const ContextProvider = ({ children }) => {

    const [studySys, setStudySys] = useState(JSON.parse(localStorage.getItem("study") || "[]"));

    // helpers 
    const sanitizeStudy = ({ id, name, subject, duration, date, priority }) => {
        return {
            id: id,
            name: name,
            subject: subject,
            duration: duration,
            date: date,
            priority: priority
        }
    }


    // CRUD
    const setItem = (data) => {
        console.log("runnning")
        if (data?.id !== undefined) return updateItem(data);
        let obj = sanitizeStudy({ ...data, date: new Date().toLocaleDateString(), id: nanoid() });
        setStudySys([...studySys, obj]);
        localStorage.setItem("study", JSON.stringify([...setStudySys, obj]));
    }

    const deleteItem = (id) => {
        let temp = studySys.filter((obj) => { obj.id !== id });
        setStudySys(temp);
        localStorage.setItem("study", temp);
    }

    const updateItem = (data) => {
        let obj = sanitizeStudy({ ...data, date: new Date().toLocaleDateString() });
        let temp = studySys.map((elem) => {
            if (elem.id !== obj.id) return elem;
            else return obj;
        });

        setStudySys(temp);
        localStorage.setItem("study", temp);
    }

    // return State
    const items = () => {
        return {
            setItem,
            deleteItem,
            studySys
        }
    }

    return (
        <studyContext.Provider value={items()}>
            {
                children
            }
        </studyContext.Provider>
    )
}

export default ContextProvider;