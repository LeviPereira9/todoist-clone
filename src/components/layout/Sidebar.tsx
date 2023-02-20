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
    <div className="sideBar" data-testid="sidebar">
      <ul className="sideBar__generic">
        <li>
          <FaInbox /> <span>Inbox</span>
        </li>
        <li>
          <FaRegCalendar /> <span>Today</span>
        </li>
        <li>
          <FaRegCalendarAlt /> <span>Next 7 days</span>
        </li>
      </ul>
      <div className="sideBar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sideBar__projects">Projects will be here!</ul>
      Add Project Component Here!!
    </div>
  );
};

export default Sidebar;
