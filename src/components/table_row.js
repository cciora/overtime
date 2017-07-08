import React from 'react';

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.row.date}</td>
        <td>{this.props.row.startTime}</td>
        <td>{this.props.row.endTime}</td>
        <td>{this.props.row.freeTimeOn}</td>
        <td>{this.props.row.comment}</td>
        <td>
          <a className="edit">&nbsp;</a>
          <a className="delete">&nbsp;</a>
        </td>
      </tr>
    );
  }
}

export default TableRow;
