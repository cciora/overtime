import React from 'react';
import Modal from 'react-modal';

const popupStyle = {
  content : {
    top: '60px',
    width: '500px'
  }
};

class EditPopup extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.popupVisibility} style={popupStyle} contentLabel="Overtime Popup" >
        <div className="editPopup">
          <label for="date_input">Date:</label>
          <input type="text" id="date_input" value={this.props.popupData.date} />

          <label for="start_time">Start time:</label>
          <input type="text" id="start_time" value={this.props.popupData.startTime} />

          <label for="end_time">End time:</label>
          <input type="text" id="end_time" value={this.props.popupData.endTime} />

          <label for="date_input">Free date on:</label>
          <input type="text" id="free_date_on" value={this.props.popupData.freeTimeOn} />

          <label for="comment">Comment:</label>
          <textarea id="comment" rows="6">{this.props.popupData.comment}</textarea>

          <div className="popupButtonsArea">
            <button onClick={() => this.props.savePopupHandler()}>Save</button>
            <button onClick={() => this.props.cancelPopupHandler()}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default EditPopup;
