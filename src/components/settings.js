import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      validationMessage: ''
    };

    this.changeUserName = this.changeUserName.bind(this);
    this.changeSuperiorName = this.changeSuperiorName.bind(this);
    this.validateAndCallHandler = this.validateAndCallHandler.bind(this);
  }

  changeUserName(e) {
    let temp = Object.assign({}, this.props.data);
    temp.userName = e.target.value;
    this.props.updateSettings(temp);
  }

  changeSuperiorName(e) {
    let temp = Object.assign({}, this.props.data);
    temp.superiorName = e.target.value;
    this.props.updateSettings(temp);
  }

  isValidValue(v) {
    return v && v.trim() !== '';
  }

  validateAndCallHandler(handler){
    if (this.isValidValue(this.props.data.userName) && this.isValidValue(this.props.data.superiorName)) {
      this.setState({validationMessage: ''});
      handler.call();
    } else {
      this.setState({validationMessage: 'All fields are mandatory!'});
    }
  }

  render() {
    return (
        <div className="editFormWrapper">
          <div className="editForm">
            <div className="formRow">
              <span>User ID:</span>
              <input readOnly="true" value={this.props.data.userId} />
            </div>
            <div className="formRow">
              <span>Name:</span>
              <input value={this.props.data.userName} onChange={this.changeUserName} />
            </div>
            <div className="formRow">
              <span>Superior Name:</span>
              <input value={this.props.data.superiorName} onChange={this.changeSuperiorName} />
            </div>
          </div>
          <div className="footer">
            <button onClick={() => this.validateAndCallHandler(this.props.saveButtonHandler)}>Save</button>
            <button onClick={() => this.validateAndCallHandler(this.props.cancelButtonHandler)}>Cancel</button>
          </div>
          <div className="validation">
            {this.state.validationMessage}
          </div>
        </div>
    );
  }
}

export default Settings;
