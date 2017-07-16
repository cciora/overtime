import React from 'react';
//import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeInput from 'time-input';

class OvertimeEdit extends React.Component {
  constructor () {
    super();

    this.state = {
      validationMessage: '',
      data: {
        date : '',
        startTime: '00:00',
        endTime: '00:00',
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
    let temp = Object.assign({}, this.state.data);
    temp = Object.assign(temp, this.props.data);
    this.setState({data: temp});
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

  getTimeStringInMinutes(str) {
    const time = str.split(":");
    return parseInt(time[0])*60 + parseInt(time[1]);
  }

  getEntryDurationInMinutes(e){
    return this.getTimeStringInMinutes(e.endTime) - this.getTimeStringInMinutes(e.startTime);
  }

  overlappingTimeIntervals(e1, e2) {
    const start1 = this.getTimeStringInMinutes(e1.startTime);
    const end1 = this.getTimeStringInMinutes(e1.endTime);
    const start2 = this.getTimeStringInMinutes(e2.startTime);
    const end2 = this.getTimeStringInMinutes(e2.endTime);
    if(!(start2 >= end1 || end2 <= start1)) {
      this.setState({validationMessage: "Overlapping with another entry! " +
        "("+e1.startTime+" -> " + e1.endTime+") " +
        "("+e2.startTime+" -> " + e2.endTime+")"});
      return true;
    }
    return false;
  }

  validateComparedToOtherEntries() {
    let totalMinutesOnDay = this.getEntryDurationInMinutes(this.state.data);
    for(let i=0; i<this.props.entries.length; i++){
      const entry = this.props.entries[i];
      if(entry.id !== this.state.data.id && entry.date === this.state.data.date) {
        if(this.overlappingTimeIntervals(entry, this.state.data)) {
          return false;
        }
        totalMinutesOnDay += this.getEntryDurationInMinutes(entry);
      }
    }
    if(totalMinutesOnDay > 180) {
      this.setState({validationMessage: "Maximum 3h overtime can be booked for one day! You have " + (totalMinutesOnDay-180) + " extra minutes!"});
      return false;
    }
    return true;
  }

  saveHandler() {
    // the date is mandatory
    if(!moment(this.state.data.date, "DD.MM.YYYY").isValid()) {
      this.setState({validationMessage: "Please specify a valid date!"});
      return;
    }
    // check the start time is before the end time
    if(this.getTimeStringInMinutes(this.state.data.startTime) >= this.getTimeStringInMinutes(this.state.data.endTime)) {
      this.setState({validationMessage: "End Time should be after Start Time!"});
      return;
    }
    if(!this.validateComparedToOtherEntries()){
      return;
    }
    this.props.saveAction(this.state.data);
  }

  isWeekday (d) {
    return d.day() > 0 && d.day() < 6;
  }

  render() {
    return (
      <div className="editFormWrapper">
        <div className="editForm">
          <div className="formRow">
            <span>Date:</span>
            <DatePicker selected={this.state.data.date ? moment(this.state.data.date,'DD.MM.YYYY') : ''} onChange={this.handleOvertimeDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" placeholderText="Date" required="true"
              minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
              filterDate={(this.isWeekday)} />
          </div>
          <div className="formRow">
            <span>Start Time:</span>
            <TimeInput value={this.state.data.startTime} onChange={this.handleStartTimeChange} />
          </div>
          <div className="formRow">
            <span>End Time:</span>
            <TimeInput value={this.state.data.endTime} onChange={this.handleEndTimeChange} />
          </div>
          <div className="formRow">
            <span>Free date on:</span>
            <DatePicker selected={this.state.data.freeTimeOn ? moment(this.state.data.freeTimeOn,'DD.MM.YYYY') : ''} onChange={this.handleFreeTimeOnDateChange}
              className="overtimeDatePicker" dateFormat="DD.MM.YYYY" isClearable="true" placeholderText="Free time on"
              minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
              filterDate={(this.isWeekday)} />
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
        <div className="validation">
          {this.state.validationMessage}
        </div>
      </div>
    );
  }
}

export default OvertimeEdit;
