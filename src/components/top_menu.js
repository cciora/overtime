import React from 'react';
import DateFilter from './date_filter';

class TopMenu extends React.Component {
  render() {
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    monthsArr.map((month, idx) => {
      return (
        <a className={this.props.month === idx ? 'selectedMonth' : ''}
            onClick={() => this.props.onClick(idx)}>
          {month}
        </a>
      );
    });
    return (
      <div className="topMenu">
        <div className="addOvertime clickable">Add Item</div>
        <DateFilter month={this.props.selectedMonth} year={this.props.selectedYear}
          setMonth={this.props.monthSelectionHandler} setYear={this.props.yearSelectionHandler} />
        <div className="userSettings clickable">User Settings</div>
      </div>
    );
  }
}

export default TopMenu;
