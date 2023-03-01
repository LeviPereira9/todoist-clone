//React
import { useEffect, useState } from 'react';

//Components
import Checkbox from '../Checkbox';

//Types

//Hooks
import { useTasks } from '../../hooks/useTasks';

//Custom Hooks
import {
  useSelectedProjectValue,
  useProjectsValue,
} from '../../hooks/useContexts';

//Helpers
import {
  collatedTasksExist,
  getCollatedTitle,
  getTitle,
} from '../../helpers/collated_tasks';

//Consntas
import { collatedTasks } from '../../constants/MY_CONSTANTS';
import AddTask from '../AddTask';

const Tasks = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject);
  }

  if (selectedProject && collatedTasksExist(selectedProject)) {
    projectName = getCollatedTitle(collatedTasks, selectedProject);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name" aria-label="nome do projeto">
        {projectName}
      </h2>

      <ul className="tasks__list">
        {tasks &&
          tasks.map(task => (
            <li key={`${task.id}`}>
              <Checkbox id={task.id as string} taskDesc={task.task} />
              <span aria-label="descrição da task">{task.task}</span>
            </li>
          ))}
      </ul>

      <AddTask setShowQuickAddTask={setShowQuickAddTask} />
    </div>
  );
};

export default Tasks;
