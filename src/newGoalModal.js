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
    <div>
      {
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.onAfterOpen}
        onRequestClose={props.onRequestClose}
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
          <button onClick={props.onRequestClose}>Close</button>
          </div>
        </form>
      </Modal>
    }
    </div>
  );
};

// close (event){
//   event.preventDefault()
//
//   if (this.props.closeModal) {
//     this.props.closeModal()
//   }
// }

export default NewGoalModal;
