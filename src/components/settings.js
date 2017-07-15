import React from 'react';

class Settings extends React.Component {
  constructor() {
    super();

    this.changeUserName = this.changeUserName.bind(this);
    this.changeSuperiorName = this.changeSuperiorName.bind(this);
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
            <button onClick={this.props.saveButtonHandler}>Save</button>
            <button onClick={this.props.cancelButtonHandler}>Cancel</button>
          </div>
        </div>
    );
  }
}

export default Settings;
