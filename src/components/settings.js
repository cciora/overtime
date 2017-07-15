import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      validationMessage: '',
      data: {
          userId: '',
          userName: '',
          superiorName: ''
      }
    };

    this.changeUserName = this.changeUserName.bind(this);
    this.changeSuperiorName = this.changeSuperiorName.bind(this);
    this.saveButtonHandler = this.saveButtonHandler.bind(this);
    this.cancelButtonHandler = this.cancelButtonHandler.bind(this);
  }

  componentDidMount(nextProps) {
    this.setState({data: this.props.data});
  }

  changeUserName(e) {
    let temp = Object.assign({}, this.state.data);
    temp.userName = e.target.value;
    this.setState({data: temp});
  }

  changeSuperiorName(e) {
    let temp = Object.assign({}, this.state.data);
    temp.superiorName = e.target.value;
    this.setState({data: temp});
  }

  isValidValue(v) {
    return v && v.trim() !== '';
  }

  areValidSettings(data, handler, arg){
    if (this.isValidValue(data.userName) && this.isValidValue(data.superiorName)) {
      this.setState({validationMessage: ''});
      return true;
    }
    return false;
  }

  saveButtonHandler () {
    if(this.areValidSettings(this.state.data)){
      this.props.saveAction(this.state.data);
    } else {
      this.setState({validationMessage: 'All fields are mandatory!'});
    }
  }

  cancelButtonHandler () {
    if(this.areValidSettings(this.props.data)){
      this.props.cancelAction();
    } else {
      this.setState({validationMessage: 'Previous values are not valid. You cannot cancel!'});
    }
  }

  render() {
    return (
        <div className="editFormWrapper">
          <div className="editForm">
            <div className="formRow">
              <span>User ID:</span>
              <input readOnly="true" value={this.state.data.userId} />
            </div>
            <div className="formRow">
              <span>Name:</span>
              <input value={this.state.data.userName} onChange={this.changeUserName} />
            </div>
            <div className="formRow">
              <span>Superior Name:</span>
              <input value={this.state.data.superiorName} onChange={this.changeSuperiorName} />
            </div>
          </div>
          <div className="footer">
            <button onClick={this.saveButtonHandler}>Save</button>
            <button onClick={this.cancelButtonHandler}>Cancel</button>
          </div>
          <div className="validation">
            {this.state.validationMessage}
          </div>
        </div>
    );
  }
}

export default Settings;
