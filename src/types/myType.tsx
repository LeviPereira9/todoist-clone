type projectsType = {
  id?:string;
  name: string;
  projectId: string;
  userId: string;
};

type tasksType = {
  id?:string;
  archived: boolean;
  date: string;
  projectId: string;
  task: string;
  userId: string;
};

export type { tasksType, projectsType };
