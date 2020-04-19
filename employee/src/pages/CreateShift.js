import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ScheduleDetail from'../components/Schedule-Details';
import moment from "moment";

const events = [];
const localizer = momentLocalizer(moment);  

class CreateShift extends React.Component {
    constructor(...args) {
      super(...args)
  
      this.state = { events }
    }
  
    handleSelect = ({ start, end }) => {
      const title = window.prompt('New Event name')
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
            <div className="Calendar" id="create_shifts">
                <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                onSelectEvent={event=> alert(event.title)}
                onSelectSlot={this.handleSelect}
                defaultView="week"
                />
            </div>            
        );
    }
}

export default CreateShift