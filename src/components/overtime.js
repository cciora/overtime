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
    if(visible == false) {
      this.setState({popupData: {}});
    }
    this.setState({popupVisible: visible});
  }

  openEditPopup(popupData) {
    let temp = Object.assign({}, popupData);
    if (!temp.date) {
      temp.date = null;
    }
    if(!temp.freeTimeOn) {
      temp.freeTimeOn = null;
    }
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
      for (let i=0; i<entries.length; i++) {
        if(entries[i].id == popupData.id) {
          entries[i] = popupData;
          break;
        }
      }
    } else {
      const nextKey = this.state.nextKey;
      popupData.id = nextKey;
      this.setState({nextKey: nextKey+1});
      entries.push(popupData);
    }
    this.setState({overtimeEntries: entries});

    this.setPopupVisibility(false);
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
        <TableRow key={entry.id} row={entry} openEditPopup={() => this.openEditPopup(entry)} />
      );
    });
    return (
      <div id="overtime">
        <TopMenu selectedMonth={this.state.filterMonth} monthSelectionHandler={(m) => this.changeMonthFilter(m)}
          selectedYear={this.state.filterYear} yearSelectionHandler={(y) => this.changeYearFilter(y)}
          showPopupHandler={() => this.setPopupVisibility(true)}
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
