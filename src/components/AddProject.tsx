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
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();

  const { setProjects } = useProjectsValue();

  const addProject = async () => {
    if (projectName) {
      const projectsCollectionRef: CollectionReference<Projects> = collection(
        db,
        'projects',
      ) as CollectionReference<Projects>;

      const addBody = {
        projectId: projectId(),
        name: projectName,
        userId: 'wTJzDkRGVShfYX9L',
      };

      await addDoc(projectsCollectionRef, addBody);

      setProjects && setProjects([]);
      setProjectName('');
      setShow(false);
    }
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input">
          <input
            type="text"
            className="add-project__name"
            data-testid="add-project-name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Name your project"
          />
          <button
            type="button"
            className="add-project__submit"
            data-testid="add-project-submit"
            onClick={() => {
              addProject();
            }}
          >
            Add Project
          </button>
          <span
            className="add-project__cancel"
            data-testid="hide-project-overlay"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        className="add-project__text"
        data-testid="add-project-action"
        onClick={() => {
          setShow(!show);
        }}
      >Add Project</span>
    </div>
  );
};

export default AddProject;
