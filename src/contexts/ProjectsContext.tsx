// Context Setup
import { createContext, useContext, ReactNode } from 'react'

// Projects Hook
import { useProjects } from '../hooks/useProjects'

import { Projects, ProjectsType } from '../types/myType';

type ProjectsContextProviderProps = {
    children: ReactNode;
  };

export const ProjectsContext = createContext<ProjectsType>({} as ProjectsType);

export const ProjectsContextProvider = ({children} : ProjectsContextProviderProps) => {

    const {projects, setProjects }  = useProjects();
    
    return (
        <ProjectsContext.Provider value={{projects, setProjects}}>
            {children}
        </ProjectsContext.Provider> 
    )
    
}

export const useProjectsValue = () => useContext(ProjectsContext);