// Context Setup
import { createContext, useContext } from 'react';

// Projects Hook
import { useProjects } from '../hooks/useProjects';

import { ProjectsState, ContextProviderProps } from '../types/myType';

export const ProjectsContext = createContext<ProjectsState>({} as ProjectsState);

export const ProjectsContextProvider = ({ children }: ContextProviderProps) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
