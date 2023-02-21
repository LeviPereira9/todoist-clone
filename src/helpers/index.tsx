import { collatedTasks } from "../constants";

const collatedTasksExist = (selectedProject: string | number) => {
  return !!collatedTasks.find(task => task.key === selectedProject);
}

export { collatedTasksExist }
