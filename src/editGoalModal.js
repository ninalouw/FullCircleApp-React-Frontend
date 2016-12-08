import React from 'react';
import Modal from 'react-modal';

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

const EditGoalModal = (props) => {
  return (
  <div className= "editGoalModal">
    {
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
        {/* <p>Goal:{this.state.goalBeingEdited.name} </p> */}
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
  };
  </div>
  );
};

export default EditGoalModal;
