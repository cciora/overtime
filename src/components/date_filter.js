import React from 'react';

class DateFilter extends React.Component {
  render() {
    const monthsArr = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = monthsArr.map((month, idx) => {
      // ignore the first element. It's not a month.
      if(idx > 0) {
        const cls = this.props.month === idx ? 'month selectedMonth clickable' : 'month clickable';
        return (
          <a key={month} onClick={() => this.props.setMonth(idx)}>
            <div className={cls}>
              {month}
            </div>
          </a>
        );
      }
    });
    return (
      <div className="dateFilter">
        <div className="year">
          <div className="prevYear clickable" onClick={() => this.props.setYear(this.props.year-1)}>&lt;</div>
          <div className="currYear">{this.props.year}</div>
          <div className="nextYear clickable" onClick={() => this.props.setYear(this.props.year+1)}>&gt;</div>
        </div>
        {months}
      </div>
    );
  }
}

export default DateFilter;
