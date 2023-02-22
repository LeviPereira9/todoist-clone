import { FaPizzaSlice } from 'react-icons/fa';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className='settings__add' data-testid="quick-add-task-action" role="button">+</li>
            <li className='settings__darkmode' data-testid="dark-mode-action" role="button">
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
