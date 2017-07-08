import React from 'react';

class TableHeader extends React.Component {
  render() {
    return (
      <tr className="header">
        <td>Date</td>
        <td>Start time</td>
        <td>End time</td>
        <td>Free time on</td>
        <td>Comment</td>
        <td>Actions</td>
      </tr>
    );
  }
}

export default TableHeader;
