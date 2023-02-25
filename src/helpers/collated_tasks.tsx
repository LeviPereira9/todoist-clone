//Types
import { CollatedTasks, Projects } from "../types/myType";

//Constants
import  { collatedTasks }  from "../constants/MY_CONSTANTS";

const collatedTasksExist = (selectedProject: string) => {
  return !!collatedTasks.find(task => task.key === selectedProject);
}

const getTitle = (projects: Projects[], projectId:string) => {
  const project = projects.find(project => project.projectId === projectId);
  return project ? project.name : "Project Not Found";
}

const getCollatedTitle = (collatedTasks:CollatedTasks[], key: string) => {
  const colletadTitle = collatedTasks.find(colletadTitle => colletadTitle.key === key);
  return colletadTitle? colletadTitle.name : "Project Not Found";
}


const generatePushId = (() => {
  const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'

  const lastRandChars:number[] = [];

  return function() {

    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (let c = 7; c >= 0; c++){
      timeStampChars[c] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    
    let id = timeStampChars.join('');

    for(let c = 0; c < 12; c++){
      id += PUSH_CHARS.charAt(lastRandChars[c]);
    }
    
    return id;
  };

})

export { collatedTasksExist, getTitle, getCollatedTitle }
