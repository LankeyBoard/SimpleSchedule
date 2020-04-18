import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";


const localizer = momentLocalizer(moment);

const Cal = ({events}) => {
  return (
    <div className="Calendar">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
      />
    </div>
  );
}


export default Cal;