import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import EmployeeInfo from './../components/Employee-Info'
import ScheduleDetail from './../components/Schedule-Details'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment)

export default () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        Axios.get('/getEvents').then((AxiosResponse) => {
            const allEvents = (AxiosResponse.data.events || []).map(i => {
                return  {
                    start:  moment(i.start).toDate(),
                    end:    moment(i.end).toDate(),
                    title:  i.title
                }
            })
            setEvents(allEvents)
        }).catch((axiosError) => {
            debugger
            console.log(axiosError)
        })
    }, [])

    const onSelectEvent = (eventDetails, javascriptEvent) => {
        debugger
        console.log(eventDetails)
    }


    return (
        <div className="flexbox-wrapper flexbox-item">
            <EmployeeInfo/>
            <div id="focus" className="flexbox-item">
                <div className="Calendar">
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        onSelectEvent={onSelectEvent}
                    />
                </div>
            </div>
            <ScheduleDetail />
        </div>
    )
}
