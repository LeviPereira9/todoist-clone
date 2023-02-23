// Icons
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

type Props = {};

const Sidebar = (props: Props) => {
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
      <ul className="sidebar__projects">Projects will be here!</ul>
      Add Project Component Here!!
    </div>
  );
};

export default Sidebar;
