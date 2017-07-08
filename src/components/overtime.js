import React from 'react';
import MonthFilter from './month_filter'
import TableHeader from './table_header';
import TableRow from './table_row';

class Overtime extends React.Component {
  constructor() {
    super();
    this.state = {
      user: 'cciora',
      filterMonth: new Date().getMonth(),
      overtimeEntries: [{
        date: '10.03.2017',
        startTime: '18:00',
        endTime: '21:00',
        freeTimeOn: '',
        comment: 'HZM Deployment'
      }, {
        date: '10.03.2017',
        startTime: '18:00',
        endTime: '21:00',
        freeTimeOn: '',
        comment: 'HZM Deployment'
      }]
    };
  }

  changeMonthFilter(i) {
    this.setState({filterMonth: i});
  }

  render() {
    const entries = this.state.overtimeEntries;
    const rows = entries.map((entry, index) => {
      return (
        <TableRow row={entry} />
      );
    });
    return (
      <div id="overtime">
        <MonthFilter month={this.state.filterMonth} onClick={(i) => this.changeMonthFilter(i)} />
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
