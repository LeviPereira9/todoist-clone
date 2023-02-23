// Context Setup
import { createContext, useState } from 'react';

//Types
import { ContextProviderProps, SelectedProjectsState } from '../types/myType';

export const SelectedProjectContext = createContext<SelectedProjectsState>({} as SelectedProjectsState);

export const SelectedProjectContextProvider = ({children}: ContextProviderProps) => {

    const [selectedProject, setSelectedProject] = useState("INBOX");

    return (
        <SelectedProjectContext.Provider value={{selectedProject, setSelectedProject}}>
            {children}
        </SelectedProjectContext.Provider>
    )
    
}
