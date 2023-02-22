type Projects = {
  id?:string;
  name: string;
  projectId: string;
  userId: string;
};

type ProjectsArr = {
  projects: Projects[];
  setProjects?: React.Dispatch<React.SetStateAction<Projects[]>>;
}

type tasksType = {
  id?:string;
  archived: boolean;
  date: string;
  projectId: string;
  task: string;
  userId: string;
};

export type { tasksType, Projects, ProjectsArr };
