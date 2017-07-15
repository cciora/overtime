import React from 'react';

class DateFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      firstVisibleMonthIdx: null,
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

  getFirstVisibleIdx() {
    if(!this.state.firstVisibleMonthIdx) {
      const idx = this.calculateIndexOffset(this.props.month, -1 * this.state.monthsBefore);
      this.setState({firstVisibleMonthIdx: idx})
    }
    return this.state.firstVisibleMonthIdx;
  }

  incrementFirstVisibleMonth(val) {
    let newVal = this.calculateIndexOffset(this.state.firstVisibleMonthIdx, val);
    console.log(newVal);
    this.setState({firstVisibleMonthIdx: newVal});
  }

  selectMonth(idx) {
    this.setState({firstVisibleMonthIdx: null});
    this.props.setMonth(idx);
  }

  render() {
    const monthsArr = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let visibleMonths = [];
    // start 2 months before the current month. The month can also be from the last year.
    let idx = this.getFirstVisibleIdx();
    while(visibleMonths.length < this.state.monthsBefore + this.state.monthsAfter + 1) {
      visibleMonths.push({value: monthsArr[idx], idx: idx});
      idx = (idx == 12 ? 1 : idx+1);
    }
    const months = visibleMonths.map((month, idx) => {
        const cls = monthsArr[this.props.month] === month.value ? 'month selectedMonth clickable' : 'month clickable';
        return (
            <span key={month.value} className={cls} onClick={() => this.selectMonth(month.idx)}>
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
          <div className="arrow clickable" onClick={() => this.incrementFirstVisibleMonth(-1)}>&lt;</div>
          <div className="container">{months}</div>
          <div className="arrow clickable" onClick={() => this.incrementFirstVisibleMonth(1)}>&gt;</div>
        </div>
      </div>
    );
  }
}

export default DateFilter;
