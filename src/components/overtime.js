import React from 'react';
import moment from 'moment';
import TopMenu from './top_menu';
import TableHeader from './table_header';
import TableRow from './table_row';
import EditPopup from './edit_popup';

class Overtime extends React.Component {
  constructor() {
    super();

    let entries = [];
    let key = 1;
    for (let y=2016; y<=2018; y++) {
      for (let m=1; m<=12; m++) {
        const d = moment(new Date(y, m, (Math.floor(Math.random() * 28) + 1))).format('DD.MM.YYYY');
        entries.push({
          id: key,
          date : d,
          startTime: '18:00',
          endTime: '21:00',
          freeTimeOn: '',
          comment: 'HZM Deployment'
        });
        key++;
      }
    }

    this.state = {
      user: 'cciora',
      filterMonth: new Date().getMonth()+1,
      filterYear: new Date().getFullYear(),
      overtimeEntries: entries,
      popupVisible: false,
      popupData: {},
      nextKey: key
    };
  }


  changeMonthFilter(m) {
    this.setState({filterMonth: m});
  }

  changeYearFilter(y) {
    this.setState({filterYear : y});
  }

  setPopupVisibility(visible) {
    this.setState({popupVisible: visible});
  }

  openEditPopup(popupData) {
    let temp = Object.assign({}, popupData);
    this.setState({popupData: temp});
    this.setPopupVisibility(true);
  }

  updatePopupData(popupData) {
    this.setState({popupData: popupData});
  }

  savePopupAction() {
    let popupData = Object.assign({}, this.state.popupData);
    let entries = this.state.overtimeEntries.slice();
    if(popupData.id){
      // replace the existent entry with the value stored inside the popupData
      for (let i=0; i<entries.length; i++) {
        if(entries[i].id == popupData.id) {
          entries[i] = popupData;
          break;
        }
      }
    } else {
      // add a new entry to the list of overtime entries
      const nextKey = this.state.nextKey;
      popupData.id = nextKey;
      this.setState({nextKey: nextKey+1});
      entries.push(popupData);
    }
    this.setState({overtimeEntries: entries});

    this.setPopupVisibility(false);
  }

  deleteOvertimeEntry(entryId) {
    console.log('delete ' + entryId);
    let entries = this.state.overtimeEntries.slice();
    for (let i=0; i<entries.length; i++) {
      if(entries[i].id == entryId) {
        entries.splice(i,1);
        break;
      }
    }
    this.setState({overtimeEntries: entries});
  }

  render() {
    const entries = [];
    for (let i=0; i< this.state.overtimeEntries.length; i++) {
      const entry = this.state.overtimeEntries[i];
      const d = moment(entry.date,'DD.MM.YYYY');
      if(d.month()+1 === this.state.filterMonth && d.year() === this.state.filterYear) {
        entries.push(entry);
      }
    }
    const rows = entries.map((entry, index) => {
      return (
        <TableRow key={entry.id} row={entry} openEditPopup={() => this.openEditPopup(entry)} deleteRow={(id) => this.deleteOvertimeEntry(id)} />
      );
    });
    return (
      <div id="overtime">
        <TopMenu selectedMonth={this.state.filterMonth} monthSelectionHandler={(m) => this.changeMonthFilter(m)}
          selectedYear={this.state.filterYear} yearSelectionHandler={(y) => this.changeYearFilter(y)}
          showPopupHandler={() => this.openEditPopup()}
        />
        <table className="overtime">
          <tbody>
            <TableHeader />
            {rows}
          </tbody>
        </table>
        <EditPopup popupVisibility={this.state.popupVisible} popupData={this.state.popupData}
          savePopupHandler={(d) => this.savePopupAction(d)} cancelPopupHandler={() => this.setPopupVisibility(false)}
          updatePopupData={(d) => this.updatePopupData(d)}/>
      </div>
    );
  }
}

export default Overtime;
