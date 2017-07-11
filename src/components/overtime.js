import React from 'react';
import TopMenu from './top_menu';
import TableHeader from './table_header';
import TableRow from './table_row';
import EditPopup from './edit_popup';

class Overtime extends React.Component {
  constructor() {
    super();

    let entries = [];
    for (let y=2016; y<=2018; y++) {
      for (let m=1; m<=12; m++) {
        const d = '03.' + (m < 10 ? '0'+m : m) + '.' + y;
        entries.push({
          date : d,
          startTime: '18:00',
          endTime: '21:00',
          freeTimeOn: '',
          comment: 'HZM Deployment'
        })
      }
    }

    this.state = {
      user: 'cciora',
      filterMonth: new Date().getMonth()+1,
      filterYear: new Date().getFullYear(),
      overtimeEntries: entries,
      popupVisible: false,
      popupData: {}
    };
  }


  changeMonthFilter(m) {
    this.setState({filterMonth: m});
  }

  changeYearFilter(y) {
    this.setState({filterYear : y});
  }

  setPopupVisibility(visible) {
    if(visible == false) {
      this.setState({popupData: {}});
    }
    this.setState({popupVisible: visible});
  }

  openEditPopup(popupData) {
    this.setState({popupData: popupData});
    this.setPopupVisibility(true);
  }

  savePopupAction(popupData) {
    this.setPopupVisibility(false);
  }

  render() {
    const entries = [];
    for (let i=0; i< this.state.overtimeEntries.length; i++) {
      const entry = this.state.overtimeEntries[i];
      const entryParts = entry.date.split('.');
      if(entryParts[1] == this.state.filterMonth && entryParts[2] == this.state.filterYear) {
        entries.push(entry);
      }
    }
    const rows = entries.map((entry, index) => {
      return (
        <TableRow row={entry} openEditPopup={() => this.openEditPopup(entry)} />
      );
    });
    return (
      <div id="overtime">
        <TopMenu selectedMonth={this.state.filterMonth} monthSelectionHandler={(m) => this.changeMonthFilter(m)}
          selectedYear={this.state.filterYear} yearSelectionHandler={(y) => this.changeYearFilter(y)}
          showPopupHandler={() => this.setPopupVisibility(true)}
        />
        <table>
          <tbody>
            <TableHeader />
            {rows}
          </tbody>
        </table>
        <EditPopup popupVisibility={this.state.popupVisible} popupData={this.state.popupData}
          savePopupHandler={(d) => this.savePopupAction(d)} cancelPopupHandler={() => this.setPopupVisibility(false)}/>
      </div>
    );
  }
}

export default Overtime;
