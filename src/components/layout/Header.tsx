//React
import { useState } from 'react';

//icon
import { FaPizzaSlice } from 'react-icons/fa';


//Components
import AddTask from '../AddTask';

//Types
import { HeaderProps } from '../../types/myType';

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);


  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li
              className="settings__add"
              data-testid="quick-add-task-action"
              role="button"
              tabIndex={0}
              aria-label="Atalho para adicionar uma nova tarefa"
              onClick={()=>{
                setShouldShowMain(!shouldShowMain);
                setShowQuickAddTask(!showQuickAddTask);
              }}
              //onKeyDown={()=>{...}}
            >
              +
            </li>
            <li
              className="settings__darkmode"
              data-testid="dark-mode-action"
              role="button"
              tabIndex={0}
              aria-label='Ativar/Desativar modo noturno'
              onClick={()=>{
                setDarkMode(!darkMode);
              }}
              //onKeyDown={()=>{...}}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      {/* Container do atalho de adicionar tarefa. */}
      <AddTask
        showAddTaskMain={false}
        showShouldMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

export default Header;
