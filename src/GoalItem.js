import React from 'react';
import FontAwesome from 'react-fontawesome';

function GoalItem ({ goal }) {
  // this must be moved to app
  //
  // deleteGoal() {
  //     // ajax post to API to delete
  //     // onDone, delete this question from local array
  // }

  return (
    <div className="GoalItem">
      <li>
      <h3>{goal.name}</h3>
      <button type="button" className="btn btn-outline-info btn-sm">Edit Button </button>
      <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="button" aria-pressed="false" autoComplete="off"> Done Button </button>
      <button type="button" className="btn btn-outline-danger btn-sm"> Delete Button </button>
      <FontAwesome
        className="fa fa-link"
        name="link"
        size="2x"
      />
    </li>
    </div>
  );
}

export default GoalItem;

// {/* <li>
//     // {goal.name}
//     {/*  */}
// </li> */}
// onClick={this.editGoal}
// onClick={this.deleteGoal}
// onChange={this.doneGoal}
