import React from 'react';
//import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeInput from 'react-time-input';

class OvertimeEdit extends React.Component {
  constructor () {
    super();

    this.handleOvertimeDateChange = this.handleOvertimeDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleFreeTimeOnDateChange = this.handleFreeTimeOnDateChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleOvertimeDateChange(date) {
    let temp = Object.assign({}, this.props.data);
    temp.date = date ? date.format('DD.MM.YYYY') : null;
    this.props.updateData(temp);
  }

  handleStartTimeChange(val) {
    let temp = Object.assign({}, this.props.data);
    temp.startTime = val;
    this.props.updateData(temp);
  }

  handleEndTimeChange(val) {
    let temp = Object.assign({}, this.props.data);
    temp.endTime = val;
    this.props.updateData(temp);
  }

  handleFreeTimeOnDateChange(date) {
    let temp = Object.assign({}, this.props.data);
    temp.freeTimeOn = date ? date.format('DD.MM.YYYY') : null;
    this.props.updateData(temp);
  }

  handleCommentChange(event) {
    let temp = Object.assign({}, this.props.data);
    temp.comment = event.target.value;
    this.props.updateData(temp);
  }

  render() {
    return (
      <div className="editFormWrapper">
        <div className="editForm">
          <div className="formRow">
            <span>Date:</span>
            <DatePicker selected={this.props.data.date ? moment(this.props.data.date,'DD.MM.YYYY') : ''} onChange={this.handleOvertimeDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" placeholderText="Date" required="true" />
          </div>
          <div className="formRow">
            <span>Start Time:</span>
            <TimeInput initTime={this.props.data.startTime} onTimeChange={this.handleStartTimeChange} />
          </div>
          <div className="formRow">
            <span>End Time:</span>
            <TimeInput initTime={this.props.data.endTime} onTimeChange={this.handleEndTimeChange} />
          </div>
          <div className="formRow">
            <span>Free date on:</span>
            <DatePicker selected={this.props.data.freeTimeOn ? moment(this.props.data.freeTimeOn,'DD.MM.YYYY') : ''} onChange={this.handleFreeTimeOnDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" isClearable="true" placeholderText="Free time on" />
          </div>
          <div className="formRow">
            <span>Comment:</span>
            <textarea id="comment" rows="6" value={this.props.data.comment} onChange={this.handleCommentChange} />
          </div>
        </div>
        <div className="footer">
          <button onClick={() => this.props.saveHandler(this.props.data)}>Save</button>
          <button onClick={this.props.cancelHandler}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default OvertimeEdit;
