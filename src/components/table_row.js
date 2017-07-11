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
          <span className="rowEdit" onClick={() => this.props.openEditPopup()}>&nbsp;</span>
          <span className="rowDelete">&nbsp;</span>
        </td>
      </tr>
    );
  }
}

export default TableRow;
