//Types
import { CollatedTasks, Projects } from '../types/myType';

//Constants
import { collatedTasks } from '../constants/MY_CONSTANTS';

const collatedTasksExist = (selectedProject: string) => {
  return !!collatedTasks.find(task => task.key === selectedProject);
};

const getTitle = (projects: Projects[], projectId: string) => {
  const project = projects.find(project => project.projectId === projectId);
  return project ? project.name : 'Project Not Found';
};

const getCollatedTitle = (collatedTasks: CollatedTasks[], key: string) => {
  const colletadTitle = collatedTasks.find(
    colletadTitle => colletadTitle.key === key,
  );
  return colletadTitle ? colletadTitle.name : 'Project Not Found';
};

const generatePushId = (): (() => string) => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const generateRandomChars = (): string => {
    const randomChars = new Array(12);
    for (let i = 0; i < 12; i++) {
      randomChars[i] = PUSH_CHARS.charAt(
        Math.floor(Math.random() * PUSH_CHARS.length)
      );
    }
    return randomChars.join('');
  };

  return (): string => {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (let i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    const id = timeStampChars.join('') + generateRandomChars();

    return id;
  };
};


export { collatedTasksExist, getTitle, getCollatedTitle, generatePushId };
