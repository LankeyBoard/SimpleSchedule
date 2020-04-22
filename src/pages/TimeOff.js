import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ScheduleDetail from'../components/Schedule-Details';
import moment from "moment";

const events = [{
  Reason: ''
}];

const localizer = momentLocalizer(moment);

class TimeOff extends React.Component {
    constructor(props) {
      super(props)
      this.state = { events }
    }

    componentDidMount(){
      console.dir(this.props)
    }
  
    handleSelect = ({ start, end}) => {
      const title = window.prompt('Reason for Time Off:')
      if (title)
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title
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
                onSelectSlot={this.handleSelect}
                defaultView="week"
                />
            </div>            
        );
    }
}

export default TimeOff
