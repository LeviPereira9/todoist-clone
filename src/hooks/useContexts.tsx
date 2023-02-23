//Context Setup
import { useContext } from "react";

//Context Body
import { ProjectsContext } from "../contexts/ProjectsContext";
import { SelectedProjectContext } from "../contexts/SelectedProjectContext";

//Context Functions
const useProjectsValue = () => useContext(ProjectsContext);
const useSelectedProjectValue = () => useContext(SelectedProjectContext);


export {useProjectsValue, useSelectedProjectValue};