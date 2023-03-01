//Context Hooks
import { useProjectsValue } from '../hooks/useContexts';

//Types
import { ProjectsOverlayProps } from '../types/myType';

const ProjectsOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}: ProjectsOverlayProps) => {
  const { projects } = useProjectsValue();

  return (
    <>
      {projects && showProjectOverlay && (
        <div className="project-overlay" data-testid="project-overlay">
          <ul className="project-overlay__list">
            {projects.map(project => (
              <li
                key={project.projectId}
                data-testid="project-overlay-action"
                role="button"
                tabIndex={0}
                aria-label="Escolha o projeto a atribuir a task"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                //onKeyDown={()=>{...}}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProjectsOverlay;
