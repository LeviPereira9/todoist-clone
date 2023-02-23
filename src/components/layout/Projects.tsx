//React
import { useState } from "react";

//Context Hooks
import { useProjectsValue, useSelectedProjectValue } from "../../hooks/useContexts";


const Projects = ({activeValue = null}) => {
    const [active, setActive] = useState(activeValue);
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    
  return (
    <div>Projects</div>
  )
}

export default Projects