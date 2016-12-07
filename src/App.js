import React, { Component } from 'react';
import $ from 'jquery';
import GoalList from './GoalList';
import apiKeys from './apiKeys';
import Modal from 'react-modal';

const BASE_URL = 'http://localhost:3001';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      goals: [],
      // goal: undefined,
      goal: "",
      createModalIsOpen: false,
      editModalIsOpen: false,
      //add to state, goalBeingEdited...
      goalBeingEdited: null
    };
    this.setGoalAsDone = this.setGoalAsDone.bind(this);
    this.setGoalDeleted = this.setGoalDeleted.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  // Editing our Goals - we will write this function when our editGoal Modal is ready
    editGoal(event){
    //gets called on click
    //will get goalIndex
    const goalIndex = parseInt(event.target.getAttribute('data-index'));
    //will make modal appear, and render goal in editGoalModal

    //on submit, call AJAX post to API
    //this.postEditedGoals(goalIndex)
    }

  //Functions for our Modal
  openModal () {
    this.setState({createModalIsOpen: true});
  }
  openEditModal (event) {
    const goalIndex = parseInt(event.target.getAttribute('data-index'));
    //filter func, to find one being edited
    //we set it to true
    //set one being edited to be oneyoufoundwithfilter (like tempGoals)
    //will also setState goalBeingEdited:oneyoufoundwithfilter
    //but problem is it will return you an array with one object, but we just want the object

    this.setState({editModalIsOpen: true});
    console.log('Open edit modal', goalIndex);//WE KNOW ID OF ONE TO EDIT
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = 'rgb(27, 179, 133)';
  }

  closeModal () {
    this.setState({createModalIsOpen: false});
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
        <div className= "GoalModal">
          <button onClick={this.openModal}>New Goal</button>
          <Modal
            isOpen={this.state.createModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <p ref="subtitle">Create a new goal</p>
            <form>
              <p>Goal:</p>
              <input />
              <p>Minutes:</p>
              <input />
              <div>
              <button>Create</button>
              <button onClick={this.closeModal}>Close</button>
              </div>
            </form>
          </Modal>
        </div>

        <div className= "editGoalModal">
          <Modal
            isOpen={this.state.editModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <p ref="subtitle">Edit goal</p>
            <form>
              {/* //when modal is not open this will throw an error, so we want an if,
              //if we have found goal/clicked edit, then render this stuff
              //like var content in react-demo */}
              {/* <p>Goal:{this.goalBeingEdited.name} </p> */}
              <p>Goal:</p>
              <input />
              <p>Minutes:</p>
              <input />
              <div>
              <button>Create</button>
              <button onClick={this.closeModal}>Close</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
