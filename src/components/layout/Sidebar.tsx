//React
import { useState } from "react";

// Icons
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

//Context Hooks
import { useSelectedProjectValue } from "../../hooks/useContexts";
import Projects from "./Projects";

type Props = {};


const Sidebar = (props: Props) => {

  const { selectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  
  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li className="inbox" data-testid="inbox">
          <FaInbox /> <span>Inbox</span>
        </li>
        <li className="today" data-testid="today">
          <FaRegCalendar /> <span>Today</span>
        </li>
        <li className="next_7" data-testid="next_7">
          <FaRegCalendarAlt /> <span>Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects/>}</ul>
      { showProjects && <Projects/>}
    </div>
  );
};

export default Sidebar;
