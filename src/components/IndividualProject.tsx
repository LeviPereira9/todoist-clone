//React
import { useState } from 'react';

//Icons
import { FaTrashAlt } from 'react-icons/fa';

//Context Hooks
import {
  useProjectsValue,
  useSelectedProjectValue,
} from '../hooks/useContexts';

//Delete Hook
import { useDeleteProject } from '../hooks/useDeleteProject';

//Types
import { Projects } from '../types/myType';

const IndividualProject = ({project}: {project:Projects}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  //Contexts Hooks
  const { projects, setProjects } = useProjectsValue();
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();

  //Del Hook
  const { loadingDel, errorDel, deleteProject } = useDeleteProject();

  const handleDeleteProject = (docId: string) => {
    deleteProject(docId);
    setProjects && setProjects([...projects]);
    setSelectedProject && setSelectedProject('inbox');
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        role="button"
        onClick={() => {
          setShowConfirm(!showConfirm);
        }}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => {
                  project.docId && handleDeleteProject(project.docId);
                }}
              >
                Delete
              </button>
              <span
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default IndividualProject;
