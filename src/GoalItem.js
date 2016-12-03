import React from 'react';

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
          {goal.name}
          {/* <a onClick={this.editGoal}>Edit Button </a>
          <a onChange={this.doneGoal}> Done Button </a>
          <a onClick={this.deleteGoal}> Delete Button </a> */}
      </li>
    </div>
  );
}

export default GoalItem;
