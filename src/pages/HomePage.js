import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import EmployeeInfo from './../components/Employee-Info'
import ScheduleDetail from './../components/Schedule-Details'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import EventService from './../services/EventService'

const localizer = momentLocalizer(moment)

function GetEvents(events, userid){
    let UsersEvents = [];
    for(let i =0; i<events.length; i++){
        console.log(events[i]);
        if(events[i].userObjectId.localeCompare(userid) === 0 && !events[i].isTimeOff){
            console.log("match")
            UsersEvents.push(events[i])
        }
    }
    return UsersEvents;
}

export default (props) => {
    const [events, setEvents] = useState([])
    const { userData } = props

    /*
    let avatarUrl = ''
    if(userData && userData.avatar) {
        avatarUrl = userData.avatar
    };
    */

    useEffect(() => {
        debugger
        Axios.get('/api/events/getAllEvents').then((AxiosResponse) => {
            if(AxiosResponse && AxiosResponse.data && Array.isArray(AxiosResponse.data.events)) {
                const allEvents = AxiosResponse.data.events.map(i => {
                    return  {
                        ...i,
                        start:  moment(i.start).toDate(),
                        end:    moment(i.end).toDate()
                    }
                })
                setEvents(allEvents)
            }
        }).catch((axiosError) => {
            console.log(axiosError)
        })
    }, [])

    const onSelectEvent = (eventDetails, javascriptEvent) => {
        console.log(eventDetails)
    }

    // styling events conditionally...
    const eventPropGetter = eventDetails => {
        return EventService.getEventStyle(eventDetails)
    }
    let userEvents = GetEvents(events, userData._id);
    let shiftCount = userEvents.length;


    return (
        <div className="flexbox-wrapper flexbox-item">
            <EmployeeInfo userData={userData} shiftCount={shiftCount} />
            <div id="focus" className="flexbox-item">
                <div className="Calendar">
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={userEvents}
                        onSelectEvent={onSelectEvent}
                        eventPropGetter={eventPropGetter}
                    />
                </div>
            </div>
            <ScheduleDetail shifts={userEvents} />
        </div>
    )
}
