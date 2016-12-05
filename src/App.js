import React, { Component } from 'react';
import $ from 'jquery';
import GoalList from './GoalList';
import apiKeys from './apiKeys';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      goals: [],
      // goal: undefined,
      goal: ""
      //we add concept of editedGoal to state
      // editedGoal: null
    };
    this.setGoalAsDone = this.setGoalAsDone.bind(this);
    this.setGoalDeleted = this.setGoalDeleted.bind(this);
  }

  //when the app component is first loaded on the page,
  //we will make an ajax request to fetch goals
  componentWillMount () {
    this.getGoals();
  }

//this function is used to set goals as done on change of checkbox
  setGoalAsDone (event) {
    const goalIndex = parseInt(event.target.getAttribute('data-index'));
    const currentlyChecked = event.target.getAttribute('checked');
    let tempGoals = this.state.goals;
    tempGoals = tempGoals.map(
      (goal) => {
        if (goal.id === goalIndex) {
          goal.done = true;
        }
        return goal;
      }
    );

    this.setState({ goals: tempGoals });
    this.postCheckedGoals(goalIndex);
  }

//this function deletes a goal
  setGoalDeleted (event) {
    const goalIndex = parseInt(event.target.getAttribute('data-index'));
    let tempGoals = this.state.goals;
    tempGoals = tempGoals.filter(
      (goal) => {
        //return !(goal.id === goalIndex);
        if (goal.id === goalIndex) {
          return false;
        } else {
          return true;
        }
      }
    );

    this.setState({ goals: tempGoals });
    this.postRemovedGoals(goalIndex);
  }

  // //Ajax post to API when goal is checked, this func is called
  //by setGoalAsDone func
  postCheckedGoals (goalIndex) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${goalIndex}`,
      method: 'POST',
      //in future you could put done: false
      data: { done: true },
      success: function (goal) {
        // do nothing
        console.log('Successfully posted to Database!');
      },
      error: function () {
        console.log("Could not post goals!");
      }
    });
  }

  postRemovedGoals (goalIndex) {

  }

//we go straight to get goals. Goals here is goal_list, but we are passing it as 'goals' in our JSON (see Rails app goal_list action).
  getGoals () {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals`,
      headers: { Authorization: apiKeys.GoalsApp },
      success: function (goals) {
        //once we receive the goals from our server,
        //we store it in the state
        this.setState({ goals: goals });
        //this func is called asynchronously
        //we must bind(this) to be able to use this.setState
      }.bind(this)
    });
  }

  // this gets the goal for our GoalItem component - it fills up the edit form modal
  // we will then do a function edit
  // getGoal (id) {
  //   $.ajax({
  //     url: `${BASE_URL}/api/v1/goals/${id}`,
  //     success: function (goal) {
  //       //once we receive the questions from our server,
  //       //we store it in the state
  //       this.setState({ goal: goal });
  //       //this func is called asynchronously
  //       //we must bind(this) to be able to use this.setState
  //     }.bind(this)
  //   });
  // }

// Editing our Goals - we will write this function when our editGoal Modal is ready
  // editGoal(){
  //
  // }

 //if a new goal is created, we then want to post and show all of the Goals again.
 //we will get back to this once we have made the NewGoalForm component.
  // postGoals (goalParams) {
  //   $.ajax({
  //     url: `${BASE_URL}/api/v1/goals`,
  //     data: { goal: goalParams },
  //     method: 'POST',
  //     success: function (response) {
  //       //if the post succeeds, reload the list of Goals
  //       this.getGoals();
  //     }.bind(this)
  //   });
  // }

  render () {
    return (
      <div >
       <GoalList
         goals={this.state.goals}
         checkFunction={this.setGoalAsDone}
         deleteFunction={this.setGoalDeleted}/>
         {/* When we have set up editedGoal Modal, this is the component that
         must be aware of editedGoal, but this is for the future */}
          {/* <NewGoalForm goal={this.state.editedGoal} */}
      </div>
    );
  }
}

export default App;
