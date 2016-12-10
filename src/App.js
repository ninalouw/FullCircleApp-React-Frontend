import React, { Component } from 'react';
import $ from 'jquery';
import GoalList from './GoalList';
import apiKeys from './apiKeys';
import NewGoalModal from './newGoalModal';
import EditGoalModal from './editGoalModal';
import DeleteGoalModal from './deleteGoalModal';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      goals: [],
      goal: "",
      newModalIsOpen: false,
      editModalIsOpen: false,
      deleteModalIsOpen: false,
      goalBeingEdited: null,
      newGoal: ""
    };
    this.setGoalAsDone = this.setGoalAsDone.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEditNameChange = this.handleEditNameChange.bind(this);
    this.handleEditMinutesChange = this.handleEditMinutesChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleNewNameChange = this.handleNewNameChange.bind(this);
    this.handleNewMinutesChange = this.handleNewMinutesChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
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

  //Functions for our Modal
  openModal () {
    this.setState({ newModalIsOpen: true });
  }

  openDeleteModal (event) {
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
    console.log('Open delete modal', goalIndex);
    this.setState({ deleteModalIsOpen: true });
  }

//this func gets called on click of edit button, it gets the goal clicked by id
//and then populates the editGoalModal with the information

//basically, open delete modal should call this.
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
    console.log('Open edit modal', goalIndex);
  }

  afterOpenModal () {
    // this.refs.subtitle.style.color = 'rgb(27, 179, 133)';
  }

  closeModal () {
    this.setState({ newModalIsOpen: false, editModalIsOpen: false, deleteModalIsOpen: false });
  }

  //function to deal with changing and submitting name input of editGoalModal
  handleEditNameChange (event) {
    console.log("trying to change form:", event.target.value);
    const goal = { ...this.state.goalBeingEdited, name: event.target.value };
    this.setState({ goalBeingEdited: goal });
  }
//function to deal with changing and submitting minutes input of editGoalModal
  handleEditMinutesChange (event) {
    console.log("trying to change form:", event.target.value);
    const goal = { ...this.state.goalBeingEdited, minutes: event.target.value };
    this.setState({ goalBeingEdited: goal });
  }

  //function to deal with adding name input of newGoalModal
  handleNewNameChange (event) {
    console.log("trying to change form:", event.target.value);
    const goal = { ...this.state.newGoal, name: event.target.value };
    this.setState({ newGoal: goal });
  }
