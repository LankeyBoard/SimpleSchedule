import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ScheduleDetail from'../components/Schedule-Details';
import AssignShifts from '../components/AssignShifts';
import moment from "moment";
import emplyeeDropdown from '../components/employeeDropdown';

const events = [    {
  start:  moment().subtract(2, "hours").toDate(),
  end:    moment().toDate(),
  title:  "Meeting about the project"
},
{
  start:  moment().add(2, "hours").toDate(),
  end:    moment().add(3, "hours").toDate(),
  title:  "2nd Shift"
}];
const localizer = momentLocalizer(moment);  
const employees = ["Emp1", "Emp2"];


class CreateShift extends React.Component {
    constructor(...args) {
      super(...args)
  
      this.state = { events }
    }
  
    handleSelect = ({ start, end }) => {
      const title = window.prompt('Shift Name')
      if (title)
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
            },
          ],
        })
    }

    render() {
        const localizer = momentLocalizer(moment);
        return (
          <>
            <div className="Calendar" id="create_shifts">
                <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                
                events={this.state.events}
                onSelectEvent={event=> alert(event.title)}
                onSelectSlot={this.handleSelect}
                defaultView="week"
                />
            </div>
            <div className="AssignShifts" id="right_sidebar">
              <h3>Assign Shifts</h3>
              <AssignShifts events = {this.state.events} employees = {employees}/>
            </div>

            </>       
        );
    }
}

export default CreateShift