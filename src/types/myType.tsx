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

type AddTaskProps = {
  showAddTaskMain?: boolean;
  showShouldMain?: boolean;
  showQuickAddTask?: boolean;
  setShowQuickAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}

type CollatedTasks = {
  key: string;
  name:string;
};

type ContextProviderProps = {
  children: ReactNode;
};

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProjectsOverlayProps = {
  setProject: React.Dispatch<React.SetStateAction<string>>;
  showProjectOverlay: boolean;
  setShowProjectOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

type TaskDateProps = {
  setTaskDate: React.Dispatch<React.SetStateAction<string>>;
  showTaskDate: boolean;
  setShowTaskDate: React.Dispatch<React.SetStateAction<boolean>>;
};

export type {
  tasksType,
  AddTaskProps,
  Projects,
  ProjectsState,
  ContextProviderProps,
  SelectedProjectsState,
  CollatedTasks,
  HeaderProps,
  ProjectsOverlayProps,
  TaskDateProps
};
