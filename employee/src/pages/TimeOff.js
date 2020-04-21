import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ScheduleDetail from'../components/Schedule-Details';
import moment from "moment";

const events = [{
  EmployeeName: '',
  Reason: ''
}];
const localizer = momentLocalizer(moment);  

class TimeOff extends React.Component {
    constructor(...args) {
      super(...args)
  
      this.state = { events }
    }
  
    handleSelect = ({ start, end}) => {
      const title = window.prompt('Employee Name:')
      const title2 = window.prompt('Reason for Time Off:')
      if (title)
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
              title2
            },
          ],
        })
    }

    render() {
        const localizer = momentLocalizer(moment);
        return (
            <div className="Calendar" id="time_off">
                <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                onSelectEvent={event=> alert(event.title)}
                onSelectEvent={event=> alert(event.title2)}
                onSelectSlot={this.handleSelect}
                defaultView="week"
                />
            </div>            
        );
    }
}

export default TimeOff
