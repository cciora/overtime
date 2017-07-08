import React from 'react';
import TableHeader from './table_header';
import TableRow from './table_row';

class Overtime extends React.Component {
  constructor() {
    super();
    this.state = {
      overtimeEntries: [{
        date: '10.03.2017',
        startTime: '18:00',
        endTime: '21:00',
        freeTimeOn: '',
        comment: 'HZM Deployment'
      },  {
        date: '10.03.2017',
        startTime: '18:00',
        endTime: '21:00',
        freeTimeOn: '',
        comment: 'HZM Deployment'
      }],
      user: 'cciora'
    };
  }

  render() {
    const entries = this.state.overtimeEntries;
    const rows = entries.map((entry) => {
      return (
        <TableRow row={entry} />
      );
    });
    return (
      <div id="overtimeTable">
        <a className="create">Add overtime</a>
        <table>
          <TableHeader />
          {rows}
        </table>
      </div>
    );
  }
}

export default Overtime;
