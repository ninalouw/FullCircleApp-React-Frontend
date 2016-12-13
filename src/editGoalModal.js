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
    <Modal
      isOpen={props.isOpen}
      goalBeingEdited={props.goalBeingEdited}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p>Edit goal</p>
      <form onSubmit={props.onSubmit}>
        <label>
          Goal name:
        </label>
        <input value={props.goalBeingEdited && props.goalBeingEdited.name}
              onChange={props.onNameChange} />
        <label>
          Minutes:
        </label>
        <input value={props.goalBeingEdited && props.goalBeingEdited.minutes}
              onChange={props.onMinutesChange} />
        <input type="submit" value="Submit"/>
      </form>
      <input type="submit" value="Close" onClick={props.onRequestClose}/>
    </Modal>
  );
};

export default EditGoalModal;
