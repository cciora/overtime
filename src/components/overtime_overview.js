import React from 'react';
import moment from 'moment';
import TableHeader from './table_header';
import TableRow from './table_row';

class OvertimeOverview extends React.Component {
  render() {
    const entries = [];
    for (let i=0; i< this.props.entries.length; i++) {
      const entry = this.props.entries[i];
      const d = moment(entry.date,'DD.MM.YYYY');
      if(d.month()+1 === this.props.month && d.year() === this.props.year) {
        entries.push(entry);
      }
    }
    let rows;
    if(entries.length > 0) {
      rows = entries.map((entry, index) => {
        return (
          <TableRow key={entry.id} row={entry} showEditPage={() => this.props.showEditPage(entry)} deleteRow={(id) => this.props.deleteOvertimeEntry(id)} />
        );
      });
    } else {
      rows = <tr><td colSpan="6">No data to display!</td></tr>;
    }
    return (
        <table className="overtime">
          <tbody>
            <TableHeader />
            {rows}
          </tbody>
        </table>
    );
  }
}

export default OvertimeOverview;
