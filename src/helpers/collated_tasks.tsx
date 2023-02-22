import { collatedTasks } from "../constants/MY_CONSTANTS";

const collatedTasksExist = (selectedProject: string | number) => {
  return !!collatedTasks.find(task => task.key === selectedProject);
}

export { collatedTasksExist }
