//Moment
import moment from 'moment';

//Icons
import { FaFire, FaRegPaperPlane, FaSun } from 'react-icons/fa';

type TaskDateProps = {
  setTaskDate: React.Dispatch<React.SetStateAction<string>>;
  showTaskDate: boolean;
  setShowTaskDate: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskDate = ({
  setTaskDate,
  showTaskDate,
  setShowTaskDate,
}: TaskDateProps) => {
  return (
    <>
      {showTaskDate && (
        <div className="task-date" data-testid="task-date-overlay">
          <ul className="task-date__list">
            <li
              data-testid="task-date-today"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().format('DD/MM/YYYY'));
              }}
            >
              <span>
                <FaFire/>
              </span>
              <span>Today</span>
            </li>
            <li
              data-testid="task-date-tomorrow"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              }}
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </li>
            <li
              data-testid="task-date-next-week"
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              }}
            >
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next Week</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TaskDate;
