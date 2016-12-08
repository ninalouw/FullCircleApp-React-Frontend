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
      isOpen={props.isOpen}
      goalBeingEdited={props.goalBeingEdited}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p ref="subtitle">Edit goal</p>
      <form>
      <p>Goal:{props.goalBeingEdited && props.goalBeingEdited.name} </p>
        <p>Minutes: { props.goalBeingEdited && props.goalBeingEdited.minutes }</p>
        <div>
        <button>Create</button>
        <button onClick={props.onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  }
  </div>
  );
};

export default EditGoalModal;
