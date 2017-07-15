import React from 'react';
//import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeInput from 'react-time-input';

class OvertimeEdit extends React.Component {
  constructor () {
    super();

    this.state = {
      validationMessage: '',
      data: {
        date : '',
        startTime: '',
        endTime: '',
        freeTimeOn: '',
        comment: ''
      }
    }

    this.handleOvertimeDateChange = this.handleOvertimeDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleFreeTimeOnDateChange = this.handleFreeTimeOnDateChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  handleOvertimeDateChange(date) {
    let temp = Object.assign({}, this.state.data);
    temp.date = date ? date.format('DD.MM.YYYY') : null;
    this.setState({data: temp});
  }

  handleStartTimeChange(val) {
    let temp = Object.assign({}, this.state.data);
    temp.startTime = val;
    this.setState({data: temp});
  }

  handleEndTimeChange(val) {
    let temp = Object.assign({}, this.state.data);
    temp.endTime = val;
    this.setState({data: temp});
  }

  handleFreeTimeOnDateChange(date) {
    let temp = Object.assign({}, this.state.data);
    temp.freeTimeOn = date ? date.format('DD.MM.YYYY') : null;
    this.setState({data: temp});
  }

  handleCommentChange(event) {
    let temp = Object.assign({}, this.state.data);
    temp.comment = event.target.value;
    this.setState({data: temp});
  }

  isValidValue(v) {
    return v && v.trim() !== '';
  }

  saveHandler() {
    //TODO add validation
    this.props.saveAction(this.state.data);
  }

  render() {
    return (
      <div className="editFormWrapper">
        <div className="editForm">
          <div className="formRow">
            <span>Date:</span>
            <DatePicker selected={this.state.data.date ? moment(this.state.data.date,'DD.MM.YYYY') : ''} onChange={this.handleOvertimeDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" placeholderText="Date" required="true" />
          </div>
          <div className="formRow">
            <span>Start Time:</span>
            <TimeInput initTime={this.state.data.startTime} onTimeChange={this.handleStartTimeChange} />
          </div>
          <div className="formRow">
            <span>End Time:</span>
            <TimeInput initTime={this.state.data.endTime} onTimeChange={this.handleEndTimeChange} />
          </div>
          <div className="formRow">
            <span>Free date on:</span>
            <DatePicker selected={this.state.data.freeTimeOn ? moment(this.state.data.freeTimeOn,'DD.MM.YYYY') : ''} onChange={this.handleFreeTimeOnDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" isClearable="true" placeholderText="Free time on" />
          </div>
          <div className="formRow">
            <span>Comment:</span>
            <textarea id="comment" rows="6" value={this.state.data.comment} onChange={this.handleCommentChange} />
          </div>
        </div>
        <div className="footer">
          <button onClick={this.saveHandler}>Save</button>
          <button onClick={this.props.cancelAction}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default OvertimeEdit;
