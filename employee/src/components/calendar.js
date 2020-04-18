import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default ({events}) => {
  return (
    <div id="focus" className="flexbox-item">
      <div className="Calendar">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
        />
      </div>
    </div>
  );
}