//function to deal with adding minutes input of newGoalModal
  handleNewMinutesChange (event) {
    console.log("trying to change form:", event.target.value);
    const goal = { ...this.state.newGoal, minutes: event.target.value };
    this.setState({ newGoal: goal });
  }

  //function that handles the submit of the new goal from newGoalModal
  handleNewSubmit (event) {
    console.log('New goal submitted');
    event.preventDefault();
    //on submit, call AJAX post to API
    const newGoal = this.state.newGoal;
    console.log(newGoal);
    this.postNewGoals(newGoal);
  }

  //function that handles the submit of the edited goal from editGoalModal
  handleEditSubmit (event) {
    console.log('Edited goal submitted');
    event.preventDefault();
    //on submit, call AJAX post to API
    const editedGoalId = this.state.goalBeingEdited.id;
    console.log(editedGoalId);
    this.postEditedGoals(editedGoalId);
  }

 //this gets called on confirm of DeleteGoalModal
  handleDeleteSubmit (event) {
    console.log('Delete goal confirmed');
    event.preventDefault();
    const deletedGoalId = this.state.goalBeingEdited.id;
    let tempGoals = this.state.goals;
    tempGoals = tempGoals.filter(
      (goal) => {
        if (goal.id === deletedGoalId) {
          return false;
        } else {
          return true;
        }
      }
    );
    this.setState({ goals: tempGoals });
    console.log(deletedGoalId);
    this.postRemovedGoals(deletedGoalId);
  }

  //AJAX REQUESTS
  //Ajax post to API when goal is checked, this func is called
  //by setGoalAsDone func
  postCheckedGoals (goalIndex) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${goalIndex}`,
      headers: { 'Authorization': apiKeys.GoalsApp },
      method: 'POST',
      data: { done: true },
      success: function (goal) {
        console.log('Successfully posted to Database!');
      },
      error: function () {
        console.log("Could not post goals!");
      }
    });
  }

  // //Ajax delete to API when delete button clicked, this func is called
  //by setGoalDeleted func
  postRemovedGoals (deletedGoalId) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${deletedGoalId}`,
      headers: { 'Authorization': apiKeys.GoalsApp },
      method: 'DELETE',
      success: function (goal) {
        console.log('Successfully deleted goal from Database!');
        this.closeModal();
      }.bind(this),
      error: function () {
        console.log("Could not delete goal!");
      }
    });
  }
   //Ajax POST to API when submit button of editGoalModal clicked, this func is called
  //by handleSubmit func. If successful, this function then calls getGoals and closeModal.
  postEditedGoals (editedGoalId) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals/${editedGoalId}`,
      headers: { 'Authorization': apiKeys.GoalsApp },
      data: { goal: this.state.goalBeingEdited },
      method: 'PATCH',
      success: function (goal) {
        console.log('Successfully posted edited goal to Database!');
        this.getGoals();
        this.closeModal();
      }.bind(this),
      error: function () {
        console.log("Could not post edited goal!");
      }
    });
  }

//we use AJAX get to get initial goals on page
  getGoals () {
    console.log(apiKeys.GoalsApp);
    $.ajax({
      url: `${BASE_URL}/api/v1/goals`,
      headers: { 'Authorization': apiKeys.GoalsApp },
      success: function (goals) {
        this.setState({ goals: goals });
      }.bind(this)
    });
  }

 //if a new goal is created, we then want to post and show all of the Goals again.
 //we will get back to this once we have made the NewGoalForm component.
 // postNewGoals(newGoal)
  postNewGoals (newGoal) {
    $.ajax({
      url: `${BASE_URL}/api/v1/goals`,
      headers: { 'Authorization': apiKeys.GoalsApp },
      data: { goal: newGoal },
      method: 'POST',
      success: function (response) {
        console.log('Successfully posted your new goal');
        //if the post succeeds, reload the list of Goals
        this.getGoals();
        this.closeModal();
      }.bind(this),
      error: function () {
        console.log("Could not post new goal!");
      }
    });
  }

  render () {
    return (
      <div className = "AppBody">
        <div className="GoalList">
       <GoalList
         goals={this.state.goals}
         checkFunction={this.setGoalAsDone}
         deleteFunction={this.setGoalDeleted}
         editGoalModalFunction={this.openEditModal}
         openDeleteModalFunction={this.openDeleteModal}/>
        </div>
        <div className= "newGoalModal">
          <button onClick={this.openModal}>New Goal</button>
          <NewGoalModal
            newGoal={this.state.newGoal}
            isOpen={this.state.newModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            onNameChange={this.handleNewNameChange}
            onMinutesChange={this.handleNewMinutesChange}
            onSubmit={this.handleNewSubmit} />
       </div>
       <EditGoalModal
         goalBeingEdited={this.state.goalBeingEdited}
         isOpen={this.state.editModalIsOpen}
         onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        onNameChange={this.handleEditNameChange}
        onMinutesChange={this.handleEditMinutesChange}
        onSubmit={this.handleEditSubmit} />
      <DeleteGoalModal
        goalBeingEdited={this.state.goalBeingEdited}
        isOpen={this.state.deleteModalIsOpen}
        onAfterOpen={this.afterOpenModal}
       onRequestClose={this.closeModal}
       onSubmit={this.handleDeleteSubmit} />
    </div>
    );
  }
}
export default App;
