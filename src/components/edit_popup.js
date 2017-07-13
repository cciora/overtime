import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeInput from 'react-time-input';

const popupStyle = {
  content : {
    top: '60px',
    width: '500px'
  }
};

class EditPopup extends React.Component {
  constructor () {
    super();

    this.handleOvertimeDateChange = this.handleOvertimeDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleFreeTimeOnDateChange = this.handleFreeTimeOnDateChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleOvertimeDateChange(date) {
    let temp = Object.assign({}, this.props.popupData);
    temp.date = date ? date.format('DD.MM.YYYY') : null;
    this.props.updatePopupData(temp);
  }

  handleStartTimeChange(val) {
    let temp = Object.assign({}, this.props.popupData);
    temp.startTime = val;
    this.props.updatePopupData(temp);
  }

  handleEndTimeChange(val) {
    let temp = Object.assign({}, this.props.popupData);
    temp.endTime = val;
    this.props.updatePopupData(temp);
  }

  handleFreeTimeOnDateChange(date) {
    let temp = Object.assign({}, this.props.popupData);
    temp.freeTimeOn = date ? date.format('DD.MM.YYYY') : null;
    this.props.updatePopupData(temp);
  }

  handleCommentChange(event) {
    let temp = Object.assign({}, this.props.popupData);
    temp.comment = event.target.value;
    this.props.updatePopupData(temp);
  }

  render() {
    return (
      <Modal isOpen={this.props.popupVisibility} style={popupStyle} contentLabel="Overtime Popup" >
        <table className="overtimeForm">
          <tbody>
          <tr>
            <td width="30%">Date:</td>
            <td>
              <DatePicker selected={this.props.popupData.date ? moment(this.props.popupData.date,'DD.MM.YYYY') : ''} onChange={this.handleOvertimeDateChange}
                className="overtimeDatePicker" dateFormat="DD.MM.YYYY" placeholderText="Date" required="true" />
            </td>
          </tr>
          <tr>
            <td>Start time:</td>
            <td>
              <TimeInput initTime={this.props.popupData.startTime} onTimeChange={this.handleStartTimeChange} />
            </td>
          </tr>
          <tr>
            <td>End time:</td>
            <td>
              <TimeInput initTime={this.props.popupData.endTime} onTimeChange={this.handleEndTimeChange} />
            </td>
          </tr>
          <tr>
            <td>Free date one:</td>
            <td>
              <DatePicker selected={this.props.popupData.freeTimeOn ? moment(this.props.popupData.freeTimeOn,'DD.MM.YYYY') : ''} onChange={this.handleFreeTimeOnDateChange}
                className="overtimeDatePicker" dateFormat="DD.MM.YYYY" isClearable="true" placeholderText="Free time on" />
            </td>
          </tr>
          <tr>
            <td>Comment:</td>
            <td>
              <textarea id="comment" rows="6" value={this.props.popupData.comment} onChange={this.handleCommentChange} />
            </td>
          </tr>
          <tr>
            <td colSpan="2" >
              <button onClick={() => this.props.savePopupHandler(this.props.popupData)}>Save</button>
              <button onClick={() => this.props.cancelPopupHandler()}>Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}

export default EditPopup;
