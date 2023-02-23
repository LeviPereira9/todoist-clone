// Context Setup
import { createContext, useContext } from 'react';

// Projects Hook
import { useProjects } from '../hooks/useProjects';

import { ProjectsArr, ContextProviderProps } from '../types/myType';

export const ProjectsContext = createContext<ProjectsArr>({} as ProjectsArr);

export const ProjectsContextProvider = ({ children }: ContextProviderProps) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);
