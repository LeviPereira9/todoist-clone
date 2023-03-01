//Moment
import moment from 'moment';

//Icons
import { FaFire, FaRegPaperPlane, FaSun } from 'react-icons/fa';

import { TaskDateProps } from '../types/myType';

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
              aria-label="Atribuir a data da tarefa para hoje"
              tabIndex={0}
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().format('DD/MM/YYYY'));
              }}
              //onKeyDown={()=>{...}}
            >
              <span>
                <FaFire />
              </span>
              <span>Today</span>
            </li>
            <li
              data-testid="task-date-tomorrow"
              aria-label="Atribuir a data da tarefa para amanhã"
              tabIndex={0}
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              }}
              //onKeyDown={()=>{...}}
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </li>
            <li
              data-testid="task-date-next-week"
              aria-label="Atribuir a data da tarefa para semana que vem"
              tabIndex={0}
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              }}
              //onKeyDown={()=>{...}}
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
