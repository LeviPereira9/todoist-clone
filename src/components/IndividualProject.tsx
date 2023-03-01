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

const IndividualProject = ({ project }: { project: Projects }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  //Contexts Hooks
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  //Del Hook
  const { deleteProject } = useDeleteProject();

  //Deleta
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
        aria-label="Deletar o projeto"
        tabIndex={0}
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
                aria-label="Confirmação de exclusão de projeto"
                onClick={() => {
                  project.docId && handleDeleteProject(project.docId);
                }}
                //onKeyDown={()=>{...}}
              >
                Delete
              </button>
              <span
                role="button"
                aria-label="Cancelar exclusão do projeto"
                tabIndex={0}
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
                //onKeyDown={()=>{...}}
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
