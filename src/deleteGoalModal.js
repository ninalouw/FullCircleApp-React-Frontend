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

const DeleteGoalModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      goalBeingEdited={props.goalBeingEdited}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
    <form onSubmit={props.onSubmit}>
      <p>Are you sure you want to delete this goal?</p>
      <input type="submit" value="Submit/Confirm"/>
   </form>
    </Modal>
  );
};

export default DeleteGoalModal;
