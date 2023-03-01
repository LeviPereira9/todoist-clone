//React
import { useState } from 'react';

//Icons
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';

//Moment
import moment from 'moment';

//Firebase
import { db, collection } from '../firebase';
import { CollectionReference, addDoc } from 'firebase/firestore';

//Context Hooks
import { useSelectedProjectValue } from '../hooks/useContexts';

//Types
import { tasksType, AddTaskProps } from '../types/myType';
import ProjectsOverlay from './ProjectsOverlay';
import TaskDate from './TaskDate';

const AddTask: React.FC<AddTaskProps> = ({
  showAddTaskMain = true,
  showShouldMain = false,
  showQuickAddTask = false,
  setShowQuickAddTask,
}) => {
  // Controle de nova tarefa.
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');

  // Controle de DOM.
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  //Context Hook.
  const { selectedProject } = useSelectedProjectValue();

  // Adiciona a nova tarefa no firebase.
  const addTask = async () => {
    //Se o projeto for do context ou de argumento passado!
    const projectId = project || selectedProject;
    let collatedDate = '';

    //Define a data.
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    //TypeRef. :P
    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    //Corpo da nova tarefa.
    const addBody: tasksType = {
      archived: false,
      projectId,
      task,
      date: collatedDate || taskDate,
      userId: 'wTJzDkRGVShfYX9L',
    };

    //Se tudo tiver certo, dalé e reseta tudo.
    if (task && projectId) {
      await addDoc(tasksCollectionRef, addBody);
      setTask('');
      setProject('');
      setShowMain(false);
      setShowProjectOverlay(false);
    }
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        //Add Task em baixo das Tasks
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          role="button"
          tabIndex={0}
          aria-label="Adicionar nova tarefa"
          onClick={() => {
            setShowMain(!showMain);
          }}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {/* Painel do addTask do Header */}
      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              {/* Botão de cancelar do addTask do Header */}
              <div data-testid="quick-add-task add-task__quickContainer">
                <h2 className="add-task__main-header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  role='button'
                  tabIndex={0}
                  aria-label="Cancelar criação da tarefa"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask && setShowQuickAddTask(false);
                  }}
                  //onKeyDown={()=>{...}}
                >
                  X
                </span>
              </div>
            </>
          )}
          {/* Função de escolher o projeto */}
          <ProjectsOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          {/* Função de escolher a data */}
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          {/* Escolher o nome da nova tarefa -g */}
          <input
            type="text"
            className="add-task__content"
            data-testid="add-task-content"
            aria-label="Definir nome da nova tarefa"
            value={task}
            onChange={e => {
              setTask(e.target.value);
            }}
          />
          {/* Botão do AddTask da lista de tasks */}
          <button
            className="add-task__submit"
            data-testid="add-task"
            type="button"
            tabIndex={0}
            aria-label="Criar nova tarefa"
            onClick={() => {
              showQuickAddTask
                ? (() => {
                    addTask();
                    setShowQuickAddTask(false);
                  })()
                : addTask();
            }}
            //onKeyDown={()=>{...}}
          >
            Add Task
          </button>
          {/* Cancel do mesmo sujeito. */}
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              role="button"
              tabIndex={0}
              aria-label="Cancelar criação de nova tarefa"
              onClick={() => {
                setShowMain(!showMain);
                setShowProjectOverlay(!showProjectOverlay);
              }}
              //onKeyDown={()=>{...}}
            >
              Cancel
            </span>
          )}
          {/* Escolher o projeto - Dispara o ProjectOverlay */}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            role="button"
            tabIndex={0}
            aria-label="Escolher projeto da tarefa"
            onClick={() => {
              setShowProjectOverlay(!showProjectOverlay);
            }}
            //onKeyDown={()=>{...}}
          >
            <FaRegListAlt />
          </span>
          {/* Escolher a data - Dispara o TaskDate */}
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            role="button"
            tabIndex={0}
            aria-label="Escolher data da tarefa"
            onClick={() => {
              setShowTaskDate(!showTaskDate);
            }}
            //onKeyDown={()=>{...}}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
