import React from 'react';

const usersMock = [
  {
    id: 1,
    name: 'Ciora Cristian',
    userName: 'cciora',
    teamLeaderId: 2,
    isAdmin: false,
    isTeamLeader: false
  },
  {
    id: 2,
    name: 'Nestorovici Alexander',
    userName: 'sasa',
    teamLeaderId: 2,
    isAdmin: false,
    isTeamLeader: true
  },
  {
    id: 3,
    name: 'Grozea Maria',
    userName: 'mgrozea',
    teamLeaderId: 2,
    isAdmin: false,
    isTeamLeader: false
  },
  {
    id: 4,
    name: 'Raul Firu',
    userName: 'rfiru',
    teamLeaderId: 4,
    isAdmin: false,
    isTeamLeader: true
  },
  {
    id: 5,
    name: 'Mihai Emilia',
    userName: 'emihai',
    teamLeaderId: 5,
    isAdmin: true,
    isTeamLeader: true
  }
];

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: usersMock
    };
  }

  toggleIsAdmin(id) {
    let entries = this.state.users.slice();
    for (let i=0; i<entries.length; i++) {
      if(entries[i].id === id) {
        entries[i].isAdmin = !entries[i].isAdmin;
        break;
      }
    }
    this.setState({
      users: entries
    });
  }

  toggleIsTeamLeader(id) {
    let entries = this.state.users.slice();
    for (let i=0; i<entries.length; i++) {
      if(entries[i].id === id) {
        entries[i].isTeamLeader = !entries[i].isTeamLeader;
        break;
      }
    }
    this.setState({
      users: entries
    });
  }

  saveUsers() {
    alert('Implement save users!');
    this.props.cancelAction();
  }

  render() {
    let rows;
    if(this.state.users.length > 0) {
      rows = this.state.users.map((entry, index) => {
        return (
          <tr key={entry.id}>
            <td>{entry.name}</td>
            <td>{entry.userName}</td>
            <td><input type="checkbox" checked={entry.isAdmin} onChange={() => this.toggleIsAdmin(entry.id)} /></td>
            <td><input type="checkbox" checked={entry.isTeamLeader} onChange={() => this.toggleIsTeamLeader(entry.id)} /></td>
          </tr>
        );
      });
    } else {
      rows = <tr><td colSpan="4">No data to display!</td></tr>;
    }
    return (
      <table className="overtime">
        <tbody>
        <tr className="header">
          <td width="40%">Full Name</td>
          <td width="30%">User Name</td>
          <td width="15%">Admin</td>
          <td width="15%">Team Leader</td>
        </tr>
        {rows}
        <tr>
          <td colSpan="4">
            <div className="footer">
              <button onClick={() => this.saveUsers()}>Save</button>
              <button onClick={this.props.cancelAction}>Cancel</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export default Users;
