// Context Setup
import { createContext, useContext, useState } from 'react';

//Types
import { ContextProviderProps, SelectedProjects } from '../types/myType';

export const SelectedProjectContext = createContext<SelectedProjects>({} as SelectedProjects);

export const SelectedProjectContextProvider = ({children}: ContextProviderProps) => {

    const [selectedProject, setSelectedProject] = useState("INBOX");

    return (
        <SelectedProjectContext.Provider value={{selectedProject, setSelectedProject}}>
            {children}
        </SelectedProjectContext.Provider>
    )
    
}

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
