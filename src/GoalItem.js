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
              checked={props.goal.done ? "checked" : ""}
              className="btn btn-outline-info btn-sm"
            value="Done"/>
      <button type="button"
             onClick={props.deleteFunction}
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

// {/* <li>
//     // {goal.name}
//     {/*  */}
// </li> */}
// onClick={this.editGoal}
// onClick={this.deleteGoal}
// onChange={this.doneGoal}
// <button type="checkbox" className="btn btn-outline-primary btn-sm" data-toggle="button" aria-pressed="false" autoComplete="off"> Done Button </button> //
             // data-index={goal.id} //
