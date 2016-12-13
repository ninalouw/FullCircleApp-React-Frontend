import React from 'react';
import GoalBarChart from './BarChart';

const GoalItem = (props) => {
  return (
    <div className="GoalItem">
      <li>
      <h3>{props.goal.name}</h3>
      <button type="button"
              onClick={props.editGoalModalFunction}
              data-index={props.goal.id}
              className="btn btn-outline-info btn-sm"> Edit </button>
      <input type="button"
              onClick={props.checkFunction}
              data-index={props.goal.id}
              className="btn btn-outline-info btn-sm"
            value="Done"/>
      <button type="button"
             onClick={props.openDeleteModalFunction}
             data-index={props.goal.id}
             className="btn btn-outline-danger btn-sm"> Delete </button>
    </li>
    <div className="GoalBarChart">
      <GoalBarChart count={props.goal.count_consecutive_days_completed}
                name={props.goal.name}
              maxDayCount={props.maxDayCount} />
    </div>
    </div>
  );
};
export default GoalItem;
