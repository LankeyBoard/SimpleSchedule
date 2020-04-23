import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AssignShifts from '../components/AssignShifts';
import moment from "moment"
import EventService from './../services/EventService'
import Axios from 'axios'

// useContext
export const ShiftContext = React.createContext()

const CreateShift = () => 
{
  // const [fetchNewData, setFetchNewData] = useState(true)
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [availabilities, setAvailabilities] = useState([])

    // when creating a shift...
    const handleSelect = ({ start, end }) => {
      const title = window.prompt('Shift Name')
      if (title) {
        const newTimeOffEvent = {
          start:          moment(start).toDate(),
          end:            moment(end).toDate(),
          title,
          allDay:         false,
          isTimeOff:      false,
          status:         '',
          description:    '',
          userObjectId:   ''// making it blue...
        }
        
        newTimeOffEvent.allDay = newTimeOffEvent.start.getHours() === 0 && newTimeOffEvent.end.getHours() === 0


        Axios.post('/api/events/create', newTimeOffEvent).then((axiosResponse) => {
          newTimeOffEvent._id = axiosResponse.data.newEvent._id
          setEvents([...events,newTimeOffEvent])
        }).catch((apiError) => {
            console.dir(apiError)
        })

      }
    }

    const onSelectEvent = (eventPassed) => {
      // console.dir(eventPassed)
    }
    const localizer = momentLocalizer(moment);

    useEffect(() => {
      Axios.get('/api/events/createShiftRead').then((apiResponse) => {
        debugger
          const _unassigedEvents = apiResponse.data.events.map(o => {
            return {
              ...o,
              start:  moment(o.start).toDate(),
              end:    moment(o.end).toDate()
            }
          })

          setEvents(_unassigedEvents)
          setUsers(apiResponse.data.users)
          setAvailabilities(apiResponse.data.availabilities)
          
        }).catch((apiError) => {
          console.dir(apiError)
        })

    }, [])


    const eventPropGetter = (eventDetails) => {
      return EventService.getEventStyle(eventDetails)
    }


    return <ShiftContext.Provider value={{events, users, setEvents}}>
      <div className="Calendar" id="create_shifts">
          <Calendar
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            events={events}
            onSelectEvent={onSelectEvent}
            onSelectSlot={handleSelect}
            defaultView="week"
            eventPropGetter={eventPropGetter}
          />
      </div>

      <AssignShifts />
      
    </ShiftContext.Provider>
}

export default CreateShift