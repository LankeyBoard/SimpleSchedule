import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppContext } from './../App';
import moment from "moment";
import Axios from 'axios';
import EventService from './../services/EventService'

export default () => {

  const { userData } = useContext(AppContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    Axios.get('/api/events/timeOffRequestRead').then((axiosResponse) => {
      const _events = axiosResponse.data.timeOffEvents.map(e => {
        return {
          ...e,
          start:  moment(e.start).toDate(),
          end:    moment(e.end).toDate()
        }
      })
      setEvents(_events)
    }).catch((apiError) => {
      console.dir(apiError)
    })
  }, [])
  


  const handleSelect = ({ start, end}) => {

      const title = window.prompt('Reason for Time Off:');
      if (title) {
      const newTimeOffEvent = {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        title,
        userObjectId: userData._id,
        allDay: false,
        isTimeOff: true// makes it RED
      }
      
      newTimeOffEvent.allDay = newTimeOffEvent.start.getHours() === newTimeOffEvent.end.getHours()
      const newEvents = [...events,newTimeOffEvent]
      setEvents(newEvents)
      Axios.post('/api/events/timeOffRequest', newTimeOffEvent).then((axiosResponse) => {
          console.dir(axiosResponse)
      }).catch((apiError) => {
          console.dir(apiError)
      })
    }
  }


  // no logic for this as they are all timeOff
  const eventPropGetter = (eventDetails) => {
    return EventService.getEventStyle(eventDetails)
  }
  const localizer = momentLocalizer(moment);
  // defaultView="month"
  return <div className="Calendar" id="time_off">
          <Calendar
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            events={events}
            onSelectSlot={handleSelect}
            defaultView="week"
            eventPropGetter={eventPropGetter}
          />
      </div>
}