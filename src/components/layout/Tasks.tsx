//Components
import Checkbox from "../Checkbox";

//Types
import { tasksType } from "../../types/myType";

//Hooks
import { useTasks } from "../../hooks/useTasks";

const Tasks = () => {
    const { tasks } = useTasks("1");

    console.log(tasks);
    
    let projectName = '';
    
  return <div className="tasks" data-testid="tasks">
    <h2 data-testid="project-name">{projectName}</h2>

    <ul className="tasks__list">
        {tasks ? tasks.map(task=>(
            <li key={`${task.id}`}>
                <Checkbox id={task.id as string}/>
                <span>{task.task}</span>
            </li>
        )) : false}
    </ul>
  </div>;
};

export default Tasks;
