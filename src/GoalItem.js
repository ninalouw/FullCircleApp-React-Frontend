import React from 'react';
import GoalBarChart from './BarChart';

const GoalItem = (props) => {
  return (
      <li>
        <div className="row">
          <div className="col-xs-4">
         <h3>{props.goal.name}</h3>
         <button type="button"
                 onClick={props.editGoalModalFunction}
                 data-index={props.goal.id}
                 className="btn btn-outline-info btn-sm"> Edit </button>
         <button type="button"
                 onClick={props.checkFunction}
                 data-index={props.goal.id}
                 className="btn btn-outline-info btn-sm"
               value="Done"> Done </button>
         <button type="button"
                onClick={props.openDeleteModalFunction}
                data-index={props.goal.id}
                className="btn btn-outline-danger btn-sm"> Delete </button>
         </div>
         <div className="col-xs-8" style={{ maxWidth: '260px' }}>
           <GoalBarChart count={props.goal.count_consecutive_days_completed}
                    name={props.goal.name}
                  maxDayCount={props.maxDayCount} />
         </div>
       </div>
    </li>
  );
};
export default GoalItem;
