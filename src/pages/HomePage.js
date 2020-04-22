import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import EmployeeInfo from './../components/Employee-Info'
import ScheduleDetail from './../components/Schedule-Details'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment)

export default (props) => {
    const [events, setEvents] = useState([])
    const { userData } = props

    let avatarUrl = ''
    if(userData.avatar) {
        avatarUrl = userData.avatar
    };

    useEffect(() => {

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
    const eventPropGetter = (event, start, end, isSelected) => {
        let style = {}
        if(event && event.isTimeOff) {
            style = {
                backgroundColor: 'crimson',
                color: 'white',
            }
        }
        return {style}
    }


    return (
        <div className="flexbox-wrapper flexbox-item">
            <EmployeeInfo avatarUrl={avatarUrl} />
            <div id="focus" className="flexbox-item">
                <div className="Calendar">
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        onSelectEvent={onSelectEvent}
                        eventPropGetter={eventPropGetter}
                    />
                </div>
            </div>
            <ScheduleDetail />
        </div>
    )
}
