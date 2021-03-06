import React from 'react';

class DateFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      monthsBefore: 2,
      monthsAfter: 2
    };
  }

  calculateIndexOffset(initialPos, offset) {
    let newVal = initialPos + offset;
    if (newVal > 12) {
      newVal = newVal % 12;
    } else if(newVal < 1) {
      newVal += 12;
    }
    return newVal;
  }

  selectMonth(idx) {
    this.props.setMonth(idx);
  }

  render() {
    const monthsArr = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let visibleMonths = [];
    // start 2 months before the current month. The month can also be from the last year.
    let idx = this.calculateIndexOffset(this.props.month, -1*this.state.monthsBefore);
    while(visibleMonths.length < this.state.monthsBefore + this.state.monthsAfter + 1) {
      visibleMonths.push({value: monthsArr[idx], idx: idx});
      idx = (idx === 12 ? 1 : idx+1);
    }
    const months = visibleMonths.map((month, idx) => {
        const cls = monthsArr[this.props.month] === month.value ? 'month selectedMonth clickable' : 'month clickable';
        return (
            <span key={month.idx} className={cls} onClick={() => this.selectMonth(month.idx)}>
              {month.value}
            </span>
        );
    });
    return (
      <div className="dateFilter">
        <div className="yearFilter">
          <span className="arrow clickable" onClick={() => this.props.setYear(this.props.year-1)}>&lt;</span>
          <div className="container">{this.props.year}</div>
          <span className="arrow clickable" onClick={() => this.props.setYear(this.props.year+1)}>&gt;</span>
        </div>
        <div className="monthFilter">
          <div className="arrow clickable" onClick={() => this.selectMonth(this.calculateIndexOffset(this.props.month,-1))}>&lt;</div>
          <div className="container">{months}</div>
          <div className="arrow clickable" onClick={() => this.selectMonth(this.calculateIndexOffset(this.props.month,1))}>&gt;</div>
        </div>
      </div>
    );
  }
}

export default DateFilter;
