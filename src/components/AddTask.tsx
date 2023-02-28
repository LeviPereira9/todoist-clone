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
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(showShouldMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = async () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    const tasksCollectionRef: CollectionReference<tasksType> = collection(
      db,
      'tasks',
    ) as CollectionReference<tasksType>;

    const addBody: tasksType = {
      archived: false,
      projectId,
      task,
      date: collatedDate || taskDate,
      userId: 'wTJzDkRGVShfYX9L',
    };

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
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => {
            setShowMain(!showMain);
          }}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="add-task__main-header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  onClick={() => {
                    setShowMain(!showMain);
                    setShowProjectOverlay(!showProjectOverlay);
                    setShowQuickAddTask &&
                      setShowQuickAddTask(!showQuickAddTask);
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectsOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            type="text"
            className="add-task__content"
            data-testid="add-task-content"
            value={task}
            onChange={e => {
              setTask(e.target.value);
            }}
          />
          <button
            className="add-task__submit"
            data-testid="add-task"
            type="button"
            onClick={() => {
              addTask();
            }}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(!showMain);
                setShowProjectOverlay(!showProjectOverlay);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => {
              setShowProjectOverlay(!showProjectOverlay);
            }}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => {
              setShowTaskDate(!showTaskDate);
            }}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
