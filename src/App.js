import React, { Component } from 'react';
import $ from 'jquery';
import GoalList from './GoalList';
import apiKeys from './apiKeys';
import NewGoalModal from './newGoalModal';
import EditGoalModal from './editGoalModal';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      goals: [],
      goal: "",
      newModalIsOpen: false,
      editModalIsOpen: false,
      goalBeingEdited: null
    };
    this.setGoalAsDone = this.setGoalAsDone.bind(this);
    this.setGoalDeleted = this.setGoalDeleted.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //when the app component is first loaded on the page,
  //we will make an ajax request to fetch goals
  componentWillMount () {
    this.getGoals();
  }


//this function is used to set goals as done on change of checkbox
  setGoalAsDone (event) {
    const goalIndex = parseInt(event.target.getAttribute('data-index'), 10);
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
    const goalIndex = parseInt(event.target.getAttribute('data-index'), 10);
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

  //Functions for our Modal
  openModal () {
    this.setState({ newModalIsOpen: true });
  }

//this func gets called on click of edit button, it gets the goal clicked by id
//and then populates the editGoalModal with the information
  openEditModal (event) {
    const goalIndex = parseInt(event.target.getAttribute('data-index'), 10);
    let tempGoals = this.state.goals;
    tempGoals = tempGoals.filter(
      (goal) => {
        if (goal.id === goalIndex) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.setState({ goalBeingEdited: tempGoals[0] });
    this.setState({ editModalIsOpen: true });
    console.log('Open edit modal', goalIndex);//  we know the id of the one we want to edit
  }

  afterOpenModal () {
    // this.refs.subtitle.style.color = 'rgb(27, 179, 133)';
  }

  closeModal () {
    this.setState({ newModalIsOpen: false, editModalIsOpen: false });
  }

  //functions to deal with changing and submitting input of editGoalModal
  handleChange (event) {
    this.setState({ valueGoalNameEdit: event.target.valueGoalNameEdit });
  }

  handleSubmit (event) {
    console.log('Edited goal submitted');
    event.preventDefault();
    //on submit, call AJAX post to API
    const goalIndex = parseInt(event.target.getAttribute('data-index'), 10);
    this.postEditedGoals(goalIndex);
  }

  //AJAX REQUESTS
  //Ajax post to API when goal is checked, this func is called
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

  // //Ajax delete to API when delete button clicked, this func is called
  //by setGoalDeleted func
  postRemovedGoals (goalIndex) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${goalIndex}`,
      method: 'DELETE',
      success: function (goal) {
        console.log('Successfully deleted goal from Database!');
      },
      error: function () {
        console.log("Could not delete goal!");
      }
    });
  }

   //Ajax POST to API when submit button of editGoalModal clicked, this func is called
  //by handleSubmit func
  postEditedGoals (goalIndex) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${goalIndex}`,
      method: 'POST',
      success: function (goal) {
        console.log('Successfully posted edited goal to Database!');
      },
      error: function () {
        console.log("Could not post edited goal!");
      }
    });
  }

//we use AJAX get to get initial goals on page
  getGoals () {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals`,
      headers: { Authorization: apiKeys.GoalsApp },
      success: function (goals) {
        this.setState({ goals: goals });
      }.bind(this)
    });
  }

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
      <div className = "AppBody">
        <div className="GoalList">
       <GoalList
         goals={this.state.goals}
         checkFunction={this.setGoalAsDone}
         deleteFunction={this.setGoalDeleted}
         editGoalModalFunction={this.openEditModal}/>
         {/* When we have set up editedGoal Modal, this is the component that
         must be aware of editedGoal, but this is for the future */}
          {/* <NewGoalForm goal={this.state.editedGoal} */}
        </div>
        <div className= "newGoalModal">
          <button onClick={this.openModal}>New Goal</button>
          <NewGoalModal
            isOpen={this.state.newModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal} />
       </div>
       <EditGoalModal
         goalBeingEdited={this.state.goalBeingEdited}
         isOpen={this.state.editModalIsOpen}
         onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default App;
