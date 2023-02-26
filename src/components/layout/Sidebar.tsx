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

type Props = {};

const Sidebar = (props: Props) => {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          className={active === 'inbox' ? 'active' : undefined}
          data-testid="inbox"
          onClick={() => {
            setActive('inbox');
            setSelectedProject && setSelectedProject('INBOX');
          }}
        >
          <FaInbox /> <span>Inbox</span>
        </li>
        <li
          className={active === 'today' ? 'active' : undefined}
          data-testid="today"
          onClick={() => {
            setActive('today');
            setSelectedProject && setSelectedProject('TODAY');
          }}
        >
          <FaRegCalendar /> <span>Today</span>
        </li>
        <li
          className={active === 'next_7' ? 'active' : undefined}
          data-testid="next_7"
          onClick={() => {
            setActive('next_7');
            setSelectedProject && setSelectedProject('NEXT_7');
          }}
        >
          <FaRegCalendarAlt /> <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
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
