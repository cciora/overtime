import React from 'react';
import moment from 'moment';
import TopMenu from './top_menu';
import OvertimeOverview from './overtime_overview';
import Settings from './settings';
import OvertimeEdit from './overtime_edit';

const view = {
  OVERTIME: 'overtime',
  OVERTIME_EDIT: 'overtimeEdit',
  USER_SETTINGS: 'userSettings'
};

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
      userSettings: {
        userId: 'cciora',
        userName: '',
        superiorName: ''
      },
      filterMonth: new Date().getMonth()+1,
      filterYear: new Date().getFullYear(),
      overtimeEntries: entries,
      tempOvertime: {},
      nextKey: key,
      visibleView: view.OVERTIME
    };

    if (!this.state.userSettings.userId || !this.state.userSettings.userName || !this.state.userSettings.superiorName) {
      this.state.visibleView = view.USER_SETTINGS;
    }
  }

  changeMonthFilter(m) {
    this.setState({filterMonth: m});
  }

  changeYearFilter(y) {
    this.setState({filterYear : y});
  }

  showEditPage(data) {
    let temp = Object.assign({}, data);
    this.setState({
      tempOvertime: temp,
      visibleView: view.OVERTIME_EDIT
    });
  }

  updateTempOvertime(data) {
    this.setState({tempOvertime: data});
  }

  saveOvertimeEntry() {
    let tempOvertime = Object.assign({}, this.state.tempOvertime);
    let entries = this.state.overtimeEntries.slice();
    if(tempOvertime.id){
      // replace the existent entry with the value stored inside the tempOvertime
      for (let i=0; i<entries.length; i++) {
        if(entries[i].id === tempOvertime.id) {
          entries[i] = tempOvertime;
          break;
        }
      }
    } else {
      // add a new entry to the list of overtime entries
      const nextKey = this.state.nextKey;
      tempOvertime.id = nextKey;
      this.setState({nextKey: nextKey+1});
      entries.push(tempOvertime);
    }
    this.setState({
      overtimeEntries: entries,
      visibleView: view.OVERTIME
    });
  }

  deleteOvertimeEntry(entryId) {
    let entries = this.state.overtimeEntries.slice();
    for (let i=0; i<entries.length; i++) {
      if(entries[i].id === entryId) {
        entries.splice(i,1);
        break;
      }
    }
    this.setState({overtimeEntries: entries});
  }

  changeVisibleView(viewId) {
    this.setState({visibleView: viewId});
  }

  saveUserSettings(settings) {
    this.setState({userSettings: settings});
    this.changeVisibleView(view.OVERTIME);
  }

  render() {
    let content;
    if(this.state.visibleView === view.USER_SETTINGS){
      content = <Settings data={this.state.userSettings}
                    saveAction={(settings) => this.saveUserSettings(settings)}
                    cancelAction={() => this.changeVisibleView(view.OVERTIME)} />;
    } else if (this.state.visibleView === view.OVERTIME_EDIT) {
      content = <OvertimeEdit data={this.state.tempOvertime}
                    saveHandler={(d) => this.saveOvertimeEntry(d)} cancelHandler={() => this.changeVisibleView(view.OVERTIME)}
                    updateData={(d) => this.updateTempOvertime(d)}/>
    } else {
      content = <OvertimeOverview entries={this.state.overtimeEntries} year={this.state.filterYear} month={this.state.filterMonth}
                    showEditPage={(o) => this.showEditPage(o)} deleteOvertimeEntry={(o) => this.deleteOvertimeEntry(o)} />;
    }
    return (
      <div id="overtime">
        <TopMenu selectedMonth={this.state.filterMonth} monthSelectionHandler={(m) => this.changeMonthFilter(m)}
          selectedYear={this.state.filterYear} yearSelectionHandler={(y) => this.changeYearFilter(y)}
          showAddNewOvertime={() => this.showEditPage()} showSettings={() => this.changeVisibleView(view.USER_SETTINGS)}
        />
        {content}
      </div>
    );
  }
}

export default Overtime;
