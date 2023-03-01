//React
import { useState } from 'react';

//Firebase
import { db, collection } from '../firebase';
import { CollectionReference, addDoc } from 'firebase/firestore';

//helpers
import { generatePushId } from '../helpers/collated_tasks';

// Context Hooks
import { useProjectsValue } from '../hooks/useContexts';

//Types
import { Projects } from '../types/myType';

const AddProject = ({ shouldShow = false }) => {
  //Controle de novo Projeto
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  //ID random.
  const projectId = generatePushId();

  //Context Hook.
  const { projects, setProjects } = useProjectsValue();

  //Adiciona um novo projeto no firebase.
  const addProject = async () => {
    if (projectName) {
      //Type Ref.
      const projectsCollectionRef: CollectionReference<Projects> = collection(
        db,
        'projects',
      ) as CollectionReference<Projects>;

      //Corpo do novo projeto!
      const addBody = {
        projectId: projectId(),
        name: projectName,
        userId: 'wTJzDkRGVShfYX9L',
      };

      //Foi.
      await addDoc(projectsCollectionRef, addBody);

      //Reseta tudo!!
      setProjects && setProjects([...projects]);
      setProjectName('');
      setShow(false);
    }
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        //Container do "forms" addProject da sidebar.
        <div className="add-project__input">
          <input
            className="add-project__name"
            data-testid="add-project-name"
            type="text"
            aria-label="Adicionar nome do novo projeto"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            data-testid="add-project-submit"
            type="button"
            tabIndex={0}
            aria-label="Criar o projeto"
            onClick={() => {
              addProject();
            }}
            //onKeyDown={()=>{addProject();}}
          >
            Add Project
          </button>
          <span
            className="add-project__cancel"
            data-testid="hide-project-overlay"
            role="button"
            tabIndex={0}
            aria-label="Cancelar criação do projeto"
            onClick={() => {
              setShow(false);
            }}
            //onKeyDown={()=>{setShow(false);}}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      {/* Botão que abre o conteúdo acima. */}
      <span
        className="add-project__text"
        data-testid="add-project-action"
        role="button"
        tabIndex={0}
        aria-label="Adicionar um projeto"
        onClick={() => {
          setShow(!show);
        }}
        //onKeyDown={()=>{setShow(!show);}}
      >
        Add Project
      </span>
    </div>
  );
};

export default AddProject;
