import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import ScheduleDetail from'../components/Schedule-Details';
import moment from "moment";

const events = [{
  EmployeeName: '',
  Reason: ''
}];

// const localizer = momentLocalizer(moment);

class TimeOff extends React.Component {
    constructor(props) {
      super(props)
      this.state = { events }
    }

    componentDidMount(){
      console.dir(this.props)
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

    // defaultView="month"
    render() {
        const localizer = momentLocalizer(moment);
        return (
            <div className="Calendar" id="time_off">
                <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={this.state.events}
                onSelectSlot={this.handleSelect}
                />
            </div>            
        );
    }
}

export default TimeOff
