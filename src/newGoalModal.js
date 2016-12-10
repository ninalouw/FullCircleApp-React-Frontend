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

const NewGoalModal = (props) => {
  return (
    <Modal
      newGoal={props.newGoal}
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p>Create a new goal</p>
      <form onSubmit={props.onSubmit}>
        <p>Goal:</p>
        <input
          onChange={props.onNameChange}/>
        <p>Minutes:</p>
        <input
         onChange={props.onMinutesChange} />
        <div>
        <button>Create</button>

        </div>
      </form>
      <input type="submit" value="Close" onClick={props.onRequestClose}/>
    </Modal>
  );
};

export default NewGoalModal;
