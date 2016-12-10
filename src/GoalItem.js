import React from 'react';
import FontAwesome from 'react-fontawesome';

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
      <FontAwesome
        className="fa fa-link"
        name="fa fa-link"
        size="2x"
      />
    </li>
    </div>
  );
};
export default GoalItem;
