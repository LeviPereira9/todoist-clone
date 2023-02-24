//React
import { useState } from 'react';

//Context Hooks
import {
  useProjectsValue,
  useSelectedProjectValue,
} from '../../hooks/useContexts';
import IndividualProject from '../IndividualProject';


const ProjectsBar = ({ activeValue = null }) => {
  const [active, setActive] = useState<string|null>(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  console.log(projects);

  
  return (
    <>
      {projects &&
        projects.map(project => (
          <li
            key={project.projectId}
            className={active === project.projectId ? 'active sidebar__project' : 'sidebar__project'}
            data-doc-id={project.docId}
            data-testid="project-action"
            role="button"
            onClick={()=>{
                setActive(project.projectId);
                setSelectedProject && setSelectedProject(project.projectId);
            }}
          ><IndividualProject project={project} /></li>
        ))}
    </>
  );
};

export default ProjectsBar;
