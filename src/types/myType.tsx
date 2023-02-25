import { ReactNode } from 'react';

type Projects = {
  docId?: string;
  name: string;
  projectId: string;
  userId: string;
  key?:string
};

type ProjectsState = {
  projects: Projects[];
  setProjects?: React.Dispatch<React.SetStateAction<Projects[]>>;
};

type SelectedProjectsState = {
  selectedProject: string;
  setSelectedProject?: React.Dispatch<React.SetStateAction<string>>;
};

type tasksType = {
  id?: string;
  archived: boolean;
  date: string;
  projectId: string;
  task: string;
  userId: string;
};

type CollatedTasks = {
  key: string;
  name:string;
};

type ContextProviderProps = {
  children: ReactNode;
};


export type {
  tasksType,
  Projects,
  ProjectsState,
  ContextProviderProps,
  SelectedProjectsState,
  CollatedTasks
};
