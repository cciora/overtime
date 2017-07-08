import React from 'react';

class MonthFilter extends React.Component {
  render() {
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = monthsArr.map((month, idx) => {
      return (
        <a className={this.props.month == idx ? 'selectedMonth' : ''}
            onClick={() => this.props.onClick(idx)}>
          {month}
        </a>
      );
    });
    return (
      <div className="monthFilter">
        {months}
      </div>
    );
  }
}

export default MonthFilter;
