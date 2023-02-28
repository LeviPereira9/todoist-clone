//React
import { useState } from 'react';

//icon
import { FaPizzaSlice } from 'react-icons/fa';


//Components
import AddTask from '../AddTask';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

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
              onClick={()=>{
                setShouldShowMain(!shouldShowMain);
                setShowQuickAddTask(!showQuickAddTask);
              }}
            >
              +
            </li>
            <li
              className="settings__darkmode"
              data-testid="dark-mode-action"
              role="button"
              onClick={()=>{
                setDarkMode(!darkMode);
              }}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
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
