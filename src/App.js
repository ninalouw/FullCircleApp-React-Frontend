import React, { Component } from 'react';
import $ from 'jquery';
import GoalList from './GoalList';
// import GoalItem from './GoalItem';
import apiKeys from './apiKeys';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      goals: [],
      goal: undefined,
      //we add concept of editedGoal to state
      editedGoal: null
    };
  }

  //when the app component is first loaded on the page,
  //we will make an ajax request to fetch goals
  componentWillMount () {
    this.getGoals();
  }
//we go straight to get goals. Goals here is goal_list, but we are passing it as 'goals' in our JSON (see Rails app goal_list action).
  getGoals () {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals`,
      headers: { "Authorization": apiKeys.GoalsApp },
      success: function (goals) {
        //once we receive the questions from our server,
        //we store it in the state
        this.setState({ goals: goals });
        //this func is called asynchronously
        //we must bind(this) to be able to use this.setState
      }.bind(this)
    });
  }

// Editing our Goals - we will write this function when our editGoal Modal is ready
  // editGoal(){
  //
  // }

  //this gets the goal for our GoalItem component - it fills up the edit form modal
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
        <h1> Welcome to React</h1>
       <GoalList
         goals={this.state.goals}/>

         {/* When we have set up editedGoal Modal, this is the component that
         must be aware of editedGoal, but this is for the future */}
          {/* <NewGoalForm goal={this.state.editedGoal} */}
      </div>
    );
  }
}

export default App;
