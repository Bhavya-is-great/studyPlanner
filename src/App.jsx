import studyContext from "./context/studyContext";
import { useContext } from "react";

const App = () => {
  let data = useContext(studyContext);
  data.setItem();
  return (
    <div>
    </div>
  )
}

export default App;