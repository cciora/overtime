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
      <div className="topMenuWraper">
        <div className="topMenu">
          <span className="addOvertime clickable" onClick={this.props.showAddNewOvertime}>Add Item</span>
          <span className="separator" />
          <span className="userSettings clickable" onClick={this.props.showSettings}>User Settings</span>
          <span className="separator" />
          <DateFilter month={this.props.selectedMonth} year={this.props.selectedYear}
            setMonth={this.props.monthSelectionHandler} setYear={this.props.yearSelectionHandler} />
        </div>
      </div>
    );
  }
}

export default TopMenu;
