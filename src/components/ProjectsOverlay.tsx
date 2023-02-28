//Context Hooks
import { useProjectsValue } from '../hooks/useContexts';

type ProjectsOverlayProps = {
  setProject: React.Dispatch<React.SetStateAction<string>>;
  showProjectOverlay: boolean;
  setShowProjectOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

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
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
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
