//React
import { useState } from 'react';

// Icons
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

//Context Hooks
import { useSelectedProjectValue } from '../../hooks/useContexts';
import AddProject from '../AddProject';
import ProjectsBar from './ProjectsBar';


const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={active === 'inbox' ? 'active' : undefined}
          data-testid="inbox"
          role="button"
          tabIndex={0}
          arial-label="Mostrar tarefas na caixa de entrada"
          onClick={() => {
            setActive('inbox');
            setSelectedProject && setSelectedProject('INBOX');
          }}
          onKeyDown={() => {
            setActive('inbox');
            setSelectedProject && setSelectedProject('INBOX');
          }}
        >
          <FaInbox /> <span>Inbox</span>
        </li>
        <li
          className={active === 'today' ? 'active' : undefined}
          data-testid="today"
          aria-label="Mostrar tarefas para hoje"
          role="button"
          tabIndex={0}
          onClick={() => {
            setActive('today');
            setSelectedProject && setSelectedProject('TODAY');
          }}
          onKeyDown={() => {
            setActive('today');
            setSelectedProject && setSelectedProject('TODAY');
          }}
        >
          <FaRegCalendar /> <span>Today</span>
        </li>
        <li
          className={active === 'next_7' ? 'active' : undefined}
          data-testid="next_7"
          tabIndex={0}
          role="button"
          aria-label="Mostrar tarefas para próxima semana"
          onClick={() => {
            setActive('next_7');
            setSelectedProject && setSelectedProject('NEXT_7');
          }}
          onKeyDown={() => {
            setActive('next_7');
            setSelectedProject && setSelectedProject('NEXT_7');
          }}
        >
          <FaRegCalendarAlt /> <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Mostar/Esconder projetos"
        role="button"
        tabIndex={0}
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => {
          setShowProjects(!showProjects);
        }}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <ProjectsBar />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
};

export default Sidebar;
